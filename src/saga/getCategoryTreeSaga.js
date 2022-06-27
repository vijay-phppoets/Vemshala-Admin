import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_CATEGORY_TREE,
    getCategoryTreeSuccess,
    getCategoryTreeFail
} from '../action/getCategoryTreeAction'

import getCategoryTreeApi from '../api/getCategoryTreeApi'

export function* getCategoryTreeSaga(action) {
    try {
        const response = yield call(() => getCategoryTreeApi(action.params))
        yield put(getCategoryTreeSuccess(response, action))
    } catch (e) {
        yield put(getCategoryTreeFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_CATEGORY_TREE, getCategoryTreeSaga);
}