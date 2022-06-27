export const UPDATE_SHIPPING = 'UPDATE_SHIPPING'
export const UPDATE_SHIPPING_SUCCESS = 'UPDATE_SHIPPING_SUCCESS'
export const UPDATE_SHIPPING_FAIL = 'UPDATE_SHIPPING_FAIL'
export const UPDATE_SHIPPING_RESET = 'UPDATE_SHIPPING_RESET'

export const updateShipping = (params) => {
    return { type: UPDATE_SHIPPING, params }
}

export const updateShippingSuccess = (response) => {
    return { type: UPDATE_SHIPPING_SUCCESS, response }
}

export const updateShippingFail = (response) => {
    return { type: UPDATE_SHIPPING_FAIL, response }
}

export const updateShippingReset = () => {
    return { type: UPDATE_SHIPPING_RESET }
}