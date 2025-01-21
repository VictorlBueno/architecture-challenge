import {Client} from "@prisma/client";
import {ClientEntity} from "@/domain/entities/client.entity";

export class ClientModelMapper {
    static toEntity(model: Client) {
        const data = {
            id: model.id,
            name: model.name,
            cpf: model.cpf,
        };

        return new ClientEntity(data);
    }
}