import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {UuidGenerator} from "@/infrastructure/providers/uuid-generator";
import {ProductEntity} from "@/domain/entities/product.entity";
import {OrderRepository} from "@/domain/repositories/order.repository";
import {OrderEntity} from "@/domain/entities/order.entity";
import {ProductRepository} from "@/domain/repositories/product.repository";
import {CreateOrderOutputDto} from "@/application/dtos/create-order-output.dto";
import {Inject, Req} from "@nestjs/common";
import {Request} from "express";

export namespace CreateOrderUseCase {
    export type Input = {
        clientId: string;
        products: string[];
        host?: string;
    };

    export type Output = CreateOrderOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private orderRepository: OrderRepository,
            private productRepository: ProductRepository,
            private uuidGenerator: UuidGenerator,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {clientId, products, host} = input;

            if (!clientId || !products.length) {
                throw new BadRequestError("Input data not provided");
            }

            const productList: ProductEntity[] = [];

            for (const productId of products) {
                const product = await this.productRepository.findById(productId);
                if (product) {
                    productList.push(product);
                }
            }

            const entity = new OrderEntity({
                ...input,
                products: productList,
                id: this.uuidGenerator.generate(),
            });

            await this.orderRepository.insert(entity);

            const entityJSON = entity.toJSON();

            return {
                ...entityJSON,
                paymentLink: `${host}/paymock/${entityJSON.id}`, // Substituindo {AQUI}
            };
        }
    }
}