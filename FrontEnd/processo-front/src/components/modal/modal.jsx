import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { parseJwt } from '../../services/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/css/modal.css'

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
  width: 600px;
  height: 500px;
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

    let history = useHistory();

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
                                    <div className='box_foto_nome_modal'>

                                        <span className='nomeModal'>{usuarios.nome}</span>




                                    </div>



                                    <div className='box_informações_modal'>
                                        <div className='box_span'>
                                            <span className='box_span_key'>E-Mail: </span>
                                            <span className='span_value_modal'>{usuarios.email}</span>
                                        </div>

                                        <div className='box_span'>
                                            <span className='box_span_key_modal'>Tipo de Usuario:</span>
                                            <span className='span_value_modal'>{usuarios.idTipoUsuarioNavigation.tituloTipoUsuario}</span>
                                        </div>


                                        <div className='box_span'>
                                            <span className='box_span_key'>Status: </span>
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

                                        <button onClick={() => history.push(`/atualizarUsuario/${usuarios.idUsuario}`)}> Atualizar Dados</button>
                                    </div>
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