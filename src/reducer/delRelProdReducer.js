import {
    DEL_REL_PROD,
    DEL_REL_PROD_SUCCESS,
    DEL_REL_PROD_FAIL,
    DEL_REL_PROD_RESET
} from '../action/delRelProdAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DEL_REL_PROD:
            return {
                ...state,
                apiState: "loading",
            }

        case DEL_REL_PROD_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case DEL_REL_PROD_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case DEL_REL_PROD_RESET:
            return initialState

        default:
            return state
    }
}
