import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET
} from '../action/loginAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                apiState: "loading",
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data
            }

        case LOGIN_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case LOGIN_RESET:
            return initialState

        default:
            return state
    }
}
