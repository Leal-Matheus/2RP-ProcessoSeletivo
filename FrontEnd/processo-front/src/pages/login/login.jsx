import React, { useState } from 'react'
import axios from 'axios'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import bgLogin from '../../assets/img/bgLogin.png'
import Logo from '../../assets/img/logo2rp.png'
import '../../assets/css/login.css'


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    const FazerLogin = (event) => {
        event.preventDefault();

        api.post('http://localhost:5000/api/Login', {
            email: email,
            senha: senha
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-token', resposta.data.token)
                    history.push('/usuarios')
                }
            })
            .catch(resposta => {
                console.log(resposta)
            })
    }

    return (
        <div className='bgLogin'>
            <div className='container containerLogin'>
                <div className="loginLeft">
                    <div className="containerLeft">
                        <img src={Logo} alt="Logo do senai" className="logo" />
                        <p className="G1_p_senai">© 2022 2RP</p>
                    </div>
                </div>
                <div className="loginRight">
                    <div className="formText">
                        <div className="loginText">

                            <h1>Login</h1>
                            <p>Acesse sua conta e navegue pelo nosso sistema!</p>
                        </div>
                        <form className="formLogin" onSubmit={(event) => FazerLogin(event)}>
                            <div className="inputLabel">
                                <input type="email" name="email" placeholder="Digite seu email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                <label for="email">E-Mail</label>
                            </div>

                            <div className="inputLabel">
                                <input type="password" name="senha" placeholder="Digite sua senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                                <label for="senha">Senha</label>
                            </div>
                            <div className="buttonLogin">
                                <button className='button' type="submit">Entrar</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}