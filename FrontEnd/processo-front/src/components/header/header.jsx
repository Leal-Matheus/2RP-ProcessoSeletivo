import logo from '../../assets/img/logo2rp.png';
import '../../assets/css/header.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../../services/auth';



export default function HeaderC() {
    let history = useHistory();

    function logOut() {
        localStorage.removeItem("usuario-token");

        history.push("/");
    }

    return (
        <header>
            <div className="container">
                <div className="navHeader">
                    <div className="boxInfoHeader">
                        <Link to='/usuarios'><img className="logoHeader" src={logo} alt="Logo do Header" /></Link>
                    </div>
                    <div className="boxLoginHeader">
                        <Link to="/usuarios" className="linkHeader">Usuarios</Link>
                        {
                        parseJwt().role == '3' || parseJwt().role == '2' ?
                        <Link to="/cadastrar" className="linkHeader">Cadastrar</Link> : <button></button>
                        }
                        <Link to="/meuPerfil" className="linkHeader">Perfil</Link>
                        <Link className="linkHeader" onClick={logOut}>logout</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}