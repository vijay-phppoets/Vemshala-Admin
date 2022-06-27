export const GET_PRODUCT_VIEW = 'GET_PRODUCT_VIEW'
export const GET_PRODUCT_VIEW_SUCCESS = 'GET_PRODUCT_VIEW_SUCCESS'
export const GET_PRODUCT_VIEW_FAIL = 'GET_PRODUCT_VIEW_FAIL'
export const GET_PRODUCT_VIEW_RESET = 'GET_PRODUCT_VIEW_RESET'

export const getProductView = (params) => {
    return { type: GET_PRODUCT_VIEW, params }
}

export const getProductViewSuccess = (response) => {
    return { type: GET_PRODUCT_VIEW_SUCCESS, response }
}

export const getProductViewFail = (response) => {
    return { type: GET_PRODUCT_VIEW_FAIL, response }
}

export const getProductViewReset = () => {
    return { type: GET_PRODUCT_VIEW_RESET }
}