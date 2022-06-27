import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DEL_TESTIMONIAL,
    delTestimonialSuccess,
    delTestimonialFail
} from '../action/delTestimonialAction'

import delTestimonialApi from '../api/delTestimonialApi'

export function* delTestimonialSaga(action) {
    try {
        const response = yield call(() => delTestimonialApi(action.params))
        yield put(delTestimonialSuccess(response, action))
    } catch (e) {
        yield put(delTestimonialFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DEL_TESTIMONIAL, delTestimonialSaga);
}