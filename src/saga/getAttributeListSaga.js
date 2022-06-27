import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ATTRIBUTE_LIST,
    getAttributeListSuccess,
    getAttributeListFail
} from '../action/getAttributeListAction'

import getAttributeListApi from '../api/getAttributeListApi'

export function* getAttributeListSaga(action) {
    try {
        const response = yield call(() => getAttributeListApi(action.params))
        yield put(getAttributeListSuccess(response, action))
    } catch (e) {
        yield put(getAttributeListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ATTRIBUTE_LIST, getAttributeListSaga);
}