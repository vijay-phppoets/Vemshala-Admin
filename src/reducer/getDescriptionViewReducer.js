import {
    GET_DESCRIPTION_VIEW,
    GET_DESCRIPTION_VIEW_SUCCESS,
    GET_DESCRIPTION_VIEW_FAIL,
    GET_DESCRIPTION_VIEW_RESET
} from '../action/getDescriptionViewAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    description: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DESCRIPTION_VIEW:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_DESCRIPTION_VIEW_SUCCESS:
            return {
                ...state,
                apiState: "success",
                description: action.response.data.description
            }

        case GET_DESCRIPTION_VIEW_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case GET_DESCRIPTION_VIEW_RESET:
            return initialState

        default:
            return state
    }
}
