export const GET_ORDER_LIST = 'GET_ORDER_LIST'
export const GET_ORDER_LIST_SUCCESS = 'GET_ORDER_LIST_SUCCESS'
export const GET_ORDER_LIST_FAIL = 'GET_ORDER_LIST_FAIL'
export const GET_ORDER_LIST_RESET = 'GET_ORDER_LIST_RESET'

export const getOrderList = (params) => {
    return { type: GET_ORDER_LIST, params }
}

export const getOrderListSuccess = (response) => {
    return { type: GET_ORDER_LIST_SUCCESS, response }
}

export const getOrderListFail = (response) => {
    return { type: GET_ORDER_LIST_FAIL, response }
}

export const getOrderListReset = () => {
    return { type: GET_ORDER_LIST_RESET }
}