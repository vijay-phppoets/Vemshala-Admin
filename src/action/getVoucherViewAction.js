export const GET_VOUCHER_VIEW = 'GET_VOUCHER_VIEW'
export const GET_VOUCHER_VIEW_SUCCESS = 'GET_VOUCHER_VIEW_SUCCESS'
export const GET_VOUCHER_VIEW_FAIL = 'GET_VOUCHER_VIEW_FAIL'
export const GET_VOUCHER_VIEW_RESET = 'GET_VOUCHER_VIEW_RESET'

export const getVoucherView = (params) => {
    return { type: GET_VOUCHER_VIEW, params }
}

export const getVoucherViewSuccess = (response) => {
    return { type: GET_VOUCHER_VIEW_SUCCESS, response }
}

export const getVoucherViewFail = (response) => {
    return { type: GET_VOUCHER_VIEW_FAIL, response }
}

export const getVoucherViewReset = () => {
    return { type: GET_VOUCHER_VIEW_RESET }
}