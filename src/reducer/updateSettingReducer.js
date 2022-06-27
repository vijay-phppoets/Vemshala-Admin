import {
    UPDATE_SETTING,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAIL,
    UPDATE_SETTING_RESET
} from '../action/updateSettingAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SETTING:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_SETTING_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case UPDATE_SETTING_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_SETTING_RESET:
            return initialState

        default:
            return state
    }
}
