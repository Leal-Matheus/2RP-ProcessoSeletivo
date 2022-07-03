import { useEffect, useState } from "react"
import axios from "axios";
import "../../assets/css/cadastrarUsuario.css"
import Footer from "../../components/footer/footer";
import HeaderC from "../../components/header/header";
import { useHistory } from 'react-router-dom';
import banner from '../../assets/img/banneCadastro.png'


export default function Cadastro() {

    const [idUsuario] = useState(0)
    const [idTipoUsuario, setIdTipoUsuario] = useState(1)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [userStatus] = useState(1)
    const history = useHistory();




    function CadastrarUsuario(event) {
        event.preventDefault();

        axios.post("http://localhost:5000/api/Usuarios", {

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

                    history.push('/usuarios')
                    console.log("usuário cadastrado!")
                }
            })
            .catch(erro => console.log(erro))
    }


    return (
        <div className='g3_backgroundCadastro'>

            <HeaderC />
            <main>
                <div className="container">
                    <h1>Cadastrar usuário</h1>
                    <div className="containerOrganizacao">
                        <div className="containerCadastroLeft">
                            <form className="formCadastro" onSubmit={CadastrarUsuario}>


                                <div className="inputLabelCadastro">
                                    <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                                    <label for="nome">Nome</label>
                                </div>

                                <div className="inputLabelCadastro">
                                    <input type="email" name="email" placeholder="E-Mail" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                    <label for="email">E-Mail</label>
                                </div>

                                <div className="inputLabelCadastro">
                                    <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                                    <label for="senha">Senha</label>
                                </div>
                                <select
                                    name="idTipoUsuario"
                                    value={idTipoUsuario}
                                    className="inputCadastroSelect"
                                    onChange={(event) => setIdTipoUsuario(event.target.value)}

                                >

                                    <option value="#">Tipo de Usuario</option>
                                    <option value={1}>Geral</option>
                                    <option value={2}>Administrador</option>
                                    <option value={3}>Root</option>
                                </select>

                                <button className='button' type="submit">Cadastrar</button>
                            </form>
                        </div>
                        <div className="containerCadastroRight">
                            <div className="boxBannerCadastro">
                                <img className="bannerCadastro" src={banner} alt='banner cadastro' />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>

    );
}