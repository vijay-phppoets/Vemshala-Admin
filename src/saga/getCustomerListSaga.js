import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_CUSTOMER_LIST,
    getCustomerListSuccess,
    getCustomerListFail
} from '../action/getCustomerListAction'

import getCustomerListApi from '../api/getCustomerListApi'

export function* getCustomerListSaga(action) {
    try {
        const response = yield call(() => getCustomerListApi(action.params))
        yield put(getCustomerListSuccess(response, action))
    } catch (e) {
        yield put(getCustomerListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_CUSTOMER_LIST, getCustomerListSaga);
}