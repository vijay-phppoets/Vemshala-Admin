import {
    GET_CATEGORY_VIEW,
    GET_CATEGORY_VIEW_SUCCESS,
    GET_CATEGORY_VIEW_FAIL,
    GET_CATEGORY_VIEW_RESET
} from '../action/getCategoryViewAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    category: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_VIEW:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_CATEGORY_VIEW_SUCCESS:
            return {
                ...state,
                apiState: "success",
                category: action.response.data.category
            }

        case GET_CATEGORY_VIEW_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case GET_CATEGORY_VIEW_RESET:
            return initialState

        default:
            return state
    }
}
