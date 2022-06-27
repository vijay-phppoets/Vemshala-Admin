export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS'
export const CREATE_CATEGORY_FAIL = 'CREATE_CATEGORY_FAIL'
export const CREATE_CATEGORY_RESET = 'CREATE_CATEGORY_RESET'

export const createCategory = (params) => {
    return { type: CREATE_CATEGORY, params }
}

export const createCategorySuccess = (response) => {
    return { type: CREATE_CATEGORY_SUCCESS, response }
}

export const createCategoryFail = (response) => {
    return { type: CREATE_CATEGORY_FAIL, response }
}

export const createCategoryReset = () => {
    return { type: CREATE_CATEGORY_RESET }
}