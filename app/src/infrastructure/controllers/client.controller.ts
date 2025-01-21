import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import {CreateClientUseCase} from "@/application/usecases/clients/create-client.usecase";
import {GetClientUseCase} from "@/application/usecases/clients/get-client.usecase";
import {CreateClientDto} from "@/infrastructure/dtos/create-client.dto";

@Controller("clients")
export class ClientController {
    @Inject(CreateClientUseCase.UseCase)
    private createClientUseCase: CreateClientUseCase.UseCase;

    @Inject(GetClientUseCase.UseCase)
    private getClientUseCase: GetClientUseCase.UseCase;

    @Post()
    async create(@Body() createClientDto: CreateClientDto) {
        return this.createClientUseCase.execute(createClientDto);
    }

    @Get(":cpf")
    async findOne(@Param("cpf") cpf: string) {
        return this.getClientUseCase.execute({cpf});
    }
}
