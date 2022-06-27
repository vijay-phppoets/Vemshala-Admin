export const ADD_REL_PROD = 'ADD_REL_PROD'
export const ADD_REL_PROD_SUCCESS = 'ADD_REL_PROD_SUCCESS'
export const ADD_REL_PROD_FAIL = 'ADD_REL_PROD_FAIL'
export const ADD_REL_PROD_RESET = 'ADD_REL_PROD_RESET'

export const addRelProd = (params) => {
    return { type: ADD_REL_PROD, params }
}

export const addRelProdSuccess = (response) => {
    return { type: ADD_REL_PROD_SUCCESS, response }
}

export const addRelProdFail = (response) => {
    return { type: ADD_REL_PROD_FAIL, response }
}

export const addRelProdReset = () => {
    return { type: ADD_REL_PROD_RESET }
}