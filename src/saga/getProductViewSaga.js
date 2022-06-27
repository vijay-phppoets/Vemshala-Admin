import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PRODUCT_VIEW,
    getProductViewSuccess,
    getProductViewFail
} from '../action/getProductViewAction'

import getProductViewApi from '../api/getProductViewApi'

export function* getProductViewSaga(action) {
    try {
        const response = yield call(() => getProductViewApi(action.params))
        yield put(getProductViewSuccess(response, action))
    } catch (e) {
        yield put(getProductViewFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PRODUCT_VIEW, getProductViewSaga);
}