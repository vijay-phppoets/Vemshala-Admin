export const DEL_REL_PROD = 'DEL_REL_PROD'
export const DEL_REL_PROD_SUCCESS = 'DEL_REL_PROD_SUCCESS'
export const DEL_REL_PROD_FAIL = 'DEL_REL_PROD_FAIL'
export const DEL_REL_PROD_RESET = 'DEL_REL_PROD_RESET'

export const delRelProd = (params) => {
    return { type: DEL_REL_PROD, params }
}

export const delRelProdSuccess = (response) => {
    return { type: DEL_REL_PROD_SUCCESS, response }
}

export const delRelProdFail = (response) => {
    return { type: DEL_REL_PROD_FAIL, response }
}

export const delRelProdReset = () => {
    return { type: DEL_REL_PROD_RESET }
}