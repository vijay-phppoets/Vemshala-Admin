import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_VOUCHER_VIEW,
    getVoucherViewSuccess,
    getVoucherViewFail
} from '../action/getVoucherViewAction'

import getVoucherViewApi from '../api/getVoucherViewApi'

export function* getVoucherViewSaga(action) {
    try {
        const response = yield call(() => getVoucherViewApi(action.params))
        yield put(getVoucherViewSuccess(response, action))
    } catch (e) {
        yield put(getVoucherViewFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_VOUCHER_VIEW, getVoucherViewSaga);
}