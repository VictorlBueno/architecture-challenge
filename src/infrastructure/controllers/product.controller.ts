import {Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put} from "@nestjs/common";
import {CreateProductUseCase} from "@/application/usecases/products/create-product.usecase";
import {GetProductsByCategoryUseCase} from "@/application/usecases/products/get-products-by-category.usecase";
import {CreateProductDto} from "@/infrastructure/dtos/create-product.dto";
import {UpdateProductDto} from "@/infrastructure/dtos/update-product.dto";
import {UpdateProductUsecase} from "@/application/usecases/products/update-product.usecase";
import {DeleteProductUsecase} from "@/application/usecases/products/delete-product.usecase";

@Controller("products")
export class ProductController {
    @Inject(CreateProductUseCase.UseCase)
    private createProductUseCase: CreateProductUseCase.UseCase;

    @Inject(UpdateProductUsecase.UseCase)
    private updateProductUseCase: UpdateProductUsecase.UseCase;

    @Inject(DeleteProductUsecase.UseCase)
    private deleteProductUseCase: DeleteProductUsecase.UseCase;

    @Inject(GetProductsByCategoryUseCase.UseCase)
    private getProductByCategoryUseCase: GetProductsByCategoryUseCase.UseCase;

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.createProductUseCase.execute(createProductDto);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.updateProductUseCase.execute({id, ...updateProductDto});
    }

    @HttpCode(204)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.deleteProductUseCase.execute({id});
    }

    @Get("category/:categoryId")
    async listByCategory(@Param("categoryId") categoryId: string) {
        return this.getProductByCategoryUseCase.execute({categoryId});
    }
}
