import {
    UPDATE_VOUCHER,
    UPDATE_VOUCHER_SUCCESS,
    UPDATE_VOUCHER_FAIL,
    UPDATE_VOUCHER_RESET
} from '../action/updateVoucherAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_VOUCHER:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_VOUCHER_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case UPDATE_VOUCHER_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_VOUCHER_RESET:
            return initialState

        default:
            return state
    }
}
