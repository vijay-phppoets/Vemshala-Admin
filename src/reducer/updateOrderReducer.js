import {
    UPDATE_ORDER,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET
} from '../action/updateOrderAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_ORDER:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
                data: action.response.data.data,
            }

        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_ORDER_RESET:
            return initialState

        default:
            return state
    }
}
