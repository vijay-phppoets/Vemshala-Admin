export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS'
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL'
export const UPDATE_PRODUCT_RESET = 'UPDATE_PRODUCT_RESET'

export const updateProduct = (params) => {
    return { type: UPDATE_PRODUCT, params }
}

export const updateProductSuccess = (response) => {
    return { type: UPDATE_PRODUCT_SUCCESS, response }
}

export const updateProductFail = (response) => {
    return { type: UPDATE_PRODUCT_FAIL, response }
}

export const updateProductReset = () => {
    return { type: UPDATE_PRODUCT_RESET }
}