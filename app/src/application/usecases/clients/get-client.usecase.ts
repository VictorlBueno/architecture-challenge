import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {ClientOutputDto} from "@/application/dtos/client-output.dto";
import {ClientRepository} from "@/domain/repositories/client.repository";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {IamService} from "@/domain/external/iam.service";

export namespace GetClientUseCase {
    export type Input = {
        cpf: string;
    };

    export type Output = ClientOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private iamService: IamService) {
        }

        async execute(input: Input): Promise<Output> {
            return await this.iamService.getUserDetailsByCpf(input.cpf);
        }
    }
}