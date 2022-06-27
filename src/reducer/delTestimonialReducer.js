import {
    DEL_TESTIMONIAL,
    DEL_TESTIMONIAL_SUCCESS,
    DEL_TESTIMONIAL_FAIL,
    DEL_TESTIMONIAL_RESET
} from '../action/delTestimonialAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DEL_TESTIMONIAL:
            return {
                ...state,
                apiState: "loading",
            }

        case DEL_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message
            }

        case DEL_TESTIMONIAL_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case DEL_TESTIMONIAL_RESET:
            return initialState

        default:
            return state
    }
}
