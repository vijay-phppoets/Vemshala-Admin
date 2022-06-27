import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_TESTIMONIAL,
    saveTestimonialSuccess,
    saveTestimonialFail
} from '../action/saveTestimonialAction'

import saveTestimonialApi from '../api/saveTestimonialApi'

export function* saveTestimonialSaga(action) {
    try {
        const response = yield call(() => saveTestimonialApi(action.params))
        yield put(saveTestimonialSuccess(response, action))
    } catch (e) {
        yield put(saveTestimonialFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_TESTIMONIAL, saveTestimonialSaga);
}