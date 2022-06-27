import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DEL_REL_PROD,
    delRelProdSuccess,
    delRelProdFail
} from '../action/delRelProdAction'

import delRelProdApi from '../api/delRelProdApi'

export function* delRelProdSaga(action) {
    try {
        const response = yield call(() => delRelProdApi(action.params))
        yield put(delRelProdSuccess(response, action))
    } catch (e) {
        yield put(delRelProdFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DEL_REL_PROD, delRelProdSaga);
}