import {
    SAVE_SP_PROD_DATA,
    SAVE_SP_PROD_DATA_SUCCESS,
    SAVE_SP_PROD_DATA_FAIL,
    SAVE_SP_PROD_DATA_RESET
} from '../action/saveSpProdDataAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_SP_PROD_DATA:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_SP_PROD_DATA_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
            }

        case SAVE_SP_PROD_DATA_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case SAVE_SP_PROD_DATA_RESET:
            return initialState

        default:
            return state
    }
}
