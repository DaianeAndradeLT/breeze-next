# Documentação: Configuração e Execução do Projeto

Este guia fornece instruções passo a passo para configurar e executar o projeto localmente.

Este projeto é composto por duas partes:

- Repositório do Backend: [simple-api-integration](https://github.com/DaianeAndradeLT/simple-api-integration)
- Repositório do Frontend: [breeze-next](https://github.com/DaianeAndradeLT/breeze-next)

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) >= 12.x
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Configuração do Frontend

1. Clone o repositório do projeto frontend:

    ```bash
    git clone https://github.com/DaianeAndradeLT/breeze-next
    ```

   Repositório do Frontend: [breeze-next](https://github.com/DaianeAndradeLT/breeze-next)

2. Navegue até o diretório do projeto frontend:

    ```bash
    cd <diretorio_do_projeto_frontend>
    ```

3. Instale as dependências do Yarn:

    ```bash
    yarn install
    ```

4. Inicie o servidor de desenvolvimento:

    ```bash
    yarn dev
    ```

   O servidor será iniciado em `http://localhost:3000`.

## Acesso ao Projeto

Se tudo correr bem, esperamos que o servidor esteja rodando em:

- Frontend: `http://localhost:3000`

# Documentação: conhecendo o projeto

## Estrutura de Código

O código do frontend segue uma estrutura comum para projetos Next.js e React, e inclui as seguintes pastas e arquivos:

- `pages`: Contém as páginas da aplicação, onde cada arquivo corresponde a uma rota acessível.
- `components`: Contém componentes reutilizáveis em toda a aplicação.
- `styles`: Contém arquivos de estilo da aplicação, utilizando Tailwind CSS.
- `public`: Contém arquivos estáticos, como imagens e fontes.

## Bibliotecas Principais Utilizadas

O projeto frontend utiliza as seguintes bibliotecas principais:

- **React:** Biblioteca JavaScript para criar interfaces de usuário.
- **Next.js:** Framework React que permite a renderização do lado do servidor e a geração de páginas estáticas.
- **Tailwind CSS:** Framework de CSS utilitário para criação rápida de estilos.

Além disso, outras bibliotecas foram utilizadas para funcionalidades específicas, como manipulação de requisições HTTP, estilos, e componentes de UI.
