import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ORDER_LIST,
    getOrderListSuccess,
    getOrderListFail
} from '../action/getOrderListAction'

import getOrderListApi from '../api/getOrderListApi'

export function* getOrderListSaga(action) {
    try {
        const response = yield call(() => getOrderListApi(action.params))
        yield put(getOrderListSuccess(response, action))
    } catch (e) {
        yield put(getOrderListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ORDER_LIST, getOrderListSaga);
}