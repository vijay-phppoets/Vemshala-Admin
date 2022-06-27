import {
    GET_CATEGORY_TREE,
    GET_CATEGORY_TREE_SUCCESS,
    GET_CATEGORY_TREE_FAIL,
    GET_CATEGORY_TREE_RESET
} from '../action/getCategoryTreeAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    tree: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_TREE:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_CATEGORY_TREE_SUCCESS:
            return {
                ...state,
                apiState: "success",
                tree: action.response.data.tree
            }

        case GET_CATEGORY_TREE_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case GET_CATEGORY_TREE_RESET:
            return initialState

        default:
            return state
    }
}
