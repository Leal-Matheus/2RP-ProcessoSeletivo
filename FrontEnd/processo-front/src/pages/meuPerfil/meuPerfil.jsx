import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";
import HeaderC from "../../components/header/header";
import bannerAtt from '../../assets/img/bannerAtt.png'
import '../../assets/css/atualizarUsuario.css';
import { parseJwt } from '../../services/auth';
import bannerPerfil from '../../assets/img/bannerPerfil.png'
import '../../assets/css/perfil.css'

export default function MeuPerfil() {

    const history = useHistory();
    const idUsuario = useParams();
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [userStatus, setUserStatus] = useState(1)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    function BuscarUsuario() {
        axios.get('http://localhost:5000/api/Usuarios' + parseJwt().jti, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {

                    resposta.data.map((usuarios) => {
                        if (usuarios.idUsuario == idUsuario.idUsuario) {
                            setListaUsuarios(usuarios)
                        }
                    })

                }

            })

            .catch(erro => console.log(erro))

    }

    function AtualizarUsuario(event) {
        event.preventDefault();

        axios.put("http://localhost:5000/api/Usuarios/Alterar/id/" + parseJwt().jti, {

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
                    <h1>Meu Perfil</h1>
                    <div className="containerOrganizacao">
                        <div className="containerCadastroLeft">
                            {
                                listaUsuarios.map((usuarios) => {
                                    return (
                                        <form className="formCadastro" onSubmit={AtualizarUsuario}>
                                            <div className="inputLabelAtualizar">
                                                <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                                                <label for="nome">{usuarios.nome}</label>
                                            </div>

                                            <div className="inputLabelAtualizar">
                                                <input type="email" name="email" placeholder="E-Mail" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                                <label for="email">{usuarios.email}</label>
                                            </div>

                                            <div className="inputLabelAtualizar">
                                                <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                                                <label for="senha">Senha</label>
                                            </div>
                                            <button className='button' type="submit">Atualizar</button>
                                        </form>

                                    )
                                })
                            }

                        </div>
                        <div className="containerCadastroRight">
                            <div className="boxBannerCadastro">
                                <img className="bannerPerfil" src={bannerPerfil} alt='banner cadastro' />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}