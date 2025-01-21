import { ApiProperty } from '@nestjs/swagger';
import { ProductCategoryEnum } from "@/domain/enums/category.enum";
import { UpdateProductUsecase } from "@/application/usecases/products/update-product.usecase";

export class UpdateProductDto implements UpdateProductUsecase.Input {
    @ApiProperty({
        enum: ProductCategoryEnum,
        description: 'Product category',
        example: ProductCategoryEnum.BURGER
    })
    category: ProductCategoryEnum;

    @ApiProperty({
        description: 'Product description',
        example: 'Delicious hamburger with cheese and bacon'
    })
    description: string;

    @ApiProperty({
        description: 'Product ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'Product name',
        example: 'Cheese Burger'
    })
    name: string;

    @ApiProperty({
        description: 'Product price',
        example: 15.99
    })
    price: number;
}