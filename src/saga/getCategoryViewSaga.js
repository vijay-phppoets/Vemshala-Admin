import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_CATEGORY_VIEW,
    getCategoryViewSuccess,
    getCategoryViewFail
} from '../action/getCategoryViewAction'

import getCategoryViewApi from '../api/getCategoryViewApi'

export function* getCategoryViewSaga(action) {
    try {
        const response = yield call(() => getCategoryViewApi(action.params))
        yield put(getCategoryViewSuccess(response, action))
    } catch (e) {
        yield put(getCategoryViewFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_CATEGORY_VIEW, getCategoryViewSaga);
}