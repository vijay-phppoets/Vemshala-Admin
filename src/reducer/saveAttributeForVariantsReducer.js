import {
    SAVE_ATTRIBUTE_FOR_VARIANTS,
    SAVE_ATTRIBUTE_FOR_VARIANTS_SUCCESS,
    SAVE_ATTRIBUTE_FOR_VARIANTS_FAIL,
    SAVE_ATTRIBUTE_FOR_VARIANTS_RESET
} from '../action/saveAttributeForVariantsAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_ATTRIBUTE_FOR_VARIANTS:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_ATTRIBUTE_FOR_VARIANTS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
            }

        case SAVE_ATTRIBUTE_FOR_VARIANTS_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case SAVE_ATTRIBUTE_FOR_VARIANTS_RESET:
            return initialState

        default:
            return state
    }
}
