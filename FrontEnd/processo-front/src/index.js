import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import './index.css';
import Perfil from './pages/atualizar/AtualizarUsuario';
import Cadastro from './pages/cadastrar/cadastrarUsuario';
import ListarUsuarios from './pages/listagem/usuarios';
import Login from './pages/login/login.jsx';
import MeuPerfil from './pages/meuPerfil/meuPerfil';
import reportWebVitals from './reportWebVitals';
import { parseJwt, usuarioAutenticado  } from './services/auth';

const Logado = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() ?  (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === "2" || parseJwt().role === "3" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);


const routing = (
  <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login}/>
          <PermissaoAdm path="/usuarios" component={ListarUsuarios}/>
          <PermissaoAdm path="/cadastrar" component={Cadastro}/>
          <Logado path="/atualizarUsuario/:idUsuario" component={Perfil}/>
          <Logado path="/meuPerfil" component={MeuPerfil}/>
        </Switch>
      </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
