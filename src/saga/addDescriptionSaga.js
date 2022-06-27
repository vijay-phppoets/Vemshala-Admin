import { call, put, takeLatest } from 'redux-saga/effects'

import {
    ADD_DESCRIPTION,
    addDescriptionSuccess,
    addDescriptionFail
} from '../action/addDescriptionAction'

import addDescriptionApi from '../api/addDescriptionApi'

export function* addDescriptionSaga(action) {
    try {
        const response = yield call(() => addDescriptionApi(action.params))
        yield put(addDescriptionSuccess(response, action))
    } catch (e) {
        yield put(addDescriptionFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(ADD_DESCRIPTION, addDescriptionSaga);
}