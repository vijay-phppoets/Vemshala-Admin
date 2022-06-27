import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DEL_PROD_VAR,
    delProdVarSuccess,
    delProdVarFail
} from '../action/delProdVarAction'

import delProdVarApi from '../api/delProdVarApi'

export function* delProdVarSaga(action) {
    try {
        const response = yield call(() => delProdVarApi(action.params))
        yield put(delProdVarSuccess(response, action))
    } catch (e) {
        yield put(delProdVarFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DEL_PROD_VAR, delProdVarSaga);
}