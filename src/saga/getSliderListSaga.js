import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_SLIDER_LIST,
    getSliderListSuccess,
    getSliderListFail
} from '../action/getSliderListAction'

import getSliderListApi from '../api/getSliderListApi'

export function* getSliderListSaga(action) {
    try {
        const response = yield call(() => getSliderListApi(action.params))
        yield put(getSliderListSuccess(response, action))
    } catch (e) {
        yield put(getSliderListFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_SLIDER_LIST, getSliderListSaga);
}