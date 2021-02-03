import { createStore, compose } from 'redux';

const initialState = {
    jwt: "",
    user: {},
    searchUser: {},
    token: {}, 
    posts: [
        {
            _id: 1, 
            likes: [1, 2, 4], 
            uid: 1, 
            content: 'Hola mundo', 
            date: 0, 
        }, 
        {
            _id: 2, 
            likes: [1, 2, 4], 
            uid: 1, 
            content: 'Segundo mensaje', 
            date: 0, 
        }, 
        {
            _id: 3, 
            likes: [1, 2, 4], 
            uid: 1, 
            content: 'Tercer mensaje', 
            date: 0, 
        }
    ], 
    openPost: {}, 
    postComments: [],
}

// Función reductora: función encargada de hacer los cambios en nuestra aplicación 
const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_REQUEST': 
            return {
                ...state, 
                user: action.payload
            };
        case 'LOGOUT_REQUEST': 
            return {
                ...state, 
                user: {}, 
                jwt: "",
            }
        case "GET_JWT":
            return {
                ...state, 
                jwt: action.payload
            } 
        case 'REGISTER_REQUEST': 
            return {
                ...state, 
                user: action.payload
            }
        case 'CHANGE_SEARCH_USER': 
            return {
                ...state, 
                searchUser: action.payload
            }
        default: 
            return state;
    }
}

// Esto es para el React dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default createStore(reducer, composeEnhancers())