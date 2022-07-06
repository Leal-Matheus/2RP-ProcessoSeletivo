<h1 align="center">2RP-Teste Prático 🌐</h1>

<h2>Estágio FullStack Developer</h2>

<h2>Como utilizar aplicação? </h2>
<h4>Algumas ferramentas necessarias</h4>
 <ul>NodeJS: nodejs.org/en/</l>
 <ul>.NET: https://dotnet.microsoft.com/en-us/</l>
 <ul>GIT: https://git-scm.com/</l>
 
 <h4>Criando o Banco</h4>
  <ul>1. Acesse a pasta "BD" e em seguida scripts</ul>
  <ul>2. Abra os arquivos "DDL, DML e DQl"</ul>
  <ul>3. Execute um de cada vez na ordem citada a cima</ul>
 
 <h4>Utilizar a API</h4>
  <ul>1. Acesse a pasta "API" e logo em seguida a pasta "Processo2RP_API"</ul>
  <ul>2. Dentro da pasta abra o cmd e utilize o comando "dotnet run"</ul>
  
 <h4>Utilizar o FrontEnd</h4>
  <ul>1. Acesse a pasta "FrontEnd" e em seguida a pasta processo-front</ul>
  <ul>2. Dentro da paste utilize o git para os comandos:</ul>
  <ul>3. npm install - para instalar todas as dependencias</ul>
  <ul>4. npm start - para iniciar a apliação</ul>


<h2 align="left">Tecnologias e Plataformas utilizadas</h2>
<p align="left">
  <h4>BackEnd</h3>
  <a><img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white"/></a>
   <h4>FrontEnd</h3>
  <a><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/></a>
   <h4>Banco de Dados</h3>
  <a><img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/></a>
</p>

<h2>Escopo - Problema 1</h2>

<p>Criar um sistema que possibilite o cadastro e login de usuários</p>

<h2>Funções:</h2>
<ol>1. Cadastrar um novo usuário</ol>
<ol>2. Listar informações de um usuário</ol>
<ol>3.  Alterar o nome e o tipo de um usuário</ol>
<ol>4. Excluir um usuário</ol>
<ol>5 Alterar o Status de um usuário (ativo ou inativo)</ol>


<h2>Regras de Negócio:</h2>
<ul>• A tabela usuários deve conter os campos nome, senha, tipo, email e status</ul>
<ul>• A tabela de tipos deve ter o tipo do usuário (geral, admin, root)</ul>
<ul>• Um usuário pode ter apenas um único tipo</ul>
<ul>• Apenas usuários do tipo root e admin podem cadastrar novos usuários</ul>
<ul>• Apenas usuários do tipo root e admin podem alterar qualquer informação do usuário (inclusive status)</ul>
<ul>• Apenas usuários root podem excluir usuários</ul>
<ul>• Usuários do tipo geral só têm acesso a funcionalidade de listar informações de seu próprio usuário, bem como alterar suas próprias informações</ul>
<ul>• O login deve ser feito com email e senha.</ul>
