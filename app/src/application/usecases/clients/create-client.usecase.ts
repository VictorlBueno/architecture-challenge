import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {ClientOutputDto} from "@/application/dtos/client-output.dto";
import {ClientEntity} from "@/domain/entities/client.entity";
import {IamService} from "@/domain/external/iam.service";

export namespace CreateClientUseCase {
    export type Input = {
        name: string;
        cpf: string;
    };

    export type Output = ClientOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private iamService: IamService
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const clientEntity = new ClientEntity({
                name: input.name,
                cpf: input.cpf,
            })

            return await this.iamService.createUser(clientEntity);
        }
    }
}