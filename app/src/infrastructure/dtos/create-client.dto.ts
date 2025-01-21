import {CreateClientUseCase} from "@/application/usecases/clients/create-client.usecase";

export class CreateClientDto implements CreateClientUseCase.Input {
    cpf: string;
    name: string;
}