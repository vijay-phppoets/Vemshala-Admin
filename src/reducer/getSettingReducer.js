import {
    GET_SETTING,
    GET_SETTING_SUCCESS,
    GET_SETTING_FAIL,
    GET_SETTING_RESET
} from '../action/getSettingAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    list: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SETTING:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_SETTING_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.list
            }

        case GET_SETTING_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case GET_SETTING_RESET:
            return initialState

        default:
            return state
    }
}
