import React, { useState } from 'react'; 
import axios from 'axios';

import Navbar from '../components/Navbar';
import Search from '../components/Search';

import localStorage from '../utils/localStorage';
import config from '../config';

import '../assets/styles/pages/EditProfile.css';

const EditProfile = props => {
    const [form, setform] = useState({
        uid: localStorage.getUser()._id
    }); 

    const handleClick = event => {
        setform({
            ...form,
            [event.target.name]: event.target.value.trim()
        })
    }

    const checkPassword = () => {
        if(form.password && form.repeatPsw) {
            if(form.password === form.repeatPsw) return true
            return false; 
        } else if (!form.password && !form.repeatPsw) return true
        return false;
    }

    const goBack = event => {
        event.preventDefault(); 
        props.history.push('/profile');
    }

    const saveChanges = async event => {
        event.preventDefault(); 

        if(Object.keys(form).length === 0) return goBack(event);
        if(checkPassword() === false) alert('Incorrect passwords');
        if(form.username) {
            setform({
                ...form, 
                username: form.username.toLowerCase().trim(), 
            })
        }
        const config_ = {
            headers: { Authorization: `Bearer ${localStorage.getJwt()}` }
        }; 
        const URL = `${config.host_URL}/api/users`; 
        
        axios.put(URL, form, config_) 
            .then(() => {
                localStorage.reloadUserdata();
                localStorage.reloadSearchUser();
                alert('User data changed'); 
                goBack(event);
            })
            .catch(() => {
                alert('Error'); 
                goBack(event);
            })
    }

    return (
        <div className="homepage__content">
            <div className="left">
                <Navbar />
            </div>
            <div className="middle">
                <div className="edit_profile_content">
                    <div className="tittle_wrapper">
                        <h2>Edit profile: </h2>
                    </div>
                    <form className="edit_profile__form">
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "firstName"
                            placeholder = "First name: "
                        />
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "lastName"
                            placeholder = "Last name: "
                        />
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "username"
                            placeholder = "Username: "
                        />
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "password"
                            type = "password"
                            placeholder = "New password: "
                        />
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "repeatPsw"
                            type = "password"
                            placeholder = "Repeat new password: "
                        />
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "profileURL"
                            placeholder = "Profile picture URL: "
                        />
                        <input
                            className = "form__input"
                            onChange = {handleClick}
                            name = "portraitURL"
                            placeholder = "Portrait picture URL: "
                        />
                        <textarea
                            className = "form__textarea"
                            onChange = {handleClick} 
                            name = "bio"
                            placeholder = "Biography: "
                        />
                        <div className="form__buttons">
                            <button className="save_button" onClick={saveChanges}>
                                Save
                            </button>
                            <button className="cancel_button" onClick={goBack}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right">
                <Search>
                    {props}
                </Search>
            </div>
    </div>
    )
}

export default EditProfile;