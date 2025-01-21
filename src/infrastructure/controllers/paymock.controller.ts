import {Controller, Get, Inject, Param, Post, Put} from "@nestjs/common";
import {PayMockUseCase} from "@/application/usecases/paymock/pay-mock.usecase";

@Controller("paymock")
export class PaymockController {
    @Inject(PayMockUseCase.UseCase)
    private payMockUseCase: PayMockUseCase.UseCase;

    @Get(":id")
    async update(@Param("id") id: string) {
        return this.payMockUseCase.execute({id});
    }
}
