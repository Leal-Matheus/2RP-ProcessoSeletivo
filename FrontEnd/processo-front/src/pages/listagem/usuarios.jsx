import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import HeaderC from '../../components/header/header';
import api from '../../services/api';
import '../../assets/css/usuarios.css'
import lixeira from '../../assets/img/lixeira.png'
import atualizar from '../../assets/img/atualizar.png'
import Footer from '../../components/footer/footer';
import { Modall } from '../../components/modal/modal';
import { useHistory } from "react-router-dom";
import { parseJwt } from '../../services/auth';


export default function ListarUsuarios() {
    
    //States
    const history = useHistory();
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [nome, setNome] = useState('');
    const [idUsuarioModal, setIdUsuarioModal] = useState(0)
    const OpenModal = () => {
        setShowModal(prev => !prev);
    }
    
    function ExcluirUsuario(idUsuario) {
        axios.delete('http://localhost:5000/api/Usuarios/Excluir/id/' + idUsuario, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        }
        )
        
        .then((resposta) => {
            if (resposta.status === 204) {
                    console.log(idUsuario)
                    console.log('usuario deletado!');
                    BuscarUsuarios();
                }
            })
    
            .catch(erro => console.log(erro))
    }
    function BuscarUsuarios() {
        axios.get('http://localhost:5000/api/Usuarios', {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {

                    setListaUsuarios(resposta.data)
                    console.log(resposta)

                }

            })

            .catch(erro => console.log(erro))

    }


    useEffect(() => {
        BuscarUsuarios();
    }, [])

    return (
        <div>
            <Modall usuarios={listaUsuarios.find(usuarios => usuarios.idUsuario == idUsuarioModal)} showModal={showModal} setShowModal={setShowModal} />
            <div className='headerP'>

                <HeaderC />
            </div>
            <main>
                <div className='container'>
                    <h1>Usuários</h1>
                    <div className='containerUsuarios'>
                        <div className='boxUsuarios'>
                            {
                                listaUsuarios.map((usuarios) => {
                                    return (
                                        <div className='cardUsuario'>
                                            <div className='infosUsuarios'>
                                                <span className='infoUsuario'>{usuarios.nome}</span>
                                                <span className='infoUsuario'>{usuarios.email}</span>
                                                <span className='infoUsuario'>{usuarios.idTipoUsuarioNavigation.tituloTipoUsuario}</span>
                                                <span className='infoUsuario' style={{
                                                    'color': usuarios.userStatus === true ?
                                                        '#12FE0D' : '#E40A0A'
                                                }}>{
                                                        usuarios.userStatus === true ?
                                                            'Ativo' : 'Inativo'

                                                    }</span>
                                            </div>
                                            <div className='boxInteracoes'>
                                                {/* <a onClick={OpenModal} onClickCapture = {() =>setIdUsuarioModal(usuarios.idUsuario)}><img className='iconCard' src={atualizar} alt='icone atualizar' /></a> */}
                                                <a onClick={() => history.push(`/atualizarUsuario/${usuarios.idUsuario}`)}><img className='iconCard' src={atualizar} alt='icone atualizar' /></a>
                                                {
                                                    parseJwt().role === '3' ?
                                                    <button className='buttonInt' onClick={() => ExcluirUsuario(usuarios.idUsuario)} > <img className='iconCard' src={lixeira} alt='icone deletar' /> </button> : <a></a>
                                                }
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

        </div>
    );
}