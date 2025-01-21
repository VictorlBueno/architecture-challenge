import {UpdateOrderUseCase} from "@/application/usecases/orders/update-order.usecase";
import {PaymentStatusEnum} from "@/domain/enums/payment-status.enum";
import {OrderStatusEnum} from "@/domain/enums/order-status.enum";

export class UpdateOrderDto implements UpdateOrderUseCase.Input {
    id: string;
    paymentStatus: PaymentStatusEnum;
    status: OrderStatusEnum;
}