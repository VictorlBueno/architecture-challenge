import { Product } from "@prisma/client";
import { ProductEntity } from "@/domain/entities/product.entity";
import {ProductCategoryEnum} from "@/domain/enums/category.enum";

export class ProductModelMapper {
    static toEntity(model: Product): ProductEntity {
        return new ProductEntity({
            id: model.id,
            name: model.name,
            description: model.description,
            price: Number(model.price),
            category: model.category as ProductCategoryEnum,
        });
    }
}
