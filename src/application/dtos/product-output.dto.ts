import {ProductCategoryEnum} from "@/domain/enums/category.enum";

export type ProductOutputDto = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategoryEnum;
}