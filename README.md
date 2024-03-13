- Rotas usando react-router-dom
- Estilo com bootstrap
- preventDefault é pro browser não fazer reload quando vou desencadear um evento

- Para rodar o projeto, precisa rodar o frontend e backend juntos e se tiver algum problema com o banco, acessar o mongo atlas, ir em network access e habilitar ip para 'allow access from anywhere'

- Quando o usuário loga, é feita uma autenticação armazenando o token no localStorage do navegador. 
- localStorage: é uma área de armazenamento local do navegador, que permite que os dados sejam armazenados em pares chave-valor 
- no contexto de autenticação, o token JWT é comumente armazenado em localStorage para persistir a sessão do usuário entre as solicitações, mantendo o usuário autenticado mesmo ao recarregar a página ou abrir/fechar o navegador
- JWT (JSON Web Token) é um formato compacto e seguro para transmitir informações entre partes, geralmente usado para autenticação e autorização em aplicações web. Nesse contexto, ele está sendo usado para autorizar cada solicitações que o usuário vai fazer, indicando que ele está logado e pode realizar essas ações. Dessa forma, atua como uma forma segura de transmitir informações de autenticação entre cliente e servidor. Elimina a necessidade de armazenar informações de login em cada solicitação e fornece uma maneira eficiente e segura de verificar a identidade do usuário em cada interação com o servidor 

- Apliquei no context provider a tradução da página. Algumas validações ainda estão em inglês mas é porque elas vem de um array de mensagens de erro do formulário do bootstrap

PARA PESQUISAR 
- Pra que server react-router-dom? 
- pra que serve link, useNavigate, as coisas feitas na pasta index.js?
- BrowserRouter, Route, Routes (da pasta ROUTES.JS)
- o que faz o fetch()? 
