import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CREATE_VOUCHER,
    createVoucherSuccess,
    createVoucherFail
} from '../action/createVoucherAction'

import createVoucherApi from '../api/createVoucherApi'

export function* createVoucherSaga(action) {
    try {
        const response = yield call(() => createVoucherApi(action.params))
        yield put(createVoucherSuccess(response, action))
    } catch (e) {
        yield put(createVoucherFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CREATE_VOUCHER, createVoucherSaga);
}