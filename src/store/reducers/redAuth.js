import * as actionTypes from '../actions/actTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    loggingIn: false
};

const authStart = (state, action ) => {
    return updateObject(state, { 
        error: null, 
        loading: true 
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
}

const onLoginPage = (state, action) => {
    return updateObject(state, {
        loggingIn: true
    })
}

const leavingLoginPage = (state, action) => {
    return updateObject(state, {
        loggingIn: false
    })
}

const userLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    })
}

const redAuth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action); 
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action); 
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.ON_LOGIN_PAGE: return onLoginPage(state, action);
        case actionTypes.LEAVING_LOGIN_PAGE: return leavingLoginPage(state, action);
        case actionTypes.AUTH_LOGOUT: return userLogout(state, action);
        default: return state;
    }
}

export default redAuth;