import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_SP_PROD_DATA,
    saveSpProdDataSuccess,
    saveSpProdDataFail
} from '../action/saveSpProdDataAction'

import saveSpProdDataApi from '../api/saveSpProdDataApi'

export function* saveSpProdDataSaga(action) {
    try {
        const response = yield call(() => saveSpProdDataApi(action.params))
        yield put(saveSpProdDataSuccess(response, action))
    } catch (e) {
        yield put(saveSpProdDataFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_SP_PROD_DATA, saveSpProdDataSaga);
}