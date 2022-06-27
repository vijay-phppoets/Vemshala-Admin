export const UPDATE_ORDER = 'UPDATE_ORDER'
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS'
export const UPDATE_ORDER_FAIL = 'UPDATE_ORDER_FAIL'
export const UPDATE_ORDER_RESET = 'UPDATE_ORDER_RESET'

export const updateOrder = (params) => {
    return { type: UPDATE_ORDER, params }
}

export const updateOrderSuccess = (response) => {
    return { type: UPDATE_ORDER_SUCCESS, response }
}

export const updateOrderFail = (response) => {
    return { type: UPDATE_ORDER_FAIL, response }
}

export const updateOrderReset = () => {
    return { type: UPDATE_ORDER_RESET }
}