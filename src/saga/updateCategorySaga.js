import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_CATEGORY,
    updateCategorySuccess,
    updateCategoryFail
} from '../action/updateCategoryAction'

import updateCategoryApi from '../api/updateCategoryApi'

export function* updateCategorySaga(action) {
    try {
        const response = yield call(() => updateCategoryApi(action.params))
        yield put(updateCategorySuccess(response, action))
    } catch (e) {
        yield put(updateCategoryFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_CATEGORY, updateCategorySaga);
}