import { call, put, takeLatest } from 'redux-saga/effects'

import {
    LIST_DESCRIPTION,
    listDescriptionSuccess,
    listDescriptionFail
} from '../action/listDescriptionAction'

import listDescriptionApi from '../api/listDescriptionApi'

export function* listDescriptionSaga(action) {
    try {
        const response = yield call(() => listDescriptionApi(action.params))
        yield put(listDescriptionSuccess(response, action))
    } catch (e) {
        yield put(listDescriptionFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(LIST_DESCRIPTION, listDescriptionSaga);
}