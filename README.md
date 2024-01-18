<h1 align="center">
  Rocketnotes API
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-execução">Instalação e Execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-deploy">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- TypeScript
- NodeJS
- Express
- Knex
- SQlite
- Postgres
- Cookies
- Zod

## 💻 Projeto

Essa API foi desenvolvida para suprir de Back-end da aplicação [G-Drive](https://github.com/AlanRehfeldt/g-drive-app).

### ⚙️ Recursos da API

- [x] Cadastro e autenticação de usuários com geração de JwToken;
- [x] Autenticação de usuários com JwToken;
- [x] Permite usuário cadastrar-se e atualizar seu perfil;
- [x] Validação de credenciais no cadastro;
- [x] O usuário podec criar pastas e arquivos;
- [x] O usuário pode compartilhar seus arquivos e pastas e fornecer permissões de leitura, escrita, deleção e premissões de compartilhamento para outros usuários;
- [x] O usuário administrados tem todas as permissões para gerenciar todas as pastas e aquivos de todos os usuários;

## 👨‍💻 Instalação e execução

1. Abra o terminal do seu computador. 
3. Faça um clone desse repositório rodando: <br> `git clone https://github.com/AlanRehfeldt/g-drive_project.git`;
4. Entre na pasta rodando pelo terminal: `cd g-drive_project`;
5. Rode `npm i` para instalar as dependências do projeto;
6. Informar variáveis de ambiente no arquivo .env;
7. Rode `npm run knex -- migrate:latest` para criar tabelas no banco de dados;
7. Rode `npm run knex -- seed:run` para popular o banco de dados;
8. Rode `npm run dev` para iniciar o servidor de desenvolvimento.

## 🔗 Deploy
Aplicação hospedada e rodando no [Render](https://g-drive-api-zafv.onrender.com)

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito por Alan Rehfeldt :wave: 
