import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_SHIPPING,
    updateShippingSuccess,
    updateShippingFail
} from '../action/updateShippingAction'

import updateShippingApi from '../api/updateShippingApi'

export function* updateShippingSaga(action) {
    try {
        const response = yield call(() => updateShippingApi(action.params))
        yield put(updateShippingSuccess(response, action))
    } catch (e) {
        yield put(updateShippingFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_SHIPPING, updateShippingSaga);
}