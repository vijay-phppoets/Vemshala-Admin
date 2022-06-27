import {
    DEL_PROD_IMG,
    DEL_PROD_IMG_SUCCESS,
    DEL_PROD_IMG_FAIL,
    DEL_PROD_IMG_RESET
} from '../action/delProdImgAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DEL_PROD_IMG:
            return {
                ...state,
                apiState: "loading",
            }

        case DEL_PROD_IMG_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case DEL_PROD_IMG_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case DEL_PROD_IMG_RESET:
            return initialState

        default:
            return state
    }
}
