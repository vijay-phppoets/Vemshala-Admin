import {
    ADD_DESCRIPTION,
    ADD_DESCRIPTION_SUCCESS,
    ADD_DESCRIPTION_FAIL,
    ADD_DESCRIPTION_RESET
} from '../action/addDescriptionAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_DESCRIPTION:
            return {
                ...state,
                apiState: "loading",
            }

        case ADD_DESCRIPTION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case ADD_DESCRIPTION_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case ADD_DESCRIPTION_RESET:
            return initialState

        default:
            return state
    }
}
