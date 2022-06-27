import {
    SAVE_PROD_IMG,
    SAVE_PROD_IMG_SUCCESS,
    SAVE_PROD_IMG_FAIL,
    SAVE_PROD_IMG_RESET
} from '../action/saveProdImgAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_PROD_IMG:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_PROD_IMG_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
            }

        case SAVE_PROD_IMG_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case SAVE_PROD_IMG_RESET:
            return initialState

        default:
            return state
    }
}
