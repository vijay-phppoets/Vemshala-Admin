export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL'
export const DELETE_CATEGORY_RESET = 'DELETE_CATEGORY_RESET'

export const deleteCategory = (params) => {
    return { type: DELETE_CATEGORY, params }
}

export const deleteCategorySuccess = (response) => {
    return { type: DELETE_CATEGORY_SUCCESS, response }
}

export const deleteCategoryFail = (response) => {
    return { type: DELETE_CATEGORY_FAIL, response }
}

export const deleteCategoryReset = () => {
    return { type: DELETE_CATEGORY_RESET }
}