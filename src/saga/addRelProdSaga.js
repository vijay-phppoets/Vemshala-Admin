import { call, put, takeLatest } from 'redux-saga/effects'

import {
    ADD_REL_PROD,
    addRelProdSuccess,
    addRelProdFail
} from '../action/addRelProdAction'

import addRelProdApi from '../api/addRelProdApi'

export function* addRelProdSaga(action) {
    try {
        const response = yield call(() => addRelProdApi(action.params))
        yield put(addRelProdSuccess(response, action))
    } catch (e) {
        yield put(addRelProdFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(ADD_REL_PROD, addRelProdSaga);
}