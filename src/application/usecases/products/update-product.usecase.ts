import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {ProductRepository} from "@/domain/repositories/product.repository";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {ProductCategoryEnum} from "@/domain/enums/category.enum";
import {ProductOutputDto} from "@/application/dtos/product-output.dto";

export namespace UpdateProductUsecase {
    export type Input = {
        id: string;
        name: string;
        description: string;
        price: number;
        category: ProductCategoryEnum;
    };

    export type Output = ProductOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private productRepository: ProductRepository,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {id} = input;

            if (!id) {
                throw new BadRequestError("Input data not provided");
            }

            const entity = await this.productRepository.findById(id);

            await entity.update(input);

            await this.productRepository.update(entity);

            return entity.toJSON();
        }
    }
}
