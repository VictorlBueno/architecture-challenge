import {CreateProductUseCase} from "@/application/usecases/products/create-product.usecase";
import {ProductCategoryEnum} from "@/domain/enums/category.enum";
import {CreateOrderUseCase} from "@/application/usecases/orders/create-orders.usecase";
import {ProductProps} from "@/domain/entities/product.entity";

export class CreateOrderDto implements CreateOrderUseCase.Input {
    clientId: string;
    products: string[];
}