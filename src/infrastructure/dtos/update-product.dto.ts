import {ProductCategoryEnum} from "@/domain/enums/category.enum";
import {UpdateProductUsecase} from "@/application/usecases/products/update-product.usecase";

export class UpdateProductDto implements UpdateProductUsecase.Input {
    category: ProductCategoryEnum;
    description: string;
    id: string;
    name: string;
    price: number;
}