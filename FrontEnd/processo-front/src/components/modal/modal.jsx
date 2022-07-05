import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { parseJwt } from '../../services/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/css/modal.css'
import { useParams } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
`;

const ModalWrapper = styled.div`
  width: 60vw;
  height: 65vh;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  border: #0D2538 1px solid;
`;



const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  height: 500px;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #255F9A;
    border-radius: 15px;
    color: #f9f9f9;
    border: none;
    margin-top: 2rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modall = ({ showModal, setShowModal, usuarios }) => {
    const modalRef = useRef();

    const history = useHistory();
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [userStatus, setUserStatus] = useState(0)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [usuario, setUsuario] = useState([])

    const refresh = ()=>{
        window.location.reload();
     }

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );

    function AtualizarUsuario(event) {
        event.preventDefault();

        axios.put("http://localhost:5000/api/Usuarios/Alterar/id/" + usuarios.idUsuario, {

            nome: nome,
            idTipoUsuario: idTipoUsuario,
            email: email,
            senha: senha,
            userStatus: userStatus
        }, {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }



        })
        .then(response => {
            if (response.status === 201) {

                setEmail('')
                setNome('')
                setSenha('')
                refresh()
                console.log("usuário atualizado!")

            }
        })
        .catch
            .catch(erro => console.log(erro))
    }
    function checkAtivo() {
        setUserStatus(1)
    }


    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );



    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                            <ModalContent>
                                <div className='box_modal'>

                                    <div className='box_informações_modal'>
                                        <span className='nomeModal'>{usuarios.nome}</span>
                                        <div className='box_span'>
                                            <span className='box_span_key_modal'>E-Mail: </span>
                                            <span className='span_value_modal'>{usuarios.email}</span>
                                        </div>

                                        <div className='box_span'>
                                            <span className='box_span_key_modal'>Tipo de Usuario:</span>
                                            <span className='span_value_modal'>{usuarios.idTipoUsuarioNavigation.tituloTipoUsuario}</span>
                                        </div>


                                        <div className='box_span'>
                                            <span className='box_span_key_modal'>Status: </span>
                                            {<span
                                                className='span_value_modal'

                                                style={{
                                                    'color': usuarios.userStatus === true ?
                                                        '#12FE0D' : '#E40A0A'
                                                }}
                                            >{
                                                    usuarios.userStatus === true ?
                                                        'Ativo' : 'Inativo'

                                                }</span>}
                                        </div>
                                    </div>
                                    <form className="formCadastro" onSubmit={(AtualizarUsuario)}>
                                        <div className="inputLabelAtualizar">
                                            <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                                            <label for="nome">Nome</label>
                                        </div>

                                        <div className="inputLabelAtualizar">
                                            <input type="email" name="email" placeholder="E-Mail" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                            <label for="email">E-Mail</label>
                                        </div>

                                        <div className="inputLabelAtualizar">
                                            <input type="text" name="senha" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                                            <label for="senha">Senha</label>
                                        </div>
                                        <select
                                            name="idTipoUsuario"
                                            value={idTipoUsuario}
                                            className="inputAtualizarSelect"
                                            onChange={(event) => setIdTipoUsuario(event.target.value)}

                                        >

                                            <option value="#">Tipo de Usuario</option>
                                            <option value={1}>Geral</option>
                                            <option value={2}>Administrador</option>
                                            <option value={3}>Root</option>
                                        </select>

                                        <input type="checkbox"
                                            id="switch"
                                            name="validar"
                                            value={userStatus}
                                            onClick={checkAtivo}
                                        /><label className='label_switch' htmlFor="switch">Toggle</label>
                                        <button className='button' type="submit">Atualizar</button>
                                    </form>

                                </div>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowModal(prev => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};