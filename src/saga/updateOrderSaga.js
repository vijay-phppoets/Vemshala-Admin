import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_ORDER,
    updateOrderSuccess,
    updateOrderFail
} from '../action/updateOrderAction'

import updateOrderApi from '../api/updateOrderApi'

export function* updateOrderSaga(action) {
    try {
        const response = yield call(() => updateOrderApi(action.params))
        yield put(updateOrderSuccess(response, action))
    } catch (e) {
        yield put(updateOrderFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_ORDER, updateOrderSaga);
}