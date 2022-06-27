import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_VOUCHER,
    updateVoucherSuccess,
    updateVoucherFail
} from '../action/updateVoucherAction'

import updateVoucherApi from '../api/updateVoucherApi'

export function* updateVoucherSaga(action) {
    try {
        const response = yield call(() => updateVoucherApi(action.params))
        yield put(updateVoucherSuccess(response, action))
    } catch (e) {
        yield put(updateVoucherFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_VOUCHER, updateVoucherSaga);
}