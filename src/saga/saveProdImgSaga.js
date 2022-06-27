import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_PROD_IMG,
    saveProdImgSuccess,
    saveProdImgFail
} from '../action/saveProdImgAction'

import saveProdImgApi from '../api/saveProdImgApi'

export function* saveProdImgSaga(action) {
    try {
        const response = yield call(() => saveProdImgApi(action.params))
        yield put(saveProdImgSuccess(response, action))
    } catch (e) {
        yield put(saveProdImgFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_PROD_IMG, saveProdImgSaga);
}