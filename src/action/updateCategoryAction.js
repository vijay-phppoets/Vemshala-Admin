export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS'
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL'
export const UPDATE_CATEGORY_RESET = 'UPDATE_CATEGORY_RESET'

export const updateCategory = (params) => {
    return { type: UPDATE_CATEGORY, params }
}

export const updateCategorySuccess = (response) => {
    return { type: UPDATE_CATEGORY_SUCCESS, response }
}

export const updateCategoryFail = (response) => {
    return { type: UPDATE_CATEGORY_FAIL, response }
}

export const updateCategoryReset = () => {
    return { type: UPDATE_CATEGORY_RESET }
}