import {Module} from "@nestjs/common";
import {ProductController} from "@/infrastructure/controllers/product.controller";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {ProductPrismaRepository} from "@/infrastructure/repositories/prisma/product-prisma.repository";
import {CreateProductUseCase} from "@/application/usecases/products/create-product.usecase";
import {UpdateProductUsecase} from "@/application/usecases/products/update-product.usecase";
import {DeleteProductUsecase} from "@/application/usecases/products/delete-product.usecase";
import {GetProductsByCategoryUseCase} from "@/application/usecases/products/get-products-by-category.usecase";
import {UuidGenerator} from "@/infrastructure/providers/uuid-generator";

@Module({
    controllers: [ProductController],
    providers: [
        {
            provide: "PrismaService",
            useClass: PrismaService,
        },
        {
            provide: "UuidGenerator",
            useClass: UuidGenerator,
        },
        {
            provide: "ProductRepository",
            useFactory: (prismaService: PrismaService) => {
                return new ProductPrismaRepository(prismaService);
            },
            inject: [PrismaService],
        },
        {
            provide: CreateProductUseCase.UseCase,
            useFactory: (
                productRepository: ProductPrismaRepository,
                uuidGenerator: UuidGenerator,
            ) => {
                return new CreateProductUseCase.UseCase(productRepository, uuidGenerator);
            },
            inject: ["ProductRepository", "UuidGenerator"],
        },
        {
            provide: UpdateProductUsecase.UseCase,
            useFactory: (productRepository: ProductPrismaRepository) => {
                return new UpdateProductUsecase.UseCase(productRepository);
            },
            inject: ["ProductRepository"],
        },
        {
            provide: DeleteProductUsecase.UseCase,
            useFactory: (productRepository: ProductPrismaRepository) => {
                return new DeleteProductUsecase.UseCase(productRepository);
            },
            inject: ["ProductRepository"],
        },
        {
            provide: GetProductsByCategoryUseCase.UseCase,
            useFactory: (productRepository: ProductPrismaRepository) => {
                return new GetProductsByCategoryUseCase.UseCase(productRepository);
            },
            inject: ["ProductRepository"],
        },
    ],
})

export class ProductModule {
}
