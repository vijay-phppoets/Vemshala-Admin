import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PRODUCT_VARIANT_LIST,
    getProductVariantListSuccess,
    getProductVariantListFail
} from '../action/getProductVariantListAction'

import getProductVariantListApi from '../api/getProductVariantListApi'

export function* getProductVariantListSaga(action) {
    try {
        const response = yield call(() => getProductVariantListApi(action.params))
        yield put(getProductVariantListSuccess(response, action))
    } catch (e) {
        yield put(getProductVariantListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PRODUCT_VARIANT_LIST, getProductVariantListSaga);
}