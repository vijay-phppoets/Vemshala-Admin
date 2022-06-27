export const GET_CATEGORY_VIEW = 'GET_CATEGORY_VIEW'
export const GET_CATEGORY_VIEW_SUCCESS = 'GET_CATEGORY_VIEW_SUCCESS'
export const GET_CATEGORY_VIEW_FAIL = 'GET_CATEGORY_VIEW_FAIL'
export const GET_CATEGORY_VIEW_RESET = 'GET_CATEGORY_VIEW_RESET'

export const getCategoryView = (params) => {
    return { type: GET_CATEGORY_VIEW, params }
}

export const getCategoryViewSuccess = (response) => {
    return { type: GET_CATEGORY_VIEW_SUCCESS, response }
}

export const getCategoryViewFail = (response) => {
    return { type: GET_CATEGORY_VIEW_FAIL, response }
}

export const getCategoryViewReset = () => {
    return { type: GET_CATEGORY_VIEW_RESET }
}