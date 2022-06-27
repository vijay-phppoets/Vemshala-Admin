import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_SETTING,
    getSettingSuccess,
    getSettingFail
} from '../action/getSettingAction'

import getSettingApi from '../api/getSettingApi'

export function* getSettingSaga(action) {
    try {
        const response = yield call(() => getSettingApi(action.params))
        yield put(getSettingSuccess(response, action))
    } catch (e) {
        yield put(getSettingFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_SETTING, getSettingSaga);
}