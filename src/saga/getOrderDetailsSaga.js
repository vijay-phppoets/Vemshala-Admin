import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ORDER_DETAILS,
    getOrderDetailsSuccess,
    getOrderDetailsFail
} from '../action/getOrderDetailsAction'

import getOrderDetailsApi from '../api/getOrderDetailsApi'

export function* getOrderDetailsSaga(action) {
    try {
        const response = yield call(() => getOrderDetailsApi(action.params))
        yield put(getOrderDetailsSuccess(response, action))
    } catch (e) {
        yield put(getOrderDetailsFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ORDER_DETAILS, getOrderDetailsSaga);
}