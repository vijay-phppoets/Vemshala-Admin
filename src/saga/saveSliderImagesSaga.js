import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_SLIDER_IMAGES,
    saveSliderImagesSuccess,
    saveSliderImagesFail
} from '../action/saveSliderImagesAction'

import saveSliderImagesApi from '../api/saveSliderImagesApi'

export function* saveSliderImagesSaga(action) {
    try {
        const response = yield call(() => saveSliderImagesApi(action.params))
        yield put(saveSliderImagesSuccess(response, action))
    } catch (e) {
        yield put(saveSliderImagesFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_SLIDER_IMAGES, saveSliderImagesSaga);
}