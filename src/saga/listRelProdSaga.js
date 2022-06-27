import { call, put, takeLatest } from 'redux-saga/effects'

import {
    LIST_REL_PROD,
    listRelProdSuccess,
    listRelProdFail
} from '../action/listRelProdAction'

import listRelProdApi from '../api/listRelProdApi'

export function* listRelProdSaga(action) {
    try {
        const response = yield call(() => listRelProdApi(action.params))
        yield put(listRelProdSuccess(response, action))
    } catch (e) {
        yield put(listRelProdFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(LIST_REL_PROD, listRelProdSaga);
}