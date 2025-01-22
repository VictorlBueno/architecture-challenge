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
3. Siga uma das opções abaixo para iniciar o sistema:
#### Via make - kubernetes
```bash
make deploy
```
#### Via manual - kubernetes
```bash
# inicialização dos serviços
kubectl apply -f db-config.yaml
kubectl apply -f app-config.yaml
kubectl apply -f db-secret.yaml
kubectl apply -f db-deployment.yaml
kubectl apply -f db-service.yaml

# aguardando banco de dados
kubectl wait --for=condition=ready pod -l app=fiap-db --timeout=60s

# inicialização da aplicação
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
kubectl apply -f app-hpa.yaml

# obter a url da aplicação
minikube service nest-app-service --url 
# Adicione /api ao final da URL para acessar a documentação
# Exemplo: http://192.168.59.100:31024/api
```
#### Via docker
```bash
cd app
docker compose up -d
```

## 📝 Fluxo de Uso
Você pode criar diretamente no swagger em /api ou realizar as requisições abaixo.

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
http://url_gerado:3000/api
# execute para obter a url: minikube service nest-app-service --url 
```

# Arquitetura do Sistema

## Requisitos de Negócio
O sistema de autoatendimento foi desenvolvido para atender a uma lanchonete de bairro que está expandindo. A necessidade surgiu devido ao caos no atendimento sem um sistema de controle de pedidos, onde os atendentes podem esquecer ou errar pedidos complexos, impactando a satisfação do cliente. O sistema tem como objetivo:
1. Melhorar a eficiência na gestão de pedidos, produtos e clientes.
2. Garantir que pedidos complexos sejam registrados e preparados corretamente.
3. Reduzir o erro humano e melhorar a experiência do cliente com um sistema de autoatendimento.

## Requisitos de Infraestrutura
A arquitetura foi pensada para ser escalável, utilizando Minikube, Docker Hub e Kubernetes.

### 1. **Minikube**:
- Foi utilizado para criar um ambiente Kubernetes local para desenvolvimento e testes. Isso permite simular a infraestrutura em um cluster local antes da implantação em nuvem.

### 2. **Docker Hub**:
- As imagens Docker dos serviços (backend da API, banco de dados, etc.) estão armazenadas no Docker Hub, facilitando a distribuição e implantação no Kubernetes.

### 3. **Kubernetes**:
- A aplicação é orquestrada com Kubernetes, utilizando deployments e serviços para garantir a alta disponibilidade e escalabilidade.
- A configuração do banco de dados, serviços da API e deployment são todos controlados pelo Kubernetes, com o uso de arquivos YAML para automação da implantação.

## Desenho da Arquitetura
![FIAP - Challenge drawio](https://github.com/user-attachments/assets/47266fce-24d2-4706-b65c-6dad863e5e24)

1. **Banco de Dados (DB)**:
    - O banco de dados é configurado no Kubernetes, garantindo que os dados dos pedidos e clientes sejam persistentes e possam ser acessados de forma eficiente.

2. **API (NestJS)**:
    - A API que gerencia a lógica de negócios e interação com o banco de dados é implantada como um serviço no Kubernetes.

3. **Interface de Autoatendimento**:
    - Embora não descrita diretamente na API, a interface de autoatendimento que os clientes utilizam é integrada com os endpoints da API para realizar o cadastro de clientes, pedidos, e simulação de pagamentos.

4. **Minikube & Kubernetes**:
    - Minikube foi utilizado para criar um cluster local para testar a infraestrutura antes da implantação em produção, com Kubernetes garantindo a escalabilidade e gestão de recursos.

## Considerações Finais
Essa arquitetura reflete uma infraestrutura que pode ser escalada facilmente para lidar com o crescimento da lanchonete, melhorando a eficiência do atendimento e a experiência dos clientes.