import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PayMockUseCase } from "@/application/usecases/paymock/pay-mock.usecase";
import {OrderOutputDto} from "@/application/dtos/order-output.dto";

@ApiTags('payment')
@Controller("paymock")
export class PaymockController {
    @Inject(PayMockUseCase.UseCase)
    private payMockUseCase: PayMockUseCase.UseCase;

    @Get(":id")
    @ApiOperation({
        summary: 'Mock payment for an order',
        description: 'Simulates a payment approval for testing purposes'
    })
    @ApiParam({
        name: 'id',
        description: 'Order ID to process payment',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({
        status: 200,
        description: 'Payment processed successfully',
        type: OrderOutputDto
    })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async update(@Param("id") id: string) {
        return this.payMockUseCase.execute({id});
    }
}