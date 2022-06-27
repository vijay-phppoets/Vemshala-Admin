export const GET_VOUCHER_LIST = 'GET_VOUCHER_LIST'
export const GET_VOUCHER_LIST_SUCCESS = 'GET_VOUCHER_LIST_SUCCESS'
export const GET_VOUCHER_LIST_FAIL = 'GET_VOUCHER_LIST_FAIL'
export const GET_VOUCHER_LIST_RESET = 'GET_VOUCHER_LIST_RESET'

export const getVoucherList = (params) => {
    return { type: GET_VOUCHER_LIST, params }
}

export const getVoucherListSuccess = (response) => {
    return { type: GET_VOUCHER_LIST_SUCCESS, response }
}

export const getVoucherListFail = (response) => {
    return { type: GET_VOUCHER_LIST_FAIL, response }
}

export const getVoucherListReset = () => {
    return { type: GET_VOUCHER_LIST_RESET }
}