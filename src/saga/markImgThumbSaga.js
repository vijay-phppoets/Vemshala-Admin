import { call, put, takeLatest } from 'redux-saga/effects'

import {
    MARK_IMG_THUMB,
    markImgThumbSuccess,
    markImgThumbFail
} from '../action/markImgThumbAction'

import markImgThumbApi from '../api/markImgThumbApi'

export function* markImgThumbSaga(action) {
    try {
        const response = yield call(() => markImgThumbApi(action.params))
        yield put(markImgThumbSuccess(response, action))
    } catch (e) {
        yield put(markImgThumbFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(MARK_IMG_THUMB, markImgThumbSaga);
}