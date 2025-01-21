import {Module} from "@nestjs/common";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {OrderPrismaRepository} from "@/infrastructure/repositories/prisma/order-prisma.repository";
import {PayMockUseCase} from "@/application/usecases/paymock/pay-mock.usecase";
import {PaymockController} from "@/infrastructure/controllers/paymock.controller";

@Module({
    controllers: [PaymockController],
    providers: [
        {
            provide: "PrismaService",
            useClass: PrismaService,
        },
        {
            provide: "OrderRepository",
            useFactory: (prismaService: PrismaService) => {
                return new OrderPrismaRepository(prismaService);
            },
            inject: [PrismaService],
        },
        {
            provide: PayMockUseCase.UseCase,
            useFactory: (orderRepository: OrderPrismaRepository) => {
                return new PayMockUseCase.UseCase(orderRepository);
            },
            inject: ["OrderRepository"],
        },
    ],
})

export class PaymockModule {
}
