import {
    DEL_PROD_VAR,
    DEL_PROD_VAR_SUCCESS,
    DEL_PROD_VAR_FAIL,
    DEL_PROD_VAR_RESET
} from '../action/delProdVarAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DEL_PROD_VAR:
            return {
                ...state,
                apiState: "loading",
            }

        case DEL_PROD_VAR_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case DEL_PROD_VAR_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case DEL_PROD_VAR_RESET:
            return initialState

        default:
            return state
    }
}
