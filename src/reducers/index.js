const reducer = (state, action) => {
    console.log('Entrando al reducer');
    switch(action.type) {
        case 'LOGIN_REQUEST': 
            return {
                ...state,
                user: action.payload.user,
            };
        case 'GET_JWT': 
            return {
                ...state, 
                jwt: action.payload.jwt,
            }
        default: 
            return state; 
    }
}
