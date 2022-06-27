import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CREATE_PRODUCT_VARIANT,
    createProductVariantSuccess,
    createProductVariantFail
} from '../action/createProductVariantAction'

import createProductVariantApi from '../api/createProductVariantApi'

export function* createProductVariantSaga(action) {
    try {
        const response = yield call(() => createProductVariantApi(action.params))
        yield put(createProductVariantSuccess(response, action))
    } catch (e) {
        yield put(createProductVariantFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CREATE_PRODUCT_VARIANT, createProductVariantSaga);
}