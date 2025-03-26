import {Client, Order} from "@prisma/client";
import {OrderEntity} from "@/domain/entities/order.entity";
import {PaymentStatusEnum} from "@/domain/enums/payment-status.enum";
import {OrderStatusEnum} from "@/domain/enums/order-status.enum";
import {ClientModelMapper} from "@/infrastructure/repositories/prisma/models/client-model.mapper";

export class OrderModelMapper {
    static toEntity(model: Order & { products: any, client: Client }): OrderEntity {
        return new OrderEntity({
            id: model.id,
            clientId: model.clientId,
            status: model.status as OrderStatusEnum,
            paymentStatus: model.paymentStatus as PaymentStatusEnum,
            total: Number(model.total),
            products: model.products,
            client: ClientModelMapper.toEntity(model.client),
        });
    }

    static paymentStatusToEntity(mode: { id: string; paymentStatus: string }) {
        return {
            id: mode.id,
            paymentStatus: mode.paymentStatus as PaymentStatusEnum,
        };
    }
}
