import {
    MARK_IMG_THUMB,
    MARK_IMG_THUMB_SUCCESS,
    MARK_IMG_THUMB_FAIL,
    MARK_IMG_THUMB_RESET
} from '../action/markImgThumbAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case MARK_IMG_THUMB:
            return {
                ...state,
                apiState: "loading",
            }

        case MARK_IMG_THUMB_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
            }

        case MARK_IMG_THUMB_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case MARK_IMG_THUMB_RESET:
            return initialState

        default:
            return state
    }
}
