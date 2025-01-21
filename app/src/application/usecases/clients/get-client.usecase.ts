import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {ClientOutputDto} from "@/application/dtos/client-output.dto";
import {ClientRepository} from "@/domain/repositories/client.repository";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";

export namespace GetClientUseCase {
    export type Input = {
        cpf: string;
    };

    export type Output = ClientOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private clientRepository: ClientRepository,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {cpf} = input;

            if (!cpf) {
                throw new BadRequestError("CPF not provided");
            }

            const client = await this.clientRepository.findById(cpf);
            return client.toJSON();
        }
    }
}