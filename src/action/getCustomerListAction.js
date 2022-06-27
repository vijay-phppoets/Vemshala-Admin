export const GET_CUSTOMER_LIST = 'GET_CUSTOMER_LIST'
export const GET_CUSTOMER_LIST_SUCCESS = 'GET_CUSTOMER_LIST_SUCCESS'
export const GET_CUSTOMER_LIST_FAIL = 'GET_CUSTOMER_LIST_FAIL'
export const GET_CUSTOMER_LIST_RESET = 'GET_CUSTOMER_LIST_RESET'

export const getCustomerList = (params) => {
    return { type: GET_CUSTOMER_LIST, params }
}

export const getCustomerListSuccess = (response) => {
    return { type: GET_CUSTOMER_LIST_SUCCESS, response }
}

export const getCustomerListFail = (response) => {
    return { type: GET_CUSTOMER_LIST_FAIL, response }
}

export const getCustomerListReset = () => {
    return { type: GET_CUSTOMER_LIST_RESET }
}