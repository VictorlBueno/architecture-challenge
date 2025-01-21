import {ProductCategoryEnum} from "@/domain/enums/category.enum";
import {GetOrderPaymentStatusUseCase} from "@/application/usecases/orders/get-order-payment-status.usecase";

export class GetOrderPaymentStatusDto implements GetOrderPaymentStatusUseCase.Input {
    category: ProductCategoryEnum;
    description: string;
    id: string;
    name: string;
    price: number;
}