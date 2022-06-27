import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_ATTRIBUTE_FOR_VARIANTS,
    saveAttributeForVariantsSuccess,
    saveAttributeForVariantsFail
} from '../action/saveAttributeForVariantsAction'

import saveAttributeForVariantsApi from '../api/saveAttributeForVariantsApi'

export function* saveAttributeForVariantsSaga(action) {
    try {
        const response = yield call(() => saveAttributeForVariantsApi(action.params))
        yield put(saveAttributeForVariantsSuccess(response, action))
    } catch (e) {
        yield put(saveAttributeForVariantsFail(e.response, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_ATTRIBUTE_FOR_VARIANTS, saveAttributeForVariantsSaga);
}