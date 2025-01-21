import {GetClientUseCase} from "@/application/usecases/clients/get-client.usecase";

export class CreateClientDto implements GetClientUseCase.Input {
    cpf: string;
}