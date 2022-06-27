import {
    SAVE_TESTIMONIAL,
    SAVE_TESTIMONIAL_SUCCESS,
    SAVE_TESTIMONIAL_FAIL,
    SAVE_TESTIMONIAL_RESET
} from '../action/saveTestimonialAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_TESTIMONIAL:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
            }

        case SAVE_TESTIMONIAL_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case SAVE_TESTIMONIAL_RESET:
            return initialState

        default:
            return state
    }
}
