import {
    GET_VOUCHER_VIEW,
    GET_VOUCHER_VIEW_SUCCESS,
    GET_VOUCHER_VIEW_FAIL,
    GET_VOUCHER_VIEW_RESET
} from '../action/getVoucherViewAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    coupon: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VOUCHER_VIEW:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_VOUCHER_VIEW_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
                coupon: action.response.data.coupon,
            }

        case GET_VOUCHER_VIEW_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case GET_VOUCHER_VIEW_RESET:
            return initialState

        default:
            return state
    }
}
