export const LIST_REL_PROD = 'LIST_REL_PROD'
export const LIST_REL_PROD_SUCCESS = 'LIST_REL_PROD_SUCCESS'
export const LIST_REL_PROD_FAIL = 'LIST_REL_PROD_FAIL'
export const LIST_REL_PROD_RESET = 'LIST_REL_PROD_RESET'

export const listRelProd = (params) => {
    return { type: LIST_REL_PROD, params }
}

export const listRelProdSuccess = (response) => {
    return { type: LIST_REL_PROD_SUCCESS, response }
}

export const listRelProdFail = (response) => {
    return { type: LIST_REL_PROD_FAIL, response }
}

export const listRelProdReset = () => {
    return { type: LIST_REL_PROD_RESET }
}