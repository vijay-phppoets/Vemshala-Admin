import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_PRODUCT,
    updateProductSuccess,
    updateProductFail
} from '../action/updateProductAction'

import updateProductApi from '../api/updateProductApi'

export function* updateProductSaga(action) {
    try {
        const response = yield call(() => updateProductApi(action.params))
        yield put(updateProductSuccess(response, action))
    } catch (e) {
        yield put(updateProductFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
}