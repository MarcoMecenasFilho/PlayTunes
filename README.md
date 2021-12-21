<img src='./src/images/logopink.gif' width="100%">

<h1 align="center">PlayTunes</h1>
<h4 align="center"> 
	🚧  PlayTunes 🚀 Finalizado  🚧
</h4>
<br>
<h2>Sobre</h2>
<p align="justify"> Wallet - Casa de Câmbio - É uma carteira digital desenvolvida para a organização de seus gastos em compras internacionais. Podendo Escolher a categoria, método de pagamento, descrição e moeda daquela dispesa. Sendo tudo convertido para Real/BRL e somado automáticamente.
E sendo possível a edição e exclusão de qualquer despesa. </p 

### Features

-  Cadastro de usuário
-  Pesquisa de músicas
-  Lista de músicas favoritas
-  lista salvas localmente
<br>
## 🛠 Tecnologias

As seguintes ferramentas foram utilizadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources)
- [Node.js](https://nodejs.org/en/)
- [RTL](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/pt-BR/)
- [API-iTunes](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1)

<h2>Testar o projeto</h2>
<h4>Clique na imagem abaixo</h4>
<br>
<div align="center">
<a  href="https://wallet-exchange-office.herokuapp.com/" target="_blank"><img width="40%" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain-wordmark.svg" /></a> 
</div>
<br>
<h2>Instalar o projeto em sua máquina</h2>
<br>
<h3>Pré-requisitos</h3>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/). É necessário a utilização de um editor de código, e como recomendação deixo o [VSCode](https://code.visualstudio.com/).


###  Rodando a aplicação web.

```bash
# Clone este repositório
$ git clone git@github.com:MarcoMecenasFilho/PlayTunes.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd PlayTunes

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```
<h2>Utilizando a aplicação</h2>
<p align="justify">A tela inicial da aplicação é a página de login. Onde você adiciona seus dados e entra na carteira em si. Não existe servidores. Então todo o sistema de autenticação é simulado utilizando o localStore. E nenhuma informação é realmente enviada para algum lugar. E caso você não tenha um login, ou tenha esquecido. É só criar um novo usuário.</p>
<img src='./src/images/login.gif' width="100%">
<br>
<p align="justify">Para criar um novo usuário, basta clicar no botão, e adicionar um email qualquer com formato valido(@ e .com) e uma senha que seja maior que 6 caracteres. Lembrando que não existe backEnd. Todo o sistema de login é uma simulação. Recomendo a utilização de dados fictícios. </p>
<img src='./src/images/newuser.gif' width="100%">
<br>
<p align="justify">Quando efetuamos o Login, somos enviados para a página da carteira. Sendo muito simples sua utilização. Inserimos os dados que desejamos no forms e clicamos no botão de adicionar. Caso desejamos editar essa despesa, clicamos no botão de editar, onde cada despesa possui o seu. Inserimos os novos dados e editamos. Mas caso deseje excluir, apenas clique no botão de excluir na despesa.</p>
<img src='./src/images/wallet.gif' width="100%">
<br>
<p align="justify"> As despesa são armazenadas no localStore. Então caso feche seu navegador ou até mesmo desligue seu computador. Elas permaneceram salvas. Criar um novo usuário também não as modifica. </p>

### Rodando os testes
```bash
# Para rodar os testes, da página de login, use o comando
$ npm test ./tests/login.test.js

# Para rodar os testes, da página de novo usuário, use o comando
$ npm test ./tests/newuser.test.js

# Para rodar os testes, da página da carteira, use o comando
$ npm test ./tests/wallet.test.js

```

## 📝 Licença

Este projeto foi feito com muita dedicação e carinho por Marco Mecenas  [Entre em contato!](https://www.linkedin.com/in/marcomecenasfilho/)
<p align="justify">Foi utilizado o projeto TrybeTunes como inspiração.  Sendo ele desenvolvido durante minha formação de desenvolvedor web FullStack na <a href="https://www.betrybe.com/" target="_blank">Trybe</a>.</p>
