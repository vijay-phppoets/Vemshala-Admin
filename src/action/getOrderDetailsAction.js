export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS'
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS'
export const GET_ORDER_DETAILS_FAIL = ' GET_ORDER_DETAILS_FAIL'
export const GET_ORDER_DETAILS_RESET = 'GET_ORDER_DETAILS_RESET'

export const getOrderDetails = (params) => {
    return { type: GET_ORDER_DETAILS, params }
}

export const getOrderDetailsSuccess = (response) => {
    return { type: GET_ORDER_DETAILS_SUCCESS, response }
}

export const getOrderDetailsFail = (response) => {
    return { type: GET_ORDER_DETAILS_FAIL, response }
}

export const getOrderDetailsReset = () => {
    return { type: GET_ORDER_DETAILS_RESET }
}