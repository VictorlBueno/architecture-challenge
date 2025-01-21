import {Body, Controller, Get, Inject, Param, Post, Put} from "@nestjs/common";
import {UpdateOrderUseCase} from "@/application/usecases/orders/update-order.usecase";
import {CreateOrderDto} from "@/infrastructure/dtos/create-order.dto";
import {UpdateOrderDto} from "@/infrastructure/dtos/update-order.dto";
import {CreateOrderUseCase} from "@/application/usecases/orders/create-orders.usecase";
import {GetOrdersUseCase} from "@/application/usecases/orders/get-orders.usecase";
import {GetOrderPaymentStatusUseCase} from "@/application/usecases/orders/get-order-payment-status.usecase";

@Controller("orders")
export class OrderController {
    @Inject(CreateOrderUseCase.UseCase)
    private createOrderUseCase: CreateOrderUseCase.UseCase;

    @Inject(UpdateOrderUseCase.UseCase)
    private updateOrderUseCase: UpdateOrderUseCase.UseCase;

    @Inject(GetOrderPaymentStatusUseCase.UseCase)
    private getOrderPaymentStatusUseCase: GetOrderPaymentStatusUseCase.UseCase;

    @Inject(GetOrdersUseCase.UseCase)
    private listOrdersUseCase: GetOrdersUseCase.UseCase;

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return this.createOrderUseCase.execute(createOrderDto);
    }

    @Get()
    async search() {
        return this.listOrdersUseCase.execute();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.getOrderPaymentStatusUseCase.execute({id});
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.updateOrderUseCase.execute({id, ...updateOrderDto});
    }
}
