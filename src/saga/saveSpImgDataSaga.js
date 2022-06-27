import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_SP_IMG_DATA,
    saveSpImgDataSuccess,
    saveSpImgDataFail
} from '../action/saveSpImgDataAction'

import saveSpImgDataApi from '../api/saveSpImgDataApi'

export function* saveSpImgDataSaga(action) {
    try {
        const response = yield call(() => saveSpImgDataApi(action.params))
        yield put(saveSpImgDataSuccess(response, action))
    } catch (e) {
        yield put(saveSpImgDataFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_SP_IMG_DATA, saveSpImgDataSaga);
}