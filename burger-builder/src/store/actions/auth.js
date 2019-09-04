import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFalil = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email, password, isSignUp) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBq3ZG4V8608TlodNh1IWUypkss4p_90nU';
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBq3ZG4V8608TlodNh1IWUypkss4p_90nU';
        }
        axios.post(url, authData)
            .then( response => {
                console.log(response);
                dispatch(authSucess(response.data.idToken, response.data.localId))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFalil(error))
            })
    }
}

