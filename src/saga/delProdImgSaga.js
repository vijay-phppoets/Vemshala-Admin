import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DEL_PROD_IMG,
    delProdImgSuccess,
    delProdImgFail
} from '../action/delProdImgAction'

import delProdImgApi from '../api/delProdImgApi'

export function* delProdImgSaga(action) {
    try {
        const response = yield call(() => delProdImgApi(action.params))
        yield put(delProdImgSuccess(response, action))
    } catch (e) {
        yield put(delProdImgFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DEL_PROD_IMG, delProdImgSaga);
}