import {Module} from "@nestjs/common";
import {ClientController} from "@/infrastructure/controllers/client.controller";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {ClientPrismaRepository} from "@/infrastructure/repositories/prisma/client-prisma.repository";
import {CreateClientUseCase} from "@/application/usecases/clients/create-client.usecase";
import {GetClientUseCase} from "@/application/usecases/clients/get-client.usecase";
import {UuidGenerator} from "@/infrastructure/providers/uuid-generator";
import {CognitoService} from "@/infrastructure/external/cognito.service";
import {IamService} from "@/domain/external/iam.service";

@Module({
    controllers: [ClientController],
    providers: [
        {
            provide: "PrismaService",
            useClass: PrismaService,
        },
        {
            provide: "UuidGenerator",
            useClass: UuidGenerator,
        },
        {
            provide: "ClientRepository",
            useFactory: (prismaService: PrismaService) => {
                return new ClientPrismaRepository(prismaService);
            },
            inject: [PrismaService],
        },
        {
            provide: "IamService",
            useFactory: () => {
                return new CognitoService();
            },
            inject: [],
        },
        {
            provide: CreateClientUseCase.UseCase,
            useFactory: (iamService: IamService) => {
                return new CreateClientUseCase.UseCase(iamService);
            },
            inject: ["IamService"],
        },
        {
            provide: GetClientUseCase.UseCase,
            useFactory: (iamService: IamService) => {
                return new GetClientUseCase.UseCase(iamService);
            },
            inject: ["IamService"],
        },
    ],
})

export class ClientModule {
}
