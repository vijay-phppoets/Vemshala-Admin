import { call, put, takeLatest } from 'redux-saga/effects'

import {
    UPDATE_SETTING,
    updateSettingSuccess,
    updateSettingFail
} from '../action/updateSettingAction'

import updateSettingApi from '../api/updateSettingApi'

export function* updateProductSaga(action) {
    try {
        const response = yield call(() => updateSettingApi(action.params))
        yield put(updateSettingSuccess(response, action))
    } catch (e) {
        yield put(updateSettingFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(UPDATE_SETTING, updateProductSaga);
}