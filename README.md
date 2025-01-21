# Fast Food Self-Service API

Sistema de autoatendimento para fast food que permite gerenciar pedidos, produtos e clientes de forma eficiente.

## 🚀 Execução

### Pré-requisitos
- Kubernetes instalado e configurado
- kubectl configurado
- Acesso a um cluster Kubernetes (local ou na nuvem)

### Iniciando o sistema
1. Clone o repositório
2. Navegue até a pasta do projeto
3. Execute o comando para aplicar as configurações do Kubernetes:
```bash
kubectl apply -f .
```

## 📝 Fluxo de Uso

### 1. Criar um Cliente
Crie um novo cliente que será associado aos pedidos.

```http
POST /clients

{
    "name": "John Doe",
    "cpf": "12345678900"
}
```

**Resposta esperada:**
```json
{
    "id": "uuid-gerado",
    "name": "John Doe",
    "cpf": "12345678900"
}
```

### 2. Criar Produtos
Configure o cardápio adicionando produtos.

```http
POST /products

{
    "name": "X-Burger",
    "description": "Hambúrguer com queijo",
    "price": 15.99,
    "category": "FOOD"
}
```

**Categorias disponíveis:**
- FOOD (Lanches)
- SIDE (Acompanhamentos)
- DRINK (Bebidas)
- DESSERT (Sobremesas)

**Resposta esperada:**
```json
{
    "id": "uuid-gerado",
    "name": "X-Burger",
    "description": "Hambúrguer com queijo",
    "price": 15.99,
    "category": "FOOD"
}
```

### 3. Criar um Pedido
Crie um pedido associando um cliente e produtos.

```http
POST /orders

{
    "clientId": "id-do-cliente-criado",
    "products": ["id-do-produto-1", "id-do-produto-2"]
}
```

**Resposta esperada:**
```json
{
    "id": "uuid-gerado",
    "clientId": "id-do-cliente",
    "products": [...],
    "status": "RECEIVED",
    "paymentStatus": "PENDING",
    "total": 31.98,
    "createdAt": "2024-01-21T10:30:00Z"
}
```

### 4. Simular Pagamento
Simule a aprovação do pagamento usando o endpoint de mock.

```http
GET /paymock/{order-id}
```

**Resposta esperada:**
```json
{
    "orderId": "id-do-pedido",
    "status": "APPROVED"
}
```

### 5. Verificar Status do Pedido
Consulte o status atual do pedido.

```http
GET /orders/{order-id}
```

**Resposta esperada:**
```json
{
    "id": "uuid-do-pedido",
    "status": "IN_PREPARATION",
    "paymentStatus": "APPROVED",
    ...
}
```

### 6. Listar Pedidos na Fila
Visualize todos os pedidos ativos ordenados por prioridade.

```http
GET /orders
```

**Resposta esperada:**
```json
[
    {
        "id": "pedido-1",
        "status": "READY",
        ...
    },
    {
        "id": "pedido-2",
        "status": "IN_PREPARATION",
        ...
    },
    {
        "id": "pedido-3",
        "status": "RECEIVED",
        ...
    }
]
```

## 📋 Status do Pedido
Os pedidos seguem o seguinte fluxo de status:
1. RECEIVED (Pedido recebido)
2. IN_PREPARATION (Em preparação)
3. READY (Pronto para retirada)
4. COMPLETED (Finalizado)

## 💳 Status do Pagamento
O pagamento pode ter os seguintes status:
- PENDING (Aguardando pagamento)
- APPROVED (Pagamento aprovado)
- REJECTED (Pagamento rejeitado)

## ⚠️ Notas Importantes
- Os pedidos só entram em preparação após a confirmação do pagamento
- A listagem de pedidos não inclui pedidos finalizados (status COMPLETED)
- A ordem de prioridade na fila é: READY > IN_PREPARATION > RECEIVED
- Dentro do mesmo status, pedidos mais antigos têm prioridade

## 📚 Documentação Adicional
A documentação completa em Swagger da API está disponível em:
```
http://localhost:3000/api
```