import {
    ADD_REL_PROD,
    ADD_REL_PROD_SUCCESS,
    ADD_REL_PROD_FAIL,
    ADD_REL_PROD_RESET
} from '../action/addRelProdAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_REL_PROD:
            return {
                ...state,
                apiState: "loading",
            }

        case ADD_REL_PROD_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case ADD_REL_PROD_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case ADD_REL_PROD_RESET:
            return initialState

        default:
            return state
    }
}
