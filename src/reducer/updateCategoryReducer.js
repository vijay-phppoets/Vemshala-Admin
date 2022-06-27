import {
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET
} from '../action/updateCategoryAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_CATEGORY:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_CATEGORY_RESET:
            return initialState

        default:
            return state
    }
}
