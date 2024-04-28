melhorar validação de endereço
melhorar validação do documentId (cpf)
melhorar a compra de items podendo comprar vários items ao mesmo tempo
evitar concorrência no banco de dados, usar um lock (otimista ou pessimista)
melhorar authenticação utilizando jwt ao registrar usuário


<div align='center'>
	<h1>Loja Online de Produtos e Serviços</h1>
	<img src='https://img.shields.io/github/languages/top/nitoba/picpay-challenge' alt='Linguagem mais utilizada' />
	<img src='https://img.shields.io/github/last-commit/nitoba/picpay-challenge' alt='Último commit' />
</div>

## 🚀 Introdução
Este projeto consiste em uma api para um sistema web que permite a venda de produtos e serviços online.


## 👨‍💻 Tecnologias

- [Javascript/Typescript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): Linguagem de programação principal.
- [NodeJs](nodejs.org/en): Plataforma para executar código javascript fora do navegador.
- [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional para persistência de dados.
- [Docker](https://www.docker.com/): Ambiente de conteinerização para aplicações.
- [Fastify](https://fastify.dev/): Web framework para construção APIs em NodeJS.
- [PrismaORM](https://www.prisma.io/): ORM (Object-Relational Mapping) para facilitar a comunicação com banco de dados.
- [Vitest](https://vitest.dev/): Ferramenta para o desenvolvimento de teste automatizados.

## 🏗️ Design Patterns

A aplicação segue os seguinte design patters:

1. **Clean Architecture**: The project structure is organized in layers (entities, use cases, interfaces) to separate concerns and facilitate maintenance.

2. **Domain Driven Design (DDD)**: The software design is domain-oriented, focusing on business rules and main entities.

3. **Dependency Injection**: Inversion of control and dependency injection are used to ensure code flexibility and testability.

4. **Ports and Adapters**: The ports and adapters pattern, also known as hexagonal architecture, is a software design pattern that creates loosely coupled application components.

## 🎯 O sistema oferece as seguintes funcionalidades
- **Cotação de produtos e serviços:** Os clientes podem realizar cotações de produtos e serviços sem a necessidade de se registrar na plataforma. No entanto, para finalizar a compra, o cliente precisa se identificar.
- **Venda de combos de serviços, serviços avulsos e produtos:** O sistema permite a venda de combos de serviços, serviços avulsos e produtos. Os preços dos produtos e serviços são definidos na tabela de preços.
- **Análise de cobertura:** Quando o cliente compra um serviço de internet, o sistema realiza uma análise de cobertura para verificar se o serviço está disponível na região do cliente.
- **Cadastro de clientes:** O sistema permite o cadastro de clientes. Os campos obrigatórios para o cadastro são CPF, nome, idade e endereço completo.

## 🔧 Executando o projeto

Para rodar a aplicação você precisa  ter o [NodeJS](https://nodejs.org/en) and [Docker](https://www.docker.com/) instalados na sua máquina.
- Rode o comando touch .env && cp .env.example .env para criar o arquivo de variáveis de ambiente.
- Rode o comando `npm i` para instalar as dependências.
- Rode o comando `docker compose up -d` para subir o banco de dados.
- Rode o comando `npx prisma migrate deploy` para aplicar as migrações ao banco de dados.
- Rode o comando `npx prisma db seed` para popular os banco com dados iniciais.
- Rode o comando `npm run dev` para inciar a aplicação.
- Abra no seu navegador o endereço http://localhost:3333/docs para visualizar a rotas da API através do Swagger UI.
- Para executar os testes unitários rode o comando `npm run test`
- Para executar os testes de integração rode o comando `npm run test:integration`


## 🧑‍💻 Possíveis melhorias
- Write unite tests for the api server
- Add dependency injection system to auto create the objects and inject them in the controllers

## 📄 Licença

Este projeto encontra-se sob a licença MIT. Acesse o link [LICENSE](https://mit-license.org/) para mais detalhes.

## 🌐 GitHub

O código dessa aplicação pode ser encontrado no GitHub: [Project Link](https://github.com/nitoba/picpay-challenge)

## 📧 Contato

Em caso de dúvidas ou sugestões entre em contato através do email: [nito.ba.dev@gmail.com](mailto:nito.ba.dev@gmail.com).