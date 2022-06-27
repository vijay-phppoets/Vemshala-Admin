export const UPDATE_VOUCHER = 'UPDATE_VOUCHER'
export const UPDATE_VOUCHER_SUCCESS = 'UPDATE_VOUCHER_SUCCESS'
export const UPDATE_VOUCHER_FAIL = 'UPDATE_VOUCHER_FAIL'
export const UPDATE_VOUCHER_RESET = 'UPDATE_VOUCHER_RESET'

export const updateVoucher = (params) => {
    return { type: UPDATE_VOUCHER, params }
}

export const updateVoucherSuccess = (response) => {
    return { type: UPDATE_VOUCHER_SUCCESS, response }
}

export const updateVoucherFail = (response) => {
    return { type: UPDATE_VOUCHER_FAIL, response }
}

export const updateVoucherReset = () => {
    return { type: UPDATE_VOUCHER_RESET }
}