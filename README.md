## Desafio Wallet-Core - Full Cycle 3.0

Desenvolva um microsserviço em sua linguagem de preferência que seja capaz de receber via Kafka os eventos gerados pelo microsserviço "Wallet Core" e persistir no banco de dados. Será necessário criar os seguintes endpoints:

- "/balance/{account_id}" que exibe o balance atualizado. </br>
- "/client" para cadastrar o cliente </br>
- "/account" para cadastrar uma conta </br>
- "/transaction" para realizar uma transferencia entre as contasbff5090d-c260-4f8a-8a86-e24bceda78ac

Requisitos para entrega:

- Com um único docker-compose up -d todos os microsserviços, incluindo o da wallet core precisam estar disponíveis para que possamos fazer a correção.
- Não esqueça de rodar migrations e popular dados fictícios em ambos bancos de dados (wallet core e o microsserviço de balances) de forma automática quando os serviços subirem.
- Gere o arquivo ".http" para realizarmos as chamadas em seu microsserviço
- Disponibilize o microsserviço na porta: 3003.

## Exemplo de env

```bash
NODE_ENV=tst

PORT=3003

# configuracao do banco de dados
MYSQL_HOST=mysql_dev
MYSQL_PORT=25570
MYSQL_USER=wallet
MYSQL_PASSWORD=wallet
MYSQL_DATABASE=wallet
MYSQL_RANDOM_ROOT_PASSWORD=true

#configuracao do kafka
KAFKA_BROKER_URL=kafka:29092
KAFKA_GROUP_ID=wallet-core
KAFKA_CLIENT_ID=wallet-core
TRANSACTION_TOPIC=transaction
UPDATE_BALANCE_TOPIC=updateBalance
```

## Executando a aplicação

```bash
# development
docker compose up
```

Terá uma documentação simples no http://localhost:3003/documentation

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Descrição da organização dos arquivos

application: contém os arquivos de token e modulos utilizados pelo nestjs. </br>
api/controller: arquivos de controller e os dtos com decorações para o swagger </br>
core/\_share: arquivos de interface e comuns em todo os dominios. </br>
core/entity: entidades dos dominios.</br>
core/use-case: use case de todos os dominios. </br>
infrastructure/config: arquivos de configuração para acessar arquivos externos.</br>
infrastructure/database: arquivos de c onfiguração para banco de dados</br>
infrastructure/event: adaptres para eventos
:

## Melhorias

- Tratamento de erros
- Adicionar validação no controller
- Adicionar teste e2e
- Melhorar docker compose para o kafka
