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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expitartionTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expitartionTime * 1000);
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSucess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFalil(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {

    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationdate = new Date(localStorage.getItem('expirationDate'));
            if(expirationdate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSucess(token, userId));
                dispatch(checkAuthTimeout((expirationdate.getTime() - new Date().getTime())/1000));
            }
            
        }
    }
}

