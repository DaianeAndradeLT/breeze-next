# Documentação: Configuração e Execução do Projeto

Este guia fornece instruções passo a passo para configurar e executar o projeto localmente.

Este projeto é composto por duas partes, sendo elas
- Repositório do Backend: [BackEnd](https://github.com/DaianeAndradeLT/laravel-api-test)
- Repositório do Frontend: [Front](https://github.com/DaianeAndradeLT/breeze-next)
## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [PHP](https://www.php.net/) >= 8.2
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) >= 12.x
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um servidor de banco de dados MySQL

## Configuração do FrontEnd

1. Clone o repositório do projeto: `git clone https://github.com/DaianeAndradeLT/laravel-api-test`

2. Navegue até o diretório do projeto: `cd <diretorio_do_projeto>`

3. Instale as dependências:`npm install`

4. Crie um arquivo .env baseado no exemplo fornecido em .env.example (por padrão a url do backend já está definida no 127.0.0.1:8000, provavelmente você não vai precisar alterar nada )

5. Inicie o servidor: `npm run dev`

## Acesso ao Projeto

Se tudo correr bem, esperamos que os sevirdores estejam rodando em:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
