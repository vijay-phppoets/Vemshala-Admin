import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET
} from '../action/createProductAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                apiState: "loading",
            }

        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
                data: action.response.data.data,
            }

        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case CREATE_PRODUCT_RESET:
            return initialState

        default:
            return state
    }
}
