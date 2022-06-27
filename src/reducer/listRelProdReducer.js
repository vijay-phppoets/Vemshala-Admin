import {
    LIST_REL_PROD,
    LIST_REL_PROD_SUCCESS,
    LIST_REL_PROD_FAIL,
    LIST_REL_PROD_RESET
} from '../action/listRelProdAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_REL_PROD:
            return {
                ...state,
                apiState: "loading",
            }

        case LIST_REL_PROD_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.list
            }

        case LIST_REL_PROD_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case LIST_REL_PROD_RESET:
            return initialState

        default:
            return state
    }
}
