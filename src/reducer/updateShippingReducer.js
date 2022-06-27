import {
    UPDATE_SHIPPING,
    UPDATE_SHIPPING_SUCCESS,
    UPDATE_SHIPPING_FAIL,
    UPDATE_SHIPPING_RESET
} from '../action/updateShippingAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SHIPPING:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_SHIPPING_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case UPDATE_SHIPPING_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_SHIPPING_RESET:
            return initialState

        default:
            return state
    }
}
