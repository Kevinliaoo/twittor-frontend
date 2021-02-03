import React from 'react'; 
import { Link } from 'react-router-dom';

import config from '../config';
import localStorage from '../utils/localStorage';

import '../assets/styles/components/Navbar.css';

const Navbar = props => {
    const logout = () => {
        localStorage.deleteJwt(); 
        localStorage.deleteUser(); 
    }
    const setSearchUser = () => {
        const currentUser = localStorage.getUser();
        localStorage.saveSearchUser(currentUser);
    }
    return (
        <div className="navbar">
            <Link className="navbar__section" to="/">
                <img src={config.images_URLs.home} alt="Home logo" />
                <p>Home</p>
            </Link>
            <Link className="navbar__section" onClick={setSearchUser} to="/profile">
                <img src={config.images_URLs.profile} alt="Profile logo" />
                <p>Profile</p>
            </Link>
            <Link className="navbar__section" to="/login" onClick={logout}>
                <img src={config.images_URLs.logout} alt="logout" />
                <p>Logout</p>
            </Link>
        </div>
    )
}

export default Navbar