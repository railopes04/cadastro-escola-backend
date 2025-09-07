# OFICINA II - Sistema de Cadastro de Alunos e Professores

Sistema de cadastro de alunos e professores desenvolvido em Node.js, utilizando Express, PostgreSQL e Prisma ORM. O projeto segue a arquitetura MVC (Model-View-Controller) e foi criado como parte de uma atividade prática do módulo avançado do Curso de Extensão Capacita Brasil.

---

### Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para criar a API.
* **Prisma ORM**: ORM (Object-Relational Mapping) para interagir com o banco de dados.
* **PostgreSQL**: Banco de dados relacional.
* **dotenv**: Para gerenciar variáveis de ambiente de forma segura.
* **Insomnia/Postman**: Para testes

---

### Começando

Siga os passos abaixo para clonar o repositório, configurar o ambiente e rodar o projeto localmente.

#### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
* **Node.js** (versão 14 ou superior)
* **npm** (gerenciador de pacotes do Node)
* **PostgreSQL** (com um banco de dados criado para o projeto)
* **Testes de API**: Insomnia/Postman

#### Instalação

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-seu-projeto.git](https://github.com/seu-usuario/nome-do-seu-projeto.git)
    cd nome-do-seu-projeto
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e adicione a sua URL de conexão com o PostgreSQL.
    ```env
    DATABASE_URL="postgresql://[USUARIO]:[SENHA]@[HOST]:[PORTA]/[NOME_DO_DB]?schema=public"
    ```
    *Exemplo:* `DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/escola_db?schema=public"`

4.  Execute as migrações do Prisma para criar as tabelas no seu banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  Inicie o servidor:
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000`.

---

### Endpoints da API

A API oferece endpoints para gerenciar **Alunos** e **Professores**.

#### Endpoints de Alunos (`/alunos`)

| Método | Endpoint | Descrição | Corpo da Requisição |
| :--- | :--- | :--- | :--- |
| `GET` | `/alunos` | Lista todos os alunos. | `Nenhum` |
| `POST` | `/alunos` | Cadastra um novo aluno. | `x-www-form-urlencoded`: `nome`, `email`, `idade` |
| `PUT` | `/alunos/:id` | Atualiza o nome, e-mail e/ou idade de um aluno. | `x-www-form-urlencoded`: `nome`, `email`, `idade` |
| `DELETE` | `/alunos/:id`| Exclui um aluno pelo ID. | `Nenhum` |

#### Endpoints de Professores (`/professores`)

| Método | Endpoint | Descrição | Corpo da Requisição |
| :--- | :--- | :--- | :--- |
| `GET` | `/professores` | Lista todos os professores. | `Nenhum` |
| `POST` | `/professores` | Cadastra um novo professor. | `x-www-form-urlencoded`: `nome`, `email`, `idade` |
| `PUT` | `/professores/:id` | Atualiza o nome, e-mail e/ou idade de um professor. | `x-www-form-urlencoded`: `nome`, `email`, `idade` |
| `DELETE`| `/professores/:id`| Exclui um professor pelo ID. | `Nenhum` |

---

### Estrutura do Projeto

A aplicação é organizada no padrão MVC.