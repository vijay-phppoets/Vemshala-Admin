import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CREATE_PRODUCT,
    createProductSuccess,
    createProductFail
} from '../action/createProductAction'

import createProductApi from '../api/createProductApi'

export function* createProductSaga(action) {
    try {
        const response = yield call(() => createProductApi(action.params))
        yield put(createProductSuccess(response, action))
    } catch (e) {
        yield put(createProductFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CREATE_PRODUCT, createProductSaga);
}