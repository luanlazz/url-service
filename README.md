## Description

Este sistema possui serviços para usuário, autenticação e URL.

Usuário:
- cadastro
- listar todos ou por id

Autenticação:
- login

URL:
- encurtar uma URL
- redirecionar para endereço original a partir de uma url encurtada
- Listagem de URL (usuário autenticado)
- Atualização de URL (usuário autenticado)
- Exclusão de URL (usuário autenticado)

## Running the app

Primeiro passo é criar o arquivo `.env` seguindo como modelo `.env.example`.

```bash
cp .env.example .env2
```

Após, basta subir o serviço com o seguinte comando:

```bash
$ sudo docker compose up --build
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```