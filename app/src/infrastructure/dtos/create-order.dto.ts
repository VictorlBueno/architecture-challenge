import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderUseCase } from "@/application/usecases/orders/create-orders.usecase";

export class CreateOrderDto implements CreateOrderUseCase.Input {
    @ApiProperty({
        description: 'Client ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    clientId: string;

    @ApiProperty({
        description: 'Array of product IDs',
        example: ['123e4567-e89b-12d3-a456-426614174000'],
        type: [String]
    })
    products: string[];
}