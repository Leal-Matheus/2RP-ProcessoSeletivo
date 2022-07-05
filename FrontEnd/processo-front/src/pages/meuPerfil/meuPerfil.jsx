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
    const [nome, setNome] = useState('')
    // const [idTipoUsuario, setIdTipoUsuario] = useState(parseJwt().jti.idTipoUsuario)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    function BuscarUsuarioID() {
        axios.get('http://localhost:5000/api/Usuarios/Buscar/id/' + parseJwt().jti, {

            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }

        })

            .then((resposta) => {

                if (resposta.status === 200) {
                    setListaUsuarios(resposta.data)


                }

            })

            .catch(erro => console.log(erro))

    }

    function AtualizarUsuario(event) {
        event.preventDefault();

        axios.put("http://localhost:5000/api/Usuarios/AlterarMeu/id/" + parseJwt().jti, {

            nome: nome,
            email: email,
            senha: senha,
        }, {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-token')
            }



        })
            .then(response => {
                if (response.status === 201) {

                    BuscarUsuarioID();
                    console.log("usuário atualizado!")
                    setEmail('')
                    setNome('')
                    setSenha('')
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(BuscarUsuarioID, [])

    return (
        <div>
            <HeaderC />
            <main>
                <div className="container">
                    <h1>Meu Perfil</h1>
                    <div className="containerOrganizacao">
                        <div className="containerCadastroLeft">
                            {/* {
                                listaUsuarios.map((usuarios) => {
                                    return ( */}
                            <form className="formCadastro" onSubmit={AtualizarUsuario}>
                                <div className="inputLabelAtualizar">
                                    <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                                    <label for="nome">{listaUsuarios.nome}</label>
                                </div>

                                <div className="inputLabelAtualizar">
                                    <input type="email" name="email" placeholder="E-Mail" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                    <label for="email">{listaUsuarios.email}</label>
                                </div>

                                <div className="inputLabelAtualizar">
                                    <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                                    <label for="senha">Senha</label>
                                </div>
                                <button className='button' type="submit">Atualizar</button>
                            </form>

                            {/* )
                                })
                            } */}

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