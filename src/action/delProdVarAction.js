export const DEL_PROD_VAR = 'DEL_PROD_VAR'
export const DEL_PROD_VAR_SUCCESS = 'DEL_PROD_VAR_SUCCESS'
export const DEL_PROD_VAR_FAIL = 'DEL_PROD_VAR_FAIL'
export const DEL_PROD_VAR_RESET = 'DEL_PROD_VAR_RESET'

export const delProdVar = (params) => {
    return { type: DEL_PROD_VAR, params }
}

export const delProdVarSuccess = (response) => {
    return { type: DEL_PROD_VAR_SUCCESS, response }
}

export const delProdVarFail = (response) => {
    return { type: DEL_PROD_VAR_FAIL, response }
}

export const delProdVarReset = () => {
    return { type: DEL_PROD_VAR_RESET }
}