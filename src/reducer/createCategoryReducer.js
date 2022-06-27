import {
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    CREATE_CATEGORY_RESET
} from '../action/createCategoryAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CATEGORY:
            return {
                ...state,
                apiState: "loading",
            }

        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case CREATE_CATEGORY_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case CREATE_CATEGORY_RESET:
            return initialState

        default:
            return state
    }
}
