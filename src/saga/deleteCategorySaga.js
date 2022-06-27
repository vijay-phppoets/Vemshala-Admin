import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DELETE_CATEGORY,
    deleteCategorySuccess,
    deleteCategoryFail
} from '../action/deleteCategoryAction'

import deleteCategoryApi from '../api/deleteCategoryApi'

export function* deleteCategorySaga(action) {
    try {
        const response = yield call(() => deleteCategoryApi(action.params))
        yield put(deleteCategorySuccess(response, action))
    } catch (e) {
        yield put(deleteCategoryFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}