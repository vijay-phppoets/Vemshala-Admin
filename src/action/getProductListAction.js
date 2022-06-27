export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST'
export const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS'
export const GET_PRODUCT_LIST_FAIL = 'GET_PRODUCT_LIST_FAIL'
export const GET_PRODUCT_LIST_RESET = 'GET_PRODUCT_LIST_RESET'

export const getProductList = (params) => {
    return { type: GET_PRODUCT_LIST, params }
}

export const getProductListSuccess = (response) => {
    return { type: GET_PRODUCT_LIST_SUCCESS, response }
}

export const getProductListFail = (response) => {
    return { type: GET_PRODUCT_LIST_FAIL, response }
}

export const getProductListReset = () => {
    return { type: GET_PRODUCT_LIST_RESET }
}