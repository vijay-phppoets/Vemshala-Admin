import { call, put, takeLatest } from 'redux-saga/effects'

import {
    LOGIN,
    loginSuccess,
    loginFail
} from '../action/loginAction'

import loginApi from '../api/loginApi'

export function* loginSaga(action) {
    try {
        const response = yield call(() => loginApi(action.params))
        yield put(loginSuccess(response, action))
    } catch (e) {
        yield put(loginFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(LOGIN, loginSaga);
}