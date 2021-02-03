import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';

import config from '../config';

import '../assets/styles/pages/Login.css';

const Register = props => {
    const [form, setValues] = useState({
        firstName: '', 
        lastName: '', 
        username: '', 
        password: '', 
        repeatPsw: '',
    })

    const handleInput = event => {
        setValues({
            ...form, 
            [event.target.name]: event.target.value.trim(), 
        })
    }
    const goBack = () => props.history.push('/login');
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${config.host_URL}/api/users`, form)
            .then(response => {
                props.history.push('/login');
                alert('User created succesfully')
            })
            .catch(e => {
                // e.response.data.body
                console.log(e.response.data.body)
                alert('Error')
            })
    }
    // Checks if all fields of the form is completed
    const checkAllFieldsCompleted = () => {
        const hasValue = Object.values(form).map(value => value.length > 0)
        let res = 0; 
        hasValue.map(val => val===true ? res++ : '');
        return res === 5;
    }
    useEffect(() => {
        const registerButton = document.getElementById('registerbtn'); 
        if(checkAllFieldsCompleted()) {
            registerButton.disabled = false; 
            registerButton.style.backgroundColor = config.colors.enabledButton; 
        } else {
            registerButton.disabled = true; 
            registerButton.style.backgroundColor = config.colors.disabledButton;
        }
    }, [form])
    return (
        <>
            <section className="formContainer">
                <h2 className="title">Create your account</h2>
                <form className="loginform" onSubmit={handleSubmit}>
                    <input 
                        className = 'loginform__input'
                        type = "text"
                        name = "firstName" 
                        placeholder = "First name: "
                        onChange = {handleInput}
                    />
                    <input 
                        className = 'loginform__input'
                        type = "text"
                        name = "lastName" 
                        placeholder = "Last name: "
                        onChange = {handleInput}
                    />
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
                    <input 
                        className = 'loginform__input'
                        type = "password"
                        name = "repeatPsw" 
                        placeholder = "Repeat password: "
                        onChange = {handleInput}
                    />
                    <button className="loginform__submit" id="registerbtn">
                        Register
                    </button>
                    <button className="loginform__cancelbtn" onClick={goBack}>
                        Cancel
                    </button>
                </form>
            </section>
        </>
    )
}

const mapDispatchesToProps = dispatch => ({
    registerRequest(payload) {
        dispatch({
            type: 'REGISTER_REQUEST',
            payload
        })
    }, 
}); 

export default connect(null, mapDispatchesToProps)(Register);