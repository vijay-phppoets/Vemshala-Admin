import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DEL_SLIDER,
    delSliderSuccess,
    delSliderFail
} from '../action/delSliderAction'

import delSliderApi from '../api/delSliderApi'

export function* delSliderSaga(action) {
    try {
        const response = yield call(() => delSliderApi(action.params))
        yield put(delSliderSuccess(response, action))
    } catch (e) {
        yield put(delSliderFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DEL_SLIDER, delSliderSaga);
}