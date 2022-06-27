import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_DESCRIPTION_VIEW,
    getDescriptionViewSuccess,
    getDescriptionViewFail
} from '../action/getDescriptionViewAction'

import getDescriptionViewApi from '../api/getDescriptionViewApi'

export function* getDescriptionViewSaga(action) {
    try {
        const response = yield call(() => getDescriptionViewApi(action.params))
        yield put(getDescriptionViewSuccess(response, action))
    } catch (e) {
        yield put(getDescriptionViewFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_DESCRIPTION_VIEW, getDescriptionViewSaga);
}