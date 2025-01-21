import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {ProductRepository} from "@/domain/repositories/product.repository";
import {ProductOutputDto} from "@/application/dtos/product-output.dto";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";

export namespace GetProductsByCategoryUseCase {
    export type Input = {
        categoryId?: string;
    };

    export type Output = ProductOutputDto[];

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private productRepository: ProductRepository,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {categoryId} = input;

            if (!categoryId) {
                throw new BadRequestError("Input data not provided");
            }

            const entity = await this.productRepository.listByCategory(categoryId);

            return entity.map(product => product.toJSON());
        }
    }
}
