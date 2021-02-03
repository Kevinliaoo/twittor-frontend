const axios = require('axios'); 
const config = require('../config');

const saveJwt = jwt => {
    localStorage.setItem('jwt', jwt);
}

const getJwt = () => {
    return localStorage.getItem('jwt');
}

const deleteJwt = () => {
    localStorage.removeItem('jwt');
}

const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user)); 
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const deleteUser = () => {
    localStorage.removeItem('user');
}

const reloadUserdata = () => {
    const URL = `${config.host_URL}/api/users/id/${getUser()._id}`;
    axios.get(URL) 
        .then(res => saveUser(res.data.body))
        .catch(e => alert('Error reloading'))
}

const saveSearchUser = user => {
    localStorage.setItem('searchUser', JSON.stringify(user)); 
}

const getSearchUser = () => {
    return JSON.parse(localStorage.getItem('searchUser'));
}

const reloadSearchUser = () => {
    const URL = `${config.host_URL}/api/users/id/${getSearchUser()._id}`; 
    axios.get(URL) 
        .then(res => saveSearchUser(res.data.body))
        .catch(() => alert('Error reloading'))
}


module.exports = {
    saveJwt, 
    getJwt, 
    deleteJwt, 
    saveUser, 
    getUser,
    deleteUser,
    reloadUserdata,
    saveSearchUser, 
    getSearchUser,
    reloadSearchUser, 
}