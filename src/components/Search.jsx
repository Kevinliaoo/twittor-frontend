import React from 'react'; 
import axios from 'axios';

import config from '../config';
import localStorage from '../utils/localStorage';

import '../assets/styles/components/Search.css';

const Search = props => {

    const searchUser = event => {
        event.preventDefault();
        const input = document.getElementById('searchuser'); 
        const URL = `${config.host_URL}/api/users/${input.value.toLowerCase()}`; 
        axios.get(URL) 
            .then(response => {
                localStorage.saveSearchUser(response.data.body[0]);
                props.children.history.push('/profile');
                window.location.reload();
            })
            .catch(e => alert('404 not found'))
        input.value = '';
    }

    return(
        <div className="searchsection">
            <form className="searchuser">
                <input 
                    className = "searchuser__input"
                    id = "searchuser"
                    placeholder = "Search on Twittor"
                /> 
                <button className="searchuser__searchbtn" onClick={searchUser}>
                    <img className="searchuser__image" src={config.images_URLs.search} alt="Search icon" />
                </button>
            </form>
        </div>
    )
}

export default Search;