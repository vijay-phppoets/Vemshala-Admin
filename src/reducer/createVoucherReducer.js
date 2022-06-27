import {
    CREATE_VOUCHER,
    CREATE_VOUCHER_SUCCESS,
    CREATE_VOUCHER_FAIL,
    CREATE_VOUCHER_RESET
} from '../action/createVoucherAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_VOUCHER:
            return {
                ...state,
                apiState: "loading",
            }

        case CREATE_VOUCHER_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
                data: action.response.data.data,
            }

        case CREATE_VOUCHER_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case CREATE_VOUCHER_RESET:
            return initialState

        default:
            return state
    }
}
