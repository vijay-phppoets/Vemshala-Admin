import {
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET
} from '../action/deleteCategoryAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_CATEGORY:
            return {
                ...state,
                apiState: "loading",
            }

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case DELETE_CATEGORY_RESET:
            return initialState

        default:
            return state
    }
}
