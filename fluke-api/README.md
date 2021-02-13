<div align=center>
  <img src="../.github/logo.png" width="200"/>
</div>

# Exercício 1

## Proposta

A proposta desse projeto foi a de desenvolver uma API REST, utilizando Nodejs e boas práticas de programação para desenvolver uma aplicação segura e escalável. Essa API realiza operações comuns de uma operadora de telefonia, cadastrando e listando clientes, compras de pacotes de dados e requisições de portabilidade.

## Índice

Esse README cobre os principais aspectos do projeto, em várias seções. Para acessar cada uma delas, utilize o índice abaixo.

- [Requisitos](#Requisitos)
- [Configuração do projeto](#Configuração-do-Projeto)
- [Rodando a aplicação](#Rodando-a-aplicação)
- [Testes](#Testes)
- [Rotas da aplicação](#Rotas-da-aplicação)
- [Fluxo da aplicação]()
- [Estrutura de pastas]()
- [Conexão com a base de dados escolhida]()
- [Ferramentas de padronização]()
- [Design Patterns]()

## Requisitos

Para poder utilizar a aplicação, certifique-se possuir em sua máquina.

- [nodejs]()
- [yarn]()

Além disso, é preciso ter uma base de dados mongodb funcional. Duas alternativas possíveis são o [atlas]() ou o uso de uma [imagem docker]().

## Configuração do projeto

**clone o repositório do projeto e instale as dependências**

```bash
git clone https://github.com/lucascprazeres/fluke

cd fluke-api

yarn
```

A seguir, faça uma cópia do arquivo *.env.example* e renomeie para *.env*. Agora é necessário preencher as variáveis de ambiente com:

- **APP_PORT**: A porta na qual o servidor deve rodar (Ex: 3333).

- **MONGODB_URL**: A url de conexão com a base mongo. Se você estiver rodando ela em localhost, sua url será: mongodb://localhost:porta_escolhida.

- **TOKEN_SECRET**: uma string qualquer, que será usada para gerar os tokens de autenticação.

- **TOKEN_EXPIRATION**: o tempo de duração da validade do token jwt. Inclua um número inteiro, seguido de um marcador de tempo ("d" para dia, "h" para horas e assim sucessivamente).

Tendo instalado as dependências, configurado a base de dados e preenchido as variéveis de ambiente em *.env*, você está pronto para utilizar a aplicação.

## Rodando o projeto

Para rodar o servidor em modo de desenvolvimento, em localhost, basta inserir o seguinte comando no terminal, dentro da pasta *fluke-api*.

```bash
yarn dev
```

## Testes

O projeto possui cobertura de testes unitários feitos com a biblioteca Jest, responsáveis por testar as classes de serviços, que contém as regras de negócio da aplicação.

Para executar todos os suítes de testes, basta inserir o comando


```bash
yarn test
```

Além disso você pode adicionar as opções **--verbose**, para exibir detalhes dos testes rodados e **--coverage**, para utilizar a ferramenta de **coverage report** do Jest, que imprime um relatório completo da aplicação, informando a cobertura dos testes na mesma, além de outros detalhes.

Você também pode passar o caminho para um único teste, se estiver interassado em executá-los individualmente.

```bash
yarn test __tests__/services/testeDesejado
```

## Rotas da aplicação

Essa API Rest possui 7 rotas, no total, responsáveis pelas operações comuns em uma operadora de telefonia.

### POST - /registerNewCustomer

Cria novo usuário para a api.

**corpo da requisição (JSON)**

```json
{
  "name": "John Doe",
  "email": "johndoe@email.com",
  "CPF": "111.111.111-11",
  "phonenumber": "(91) 98282-8383",
  "password": "senhasupersegura"
}
```

**resposta (JSON)**

```json
{
  "name": "John Doe",
  "email": "johndoe@email.com",
  "CPF": "111.111.111-11",
  "phonenumber": "(91) 98282-8383",
  "availablePackages": {
    "gb": 0,
    "minutes": 0
  },
  "_id": "6028177abc11095118f69fee"
}
```

### POST - /authenticate

Faz a requisição pelo token de autenticação de usuário

**corpo da requisição (JSON)**

```json
{
  "CPF": "111.111.111-11",
  "password": "senhasupersegura"
}
```

**resposta (JSON)**

```json
{
  "_id": "6028177abc11095118f69fee",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2M" // token variável
}
```

Feita a autenticação, você precisa guardar o token recebido e utilizá-lo para executar as
próximas rotas. Para utilizar o token, adicione-o ao header de sua requisição, na chave Authorization.
A forma de fazer isso vai depender da ferramenta utilizada para fazer as requisições (**axios**, **postman**, **insomnia** e etc), mas a aparência geral do header enviado será semelhante a

```json
"headers": {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6", // substitua pelo seu token
}
```

### POST - /productsOrder (Autenticada)

Realiza a compra fictícia de um pacote de dados.

**corpo da requisição (JSON)**

```json
{
  "gb": 15, // Gigabytes pedidos
  "minutes": 80 // minutos pedidos
}
```

**resposta (JSON)**

```json
{
  "customerId": "6028177abc11095118f69fee",
  "gb": 15,
  "minutes": 80,
  "orderedAt": "2021-02-13T18:31:46.034Z",
  "_id": "60281b12bc11095118f69fef"
}
```

A aplicação salvará o pedido e, logo em seguinda, atualizará os **availablePackages**
do usuário responsável pela requisição.

### GET - /currentPackage (Autenticada)

Retorna um relatório com os pedidos feitos, quantidade de pacotes atual e quantidade utilizada, de determinado usuário.

**resposta (JSON)**

```json
{
  "availablePackages": {
    "gb": 15,
    "minutes": 80
  },
  "usedPackages": {
    "gb": 0,
    "minutes": 0
  },
  "orderedPackages": [
    {
      "_id": "60281b12bc11095118f69fef",
      "customerId": "6028177abc11095118f69fee",
      "gb": 15,
      "minutes": 80,
      "orderedAt": "2021-02-13T18:31:46.034Z"
    }
  ]
}
```

*Obs: Apesar de ser uma rota do tipo GET, não se esqueça de adicionar o token de autenticação, no header da sua requisição.*

### POST - /portabilityRequest (Autenticada)

Solicita a abertura de um ticket de portabilidade para um usuário

**corpo da requisição (JSON)**

```json
{
	"name": "John Doe",
	"CPF": "111.111.111-11",
	"phonenumber": "(91) 98282-8383" // não precisa ser o número cadastrado no começo
}
```

**resposta (JSON)**

```json
{
  "customerId": "6028177abc11095118f69fee",
  "name": "John Doe",
  "CPF": "111.111.111-11",
  "phonenumber": "(91) 98282-8383",
  "isOpen": true,
  "requestedAt": "2021-02-13T18:41:40.631Z",
  "_id": "60281d64bc11095118f69ff0"
}
```

### GET - /portabilities (Autenticada)

Lista todos os tickets de portabilitade abertos para determinado usuário

**resposta (JSON)**

```json
[
  {
    "_id": "60281e87bc11095118f69ff2",
    "customerId": "6028177abc11095118f69fee",
    "name": "John Doe",
    "CPF": "111.111.111-11",
    "phonenumber": "(91) 98282-8383",
    "isOpen": true,
    "requestedAt": "2021-02-13T18:46:31.312Z"
  },
  {
    "_id": "60281e91bc11095118f69ff3",
    "customerId": "6028177abc11095118f69fee",
    "name": "John Doe",
    "CPF": "111.111.111-11",
    "phonenumber": "(91) 92454-4545",
    "isOpen": true,
    "requestedAt": "2021-02-13T18:46:41.032Z"
  }
]
```

### GET - /pipipi (Rota de teste)

**resposta (JSON)**

```json
{
  "message": "popopo"
}
```
