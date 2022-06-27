import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_DESCRIPTION,
    updateDescriptionSuccess,
    updateDescriptionFail
} from '../action/updateDescriptionAction'

import updateDescriptionApi from '../api/updateDescriptionApi'

export function* updateDescriptionSaga(action) {
    try {
        const response = yield call(() => updateDescriptionApi(action.params))
        yield put(updateDescriptionSuccess(response, action))
    } catch (e) {
        yield put(updateDescriptionFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_DESCRIPTION, updateDescriptionSaga);
}