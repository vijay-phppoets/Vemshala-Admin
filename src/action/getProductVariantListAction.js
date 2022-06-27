export const GET_PRODUCT_VARIANT_LIST = 'GET_PRODUCT_VARIANT_LIST'
export const GET_PRODUCT_VARIANT_LIST_SUCCESS = 'GET_PRODUCT_VARIANT_LIST_SUCCESS'
export const GET_PRODUCT_VARIANT_LIST_FAIL = 'GET_PRODUCT_VARIANT_LIST_FAIL'
export const GET_PRODUCT_VARIANT_LIST_RESET = 'GET_PRODUCT_VARIANT_LIST_RESET'

export const getProductVariantList = (params) => {
    return { type: GET_PRODUCT_VARIANT_LIST, params }
}

export const getProductVariantListSuccess = (response) => {
    return { type: GET_PRODUCT_VARIANT_LIST_SUCCESS, response }
}

export const getProductVariantListFail = (response) => {
    return { type: GET_PRODUCT_VARIANT_LIST_FAIL, response }
}

export const getProductVariantListReset = () => {
    return { type: GET_PRODUCT_VARIANT_LIST_RESET }
}