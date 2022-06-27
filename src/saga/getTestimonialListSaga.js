import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_TESTIMONIAL_LIST,
    getTestimonialListSuccess,
    getTestimonialListFail
} from '../action/getTestimonialListAction'

import getTestimonialListApi from '../api/getTestimonialListApi'

export function* getTestimonialListSaga(action) {
    try {
        const response = yield call(() => getTestimonialListApi(action.params))
        yield put(getTestimonialListSuccess(response, action))
    } catch (e) {
        yield put(getTestimonialListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_TESTIMONIAL_LIST, getTestimonialListSaga);
}