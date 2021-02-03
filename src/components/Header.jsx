import React from 'react'; 

import config from '../config';
import localStorage from '../utils/localStorage';

import '../assets/styles/components/Header.css';

const Header = props => {

    const handleClick = () => {
        // Despliegue del menu en versión móvil
        if(localStorage.getJwt()) {
            if(window.innerWidth < 450) {
                const menu = document.getElementsByClassName('left')[0]; 
                const main = document.getElementsByClassName('middle')[0];
                const search = document.getElementsByClassName('right')[0]; 
                menu.classList.toggle('active');
                main.classList.toggle('hidden'); 
                search.classList.toggle('active');
            } else {
                // Redirect to home page 
            }
        }
    }

    return (
        <section className="header">
            <div onClick={handleClick}>
                <img className="logo" src={config.LOGO_URL} alt="Twittor logo" />
            </div>
        </section>
    )
}

export default Header;