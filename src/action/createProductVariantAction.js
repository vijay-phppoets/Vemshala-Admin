export const CREATE_PRODUCT_VARIANT = 'CREATE_PRODUCT_VARIANT'
export const CREATE_PRODUCT_VARIANT_SUCCESS = 'CREATE_PRODUCT_VARIANT_SUCCESS'
export const CREATE_PRODUCT_VARIANT_FAIL = 'CREATE_PRODUCT_VARIANT_FAIL'
export const CREATE_PRODUCT_VARIANT_RESET = 'CREATE_PRODUCT_VARIANT_RESET'

export const createProductVariant = (params) => {
    return { type: CREATE_PRODUCT_VARIANT, params }
}

export const createProductVariantSuccess = (response) => {
    return { type: CREATE_PRODUCT_VARIANT_SUCCESS, response }
}

export const createProductVariantFail = (response) => {
    return { type: CREATE_PRODUCT_VARIANT_FAIL, response }
}

export const createProductVariantReset = () => {
    return { type: CREATE_PRODUCT_VARIANT_RESET }
}