import {RepositoryInterface} from "@/domain/shared/repositories/repository";
import {ClientEntity} from "@/domain/entities/client.entity";

export interface ClientRepository extends RepositoryInterface<ClientEntity> {
    cpfExists(cpf: string): Promise<boolean>;
}