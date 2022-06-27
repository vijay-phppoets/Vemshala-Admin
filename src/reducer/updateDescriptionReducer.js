import {
    UPDATE_DESCRIPTION,
    UPDATE_DESCRIPTION_SUCCESS,
    UPDATE_DESCRIPTION_FAIL,
    UPDATE_DESCRIPTION_RESET
} from '../action/updateDescriptionAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                apiState: "loading",
            }

        case UPDATE_DESCRIPTION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case UPDATE_DESCRIPTION_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case UPDATE_DESCRIPTION_RESET:
            return initialState

        default:
            return state
    }
}
