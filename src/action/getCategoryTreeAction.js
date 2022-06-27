export const GET_CATEGORY_TREE = 'GET_CATEGORY_TREE'
export const GET_CATEGORY_TREE_SUCCESS = 'GET_CATEGORY_TREE_SUCCESS'
export const GET_CATEGORY_TREE_FAIL = 'GET_CATEGORY_TREE_FAIL'
export const GET_CATEGORY_TREE_RESET = 'GET_CATEGORY_TREE_RESET'

export const getCategoryTree = (params) => {
    return { type: GET_CATEGORY_TREE, params }
}

export const getCategoryTreeSuccess = (response) => {
    return { type: GET_CATEGORY_TREE_SUCCESS, response }
}

export const getCategoryTreeFail = (response) => {
    return { type: GET_CATEGORY_TREE_FAIL, response }
}

export const getCategoryTreeReset = () => {
    return { type: GET_CATEGORY_TREE_RESET }
}