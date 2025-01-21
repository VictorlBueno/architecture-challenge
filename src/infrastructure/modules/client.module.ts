import {Module} from "@nestjs/common";
import {ClientController} from "@/infrastructure/controllers/client.controller";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {ClientPrismaRepository} from "@/infrastructure/repositories/prisma/client-prisma.repository";
import {CreateClientUseCase} from "@/application/usecases/clients/create-client.usecase";
import {GetClientUseCase} from "@/application/usecases/clients/get-client.usecase";
import {UuidGenerator} from "@/infrastructure/providers/uuid-generator";

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
            provide: CreateClientUseCase.UseCase,
            useFactory: (
                clientRepository: ClientPrismaRepository,
                uuidGenerator: UuidGenerator,
            ) => {
                return new CreateClientUseCase.UseCase(clientRepository, uuidGenerator);
            },
            inject: ["ClientRepository", "UuidGenerator"],
        },
        {
            provide: GetClientUseCase.UseCase,
            useFactory: (clientRepository: ClientPrismaRepository) => {
                return new GetClientUseCase.UseCase(clientRepository);
            },
            inject: ["ClientRepository"],
        },
    ],
})

export class ClientModule {
}
