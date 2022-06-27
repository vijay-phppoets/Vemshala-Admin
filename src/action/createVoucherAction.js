export const CREATE_VOUCHER = 'CREATE_VOUCHER'
export const CREATE_VOUCHER_SUCCESS = 'CREATE_VOUCHER_SUCCESS'
export const CREATE_VOUCHER_FAIL = 'CREATE_VOUCHER_FAIL'
export const CREATE_VOUCHER_RESET = 'CREATE_VOUCHER_RESET'

export const createVoucher = (params) => {
    return { type: CREATE_VOUCHER, params }
}

export const createVoucherSuccess = (response) => {
    return { type: CREATE_VOUCHER_SUCCESS, response }
}

export const createVoucherFail = (response) => {
    return { type: CREATE_VOUCHER_FAIL, response }
}

export const createVoucherReset = () => {
    return { type: CREATE_VOUCHER_RESET }
}