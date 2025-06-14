# Sistema de Gerenciamento de Estoque - ApiEstoque

Este repositório contém os arquivos de um projeto acadêmico desenvolvido para a disciplina de Tópicos Especiais, focado na criação de um sistema de gerenciamento de estoque. O projeto consiste em uma API RESTful em C# com .NET e Entity Framework Core, e um frontend interativo em HTML, CSS e JavaScript.

## Visão Geral do Projeto

O objetivo principal do "ApiEstoque" é fornecer uma solução eficiente para a gestão de produtos em um estoque. Ele aborda os desafios comuns no controle de inventário, como organização, rastreamento e análise de produtos, visando mitigar perdas financeiras e imprecisões nos relatórios.

## Funcionalidades

O sistema implementa as seguintes funcionalidades:

### API RESTful (Backend em C# com .NET e Entity Framework Core)
A API oferece operações CRUD completas para o gerenciamento de produtos:
* **Listar Produtos (GET /produtos)**: Retorna uma lista de todos os produtos no estoque.
* **Consultar Produto por ID (GET /produtos/{id})**: Retorna os detalhes de um produto específico.
* **Cadastrar Novo Produto (POST /produtos)**: Adiciona um novo produto ao estoque.
* **Atualizar Produto Existente (PUT /produtos/{id})**: Modifica as informações de um produto.
* **Excluir Produto (DELETE /produtos/{id})**: Remove um produto do estoque.

### Frontend (HTML, CSS, JavaScript)
Uma aplicação web interativa que se comunica com a API:
* **Tela de Cadastro**: Formulário para adicionar novos produtos ao estoque.
* **Tela de Listagem**: Exibe todos os produtos cadastrados com opções de edição e exclusão.
* **Tela de Relatório**: Apresenta análises do estoque, incluindo o valor total e produtos com baixo estoque.
* **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela.

## Estrutura do Projeto

O projeto é organizado em duas camadas principais:

* **`ApiEstoque/`**: Contém o código-fonte do backend da API.
    * **`Models/`**: Define a estrutura da entidade `Produto` e o `ProdutoContext` para interação com o banco de dados.
    * **`Migrations/`**: Contém as migrações do Entity Framework Core para o banco de dados SQLite.
    * **`Rotas/`**: Classes estáticas separadas para a organização das rotas da API (`ROTA_GET.cs`, `ROTA_POST.cs`, `ROTA_PUT.cs`, `ROTA_DELETE.cs`).
    * **`Program.cs`**: Arquivo de inicialização da aplicação, responsável pela configuração de serviços, CORS e mapeamento das rotas.
* **`Frontend/`**: Contém os arquivos da interface do usuário.
    * **`index.html`**: Página principal para listagem e edição de produtos.
    * **`cadastro.html`**: Página para cadastrar novos produtos.
    * **`relatorio.html`**: Página para visualizar relatórios de estoque.
    * **`css/style.css`**: Arquivo de estilos para a aplicação.
    * **`script.js`**: Lógica de interação do frontend com a API, incluindo funções para buscar, cadastrar, atualizar e excluir produtos, além de funcionalidades de relatório.

## Como Executar o Projeto

### Pré-requisitos

* [.NET SDK](https://dotnet.microsoft.com/download) (versão 8.0 ou superior)
* Navegador web (Google Chrome, Firefox, etc.)

### Configuração e Execução do Backend (API)

1.  **Navegue até a pasta da API:**
    ```bash
    cd ApiEstoque
    ```
2.  **Restaure as dependências do .NET:**
    ```bash
    dotnet restore
    ```
3.  **Execute as migrações para criar o banco de dados (SQLite):**
    ```bash
    dotnet ef database update
    ```
    *(Nota: Este comando criará o arquivo `estoque.db` na raiz do projeto e populará com dados iniciais se ainda não existirem.)*
4.  **Inicie a API:**
    ```bash
    dotnet run
    ```
    A API será iniciada e estará acessível em `http://localhost:5139` (ou na porta configurada no `launchSettings.json`).

### Configuração e Execução do Frontend

O frontend é uma aplicação estática e pode ser aberto diretamente no navegador.

1.  **Navegue até a pasta do Frontend:**
    ```bash
    cd Frontend
    ```
2.  **Abra os arquivos HTML no seu navegador:**
    * `index.html` (para listar e gerenciar produtos)
    * `cadastro.html` (para cadastrar novos produtos)
    * `relatorio.html` (para visualizar o relatório de estoque)

    Alternativamente, você pode usar uma extensão de servidor local no seu navegador (como "Live Server" para VS Code) para servir os arquivos estáticos e ter auto-recarregamento.

## Documentação Completa

Para informações mais detalhadas sobre o funcionamento interno, requisitos e estrutura do projeto, consulte o arquivo [DOCUMENTACAO-prova.pdf] localizado na raiz deste repositório.
