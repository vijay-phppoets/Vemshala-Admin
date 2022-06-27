export const GET_ATTRIBUTE_LIST = 'GET_ATTRIBUTE_LIST'
export const GET_ATTRIBUTE_LIST_SUCCESS = 'GET_ATTRIBUTE_LIST_SUCCESS'
export const GET_ATTRIBUTE_LIST_FAIL = 'GET_ATTRIBUTE_LIST_FAIL'
export const GET_ATTRIBUTE_LIST_RESET = 'GET_ATTRIBUTE_LIST_RESET'

export const getAttributeList = (params) => {
    return { type: GET_ATTRIBUTE_LIST, params }
}

export const getAttributeListSuccess = (response) => {
    return { type: GET_ATTRIBUTE_LIST_SUCCESS, response }
}

export const getAttributeListFail = (response) => {
    return { type: GET_ATTRIBUTE_LIST_FAIL, response }
}

export const getAttributeListReset = () => {
    return { type: GET_ATTRIBUTE_LIST_RESET }
}