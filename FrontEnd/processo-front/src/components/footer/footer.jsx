import React, { Component } from "react"
import '../../assets/css/footer.css'
import linkedin from '../../assets/img/linkedinC 1.png'
import github from '../../assets/img/githubC 1.png'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="containerFooter">
                    <p className="pFooter">
                        © 2022 2RP
                    </p>
                    <p className="pFooter">
                        Todos os direitos Reservados
                    </p>
                    <div className="iconsLink">
                        <a href="https://github.com/Leal-Matheus"><img src={github} alt='icone github'/></a>
                        <a href="https://www.linkedin.com/in/matheus-leal-palmuti-b94009240/"><img src={linkedin} alt='icone linkedin'/></a>
                    </div>
                </div>
            </footer>
        )
    }
}