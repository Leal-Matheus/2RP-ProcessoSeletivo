import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";
import HeaderC from "../../components/header/header";
import bannerAtt from '../../assets/img/bannerAtt.png'
import '../../assets/css/atualizarUsuario.css';
import { parseJwt } from '../../services/auth';

export default function Perfil() {

    const history = useHistory();
    const idUsuario = useParams();
    const [usuarios, setUsuario] = useState([]);
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [userStatus, setUserStatus] = useState(1)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    function BuscarUsuario() {
        axios.get('http://localhost:5000/api/Usuarios', {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {

                    resposta.data.map((usuarios) => {
                        if (usuarios.idUsuario == idUsuario.idUsuario) {
                            setUsuario(usuarios)
                        }
                    })

                }

            })

            .catch(erro => console.log(erro))

    }



    function ExcluirUsuario(idUsuario) {
        console.log(idUsuario)
        axios.delete('http://localhost:5000/api/Usuarios/Excluir/id/' + idUsuario, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log('usuario deletado!')
                    history.push(`/usuarios`)
                }
            })

            .catch(erro => console.log(erro))
    }

    function alterarStatus(event) {
        event.preventDefault();
        axios.patch('http://localhost:5000/api/Usuarios/AlterarStatus/id/' + idUsuario, {
            userStatus: userStatus
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    BuscarUsuario();
                    console.log('Status alterado!')
                }
            })
            .catch(erro => console.log(erro))

    }
    function AtualizarUsuario(event) {
        event.preventDefault();

        axios.put("http://localhost:5000/api/Usuarios/Alterar/id/" + idUsuario, {

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
            .then(function (response) {
                console.log(response);
                console.log('usuario atualizado!')
                alert("Usuario atualizado com sucesso!")
            })
            .catch(erro => console.log(erro))
    }

    useEffect(BuscarUsuario, [])

    return (
        <div>
            <HeaderC />
            <main>
                <div className="container">
                    <h1>Atualizar usuário</h1>
                    <div className="containerOrganizacao">
                        <div className="containerCadastroLeft">
                            <form className="formCadastro" onSubmit={AtualizarUsuario}>
                                <div className="inputLabelAtualizar">
                                    <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                                    <label for="nome">Nome</label>
                                </div>

                                <div className="inputLabelAtualizar">
                                    <input type="email" name="email" placeholder="E-Mail" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                    <label for="email">E-Mail</label>
                                </div>

                                <div className="inputLabelAtualizar">
                                    <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
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
                                <button className='button' type="submit">Atualizar</button>
                            </form>
                            <div className="boxAlternativeButtons">
                                {parseJwt().role == 3 && <button className='buttonDeletar' type="submit"  onClick={() => {
                                ExcluirUsuario(usuarios.idUsuario) 
                                history.push(`/usuarios`)}}
                                >Excluir Usuário</button>}
                                <button className='buttonDesativar' type="submit" onClick={(alterarStatus)}>Desativar Usuario</button>
                            </div>
                        </div>
                        <div className="containerCadastroRight">
                            <div className="boxBannerCadastro">
                                <img className="bannerCadastro" src={bannerAtt} alt='banner cadastro' />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}