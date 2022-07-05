<h1 align="center">2RP-Teste Prático 🌐</h1>

<h4>Estágio FullStack Developer</h4>

<h3>Escopo - Problema 1</h3>

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
