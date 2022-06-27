import {
    GET_PRODUCT_VIEW,
    GET_PRODUCT_VIEW_SUCCESS,
    GET_PRODUCT_VIEW_FAIL,
    GET_PRODUCT_VIEW_RESET
} from '../action/getProductViewAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, error
    message: "",
    product: {},
    images: [],
    attr_data_for_sp_img: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_VIEW:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_PRODUCT_VIEW_SUCCESS:
            return {
                ...state,
                apiState: "success",
                message: action.response.data.message,
                product: action.response.data.product,
                images: action.response.data.images,
                attr_data_for_sp_img: action.response.data.attr_data_for_sp_img,
            }

        case GET_PRODUCT_VIEW_FAIL:
            return {
                ...state,
                apiState: "error",
                message: action.response && action.response.data && action.response.data.message || strings.api_err_msg,
            }

        case GET_PRODUCT_VIEW_RESET:
            return initialState

        default:
            return state
    }
}
