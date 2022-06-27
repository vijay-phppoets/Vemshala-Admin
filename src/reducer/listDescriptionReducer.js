import {
    LIST_DESCRIPTION,
    LIST_DESCRIPTION_SUCCESS,
    LIST_DESCRIPTION_FAIL,
    LIST_DESCRIPTION_RESET
} from '../action/listDescriptionAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIST_DESCRIPTION:
            return {
                ...state,
                apiState: "loading",
            }

        case LIST_DESCRIPTION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.list
            }

        case LIST_DESCRIPTION_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case LIST_DESCRIPTION_RESET:
            return initialState

        default:
            return state
    }
}
