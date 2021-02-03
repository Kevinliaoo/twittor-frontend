import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

import config from '../config';
import localStorage from '../utils/localStorage';

import '../assets/styles/pages/Login.css';

const Login = props => {
    localStorage.deleteJwt(); 
    localStorage.deleteUser();

    const [form, setValues] = useState({
        username: '', 
        password: '', 
    })
    const handleInput = event => {
        setValues({
            ...form, 
            [event.target.name]: event.target.value.trim(), 
        })
    }
    const handleSubmit = event => {
        event.preventDefault(); 
        const URL = `${config.host_URL}/api/auth/login`;
        axios.post(URL, form)
            .then(response => {
                localStorage.saveJwt(response.data.body.jwt);
                localStorage.saveUser(response.data.body.user); 
                props.history.push('/');
            })
            .catch(e => {
                alert('Incorrect data');
            })
    }
    useEffect(() => {
        const loginButton = document.getElementById('loginform__submit');
        if (form.username.length === 0 && form.password.length === 0) {
            loginButton.disabled = true; 
            loginButton.style.backgroundColor = config.colors.disabledButton; 
        } else if (form.username.length > 0 && form.password.length > 0) {
            loginButton.disabled = false; 
            loginButton.style.backgroundColor = config.colors.enabledButton;    
        }

    }, [form])
    return(
        <>
            <section className="formContainer">
                <h2 className="title">Log in to Twittor</h2>
                <form className="loginform" onSubmit={handleSubmit}>
                    <input 
                        className = 'loginform__input'
                        type = "text"
                        name = "username" 
                        placeholder = "Username: "
                        onChange = {handleInput}
                    />
                    <input 
                        className = 'loginform__input' 
                        type = "password" 
                        name = "password" 
                        placeholder = "Password: "
                        onChange = {handleInput}
                    />
                    <button className="loginform__submit" id="loginform__submit">
                        Login
                    </button>
                    <Link className="loginform__signup" to="/register">
                        Sign up for Twittor
                    </Link>
                </form>
            </section>
        </>
    )
}

export default Login