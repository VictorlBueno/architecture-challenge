import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {UuidGenerator} from "@/infrastructure/providers/uuid-generator";
import {ProductEntity} from "@/domain/entities/product.entity";
import {ProductCategoryEnum} from "@/domain/enums/category.enum";
import {ProductRepository} from "@/domain/repositories/product.repository";
import {ProductOutputDto} from "@/application/dtos/product-output.dto";

export namespace CreateProductUseCase {
    export type Input = {
        name: string;
        description: string;
        price: number;
        category: ProductCategoryEnum;
    };

    export type Output = ProductOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private productRepository: ProductRepository,
            private uuidGenerator: UuidGenerator,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {name, description, price, category} = input;

            if (!name || !description || !price || !category) {
                throw new BadRequestError("Input data not provided");
            }

            const entity = new ProductEntity({
                ...input,
                id: this.uuidGenerator.generate(),
            });

            await this.productRepository.insert(entity);

            return entity.toJSON();
        }
    }
}