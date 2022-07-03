import React from 'react';
import styled from 'styled-components';
import Burger from './burguer';
import logo from '../../assets/img/logo2rp.png'
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 10vh;
    align-items: center;

`

const Navbar = () => {
    return (
        <Nav>
            <div className='logoHeader'>
                <Link> <img className='logoHeader' src={logo} alt="Logo do Senai" /></Link>
            </div>
            <Burger />
        </Nav>
    )
}

export default Navbar