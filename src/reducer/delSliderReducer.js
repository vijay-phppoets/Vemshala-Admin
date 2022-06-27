import {
    DEL_SLIDER,
    DEL_SLIDER_SUCCESS,
    DEL_SLIDER_FAIL,
    DEL_SLIDER_RESET
} from '../action/delSliderAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DEL_SLIDER:
            return {
                ...state,
                apiState: "loading",
            }

        case DEL_SLIDER_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case DEL_SLIDER_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case DEL_SLIDER_RESET:
            return initialState

        default:
            return state
    }
}
