import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo-arch.svg';
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 1200px) {
    flex-flow: column nowrap;
    background-color: #e3e3e3;
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
// function logOut() {
//     localStorage.removeItem("usuario-login");

//     history.push("/");
// }

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>

      <header>
        <div className="container">
          <div className="navHeader">
            <div className="boxInfoHeader">
              <img className="logoHeader" src={logo} alt="Logo do Header" />
            </div>
            <div className="boxLoginHeader">
              <Link to="/usuarios" className="linkHeader">Usuarios</Link>
              {parseJwt().role == 3 || parseJwt().role == 1 && <Link to="/cadastrar" className="linkHeader">Cadastrar</Link>}
              <Link to="/usuarios" className="linkHeader">Perfil</Link>
              <Link className="linkHeader" onClick={logOut}>logout</Link>
            </div>
          </div>
        </div>
      </header>


    </Ul>
  )
}

export default RightNav