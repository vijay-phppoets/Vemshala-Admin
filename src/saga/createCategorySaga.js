import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CREATE_CATEGORY,
    createCategorySuccess,
    createCategoryFail
} from '../action/createCategoryAction'

import createCategoryApi from '../api/createCategoryApi'

export function* createCategorySaga(action) {
    try {
        const response = yield call(() => createCategoryApi(action.params))
        yield put(createCategorySuccess(response, action))
    } catch (e) {
        yield put(createCategoryFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CREATE_CATEGORY, createCategorySaga);
}