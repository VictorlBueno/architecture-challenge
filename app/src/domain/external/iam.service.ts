import {ClientEntity} from "../entities/client.entity";

export interface IamService {
    createUser(client: ClientEntity): Promise<ClientEntity>;

    getUserDetailsByCpf(cpf: string): Promise<ClientEntity>;
}