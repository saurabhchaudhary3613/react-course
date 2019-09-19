import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {logoutSaga, checkAuthTimeout } from './auth';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}