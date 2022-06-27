export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
export const CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL'
export const CREATE_PRODUCT_RESET = 'CREATE_PRODUCT_RESET'

export const createProduct = (params) => {
    return { type: CREATE_PRODUCT, params }
}

export const createProductSuccess = (response) => {
    return { type: CREATE_PRODUCT_SUCCESS, response }
}

export const createProductFail = (response) => {
    return { type: CREATE_PRODUCT_FAIL, response }
}

export const createProductReset = () => {
    return { type: CREATE_PRODUCT_RESET }
}