import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_VOUCHER_LIST,
    getVoucherListSuccess,
    getVoucherListFail
} from '../action/getVoucherListAction'

import getVoucherListApi from '../api/getVoucherListApi'

export function* getVoucherListSaga(action) {
    try {
        const response = yield call(() => getVoucherListApi(action.params))
        yield put(getVoucherListSuccess(response, action))
    } catch (e) {
        yield put(getVoucherListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_VOUCHER_LIST, getVoucherListSaga);
}