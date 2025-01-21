import {CreateProductUseCase} from "@/application/usecases/products/create-product.usecase";
import {ProductCategoryEnum} from "@/domain/enums/category.enum";

export class CreateProductDto implements CreateProductUseCase.Input {
    category: ProductCategoryEnum;
    description: string;
    name: string;
    price: number;
}