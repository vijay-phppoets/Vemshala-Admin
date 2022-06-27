import {
    SAVE_SLIDER_IMAGES,
    SAVE_SLIDER_IMAGES_SUCCESS,
    SAVE_SLIDER_IMAGES_FAIL,
    SAVE_SLIDER_IMAGES_RESET
} from '../action/saveSliderImagesAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_SLIDER_IMAGES:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_SLIDER_IMAGES_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
            }

        case SAVE_SLIDER_IMAGES_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case SAVE_SLIDER_IMAGES_RESET:
            return initialState

        default:
            return state
    }
}
