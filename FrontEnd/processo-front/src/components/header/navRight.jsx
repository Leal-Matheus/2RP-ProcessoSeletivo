import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo2rp.png';
import { Link } from 'react-router-dom';
import { parseJwt } from '../../services/auth';
import { useHistory } from "react-router-dom";


const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 980px) {
    flex-flow: column nowrap;
    background-color: #022041;
    border-left: 1px solid #000000;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100%;
    width: 300px;
    padding-top: 3.5rem;
    z-index: 99;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;




const RightNav = ({ open }) => {
  let history = useHistory();

  function logOut() {
    localStorage.removeItem("usuario-token");
    
    history.push("/");
  }
  return (
    <Ul open={open}>
        <div className="container">
          <div className="navHeader">
            <div className="boxLoginHeader">
              {
                parseJwt().role == '3' || parseJwt().role == '2' ?
                  <Link to="/usuarios" className="linkHeader">Usuarios</Link> : <a></a>
              }
              {
                parseJwt().role == '3' || parseJwt().role == '2' ?
                  <Link to="/cadastrar" className="linkHeader">Cadastrar</Link> : <a></a>
              }
              <Link to="/meuPerfil" className="linkHeader">Perfil</Link>
              <Link className="linkHeader" onClick={logOut}>logout</Link>
            </div>
          </div>
        </div>
    </Ul>
  )
}

export default RightNav