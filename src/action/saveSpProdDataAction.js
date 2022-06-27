export const SAVE_SP_PROD_DATA = 'SAVE_SP_PROD_DATA'
export const SAVE_SP_PROD_DATA_SUCCESS = 'SAVE_SP_PROD_DATA_SUCCESS'
export const SAVE_SP_PROD_DATA_FAIL = 'SAVE_SP_PROD_DATA_FAIL'
export const SAVE_SP_PROD_DATA_RESET = 'SAVE_SP_PROD_DATA_RESET'

export const saveSpProdData = (params) => {
    return { type: SAVE_SP_PROD_DATA, params }
}

export const saveSpProdDataSuccess = (response) => {
    return { type: SAVE_SP_PROD_DATA_SUCCESS, response }
}

export const saveSpProdDataFail = (response) => {
    return { type: SAVE_SP_PROD_DATA_FAIL, response }
}

export const saveSpProdDataReset = () => {
    return { type: SAVE_SP_PROD_DATA_RESET }
}