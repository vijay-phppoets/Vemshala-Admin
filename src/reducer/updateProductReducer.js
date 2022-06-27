import {
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET
} from '../action/updateProductAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_PRODUCT_RESET:
            return initialState

        default:
            return state
    }
}
