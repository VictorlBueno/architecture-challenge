import {UseCase as DefaultUseCase} from "@/application/shared/usecases/usecase";
import {ClientOutputDto} from "@/application/dtos/client-output.dto";
import {ClientRepository} from "@/domain/repositories/client.repository";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {ClientEntity} from "@/domain/entities/client.entity";
import {UuidGenerator} from "@/infrastructure/providers/uuid-generator";
import {ConflictError} from "@/application/shared/errors/conflict-error";

export namespace CreateClientUseCase {
    export type Input = {
        name: string;
        cpf: string;
    };

    export type Output = ClientOutputDto;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private clientRepository: ClientRepository,
            private uuidGenerator: UuidGenerator,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {name, cpf} = input;

            if (!name || !cpf) {
                throw new BadRequestError("Input data not provided");
            }

            const existingClient = await this.clientRepository.cpfExists(cpf);

            if (existingClient) {
                throw new ConflictError("Client already exists");
            }

            const entity = new ClientEntity({
                ...input,
                id: this.uuidGenerator.generate(),
            });

            await this.clientRepository.insert(entity);

            return entity.toJSON();
        }
    }
}