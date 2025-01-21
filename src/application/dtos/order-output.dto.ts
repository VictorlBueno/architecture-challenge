import {OrderStatusEnum} from "@/domain/enums/order-status.enum";
import {ProductProps} from "@/domain/entities/product.entity";
import {PaymentStatusEnum} from "@/domain/enums/payment-status.enum";
import {ClientOutputDto} from "@/application/dtos/client-output.dto";

export type OrderOutputDto = {
    id: string;
    clientId: string;
    total: number;
    status: OrderStatusEnum;
    paymentStatus: PaymentStatusEnum;
    products: ProductProps[];
    createdAt: Date;
    client: ClientOutputDto;
}