export const GET_DESCRIPTION_VIEW = 'GET_DESCRIPTION_VIEW'
export const GET_DESCRIPTION_VIEW_SUCCESS = 'GET_DESCRIPTION_VIEW_SUCCESS'
export const GET_DESCRIPTION_VIEW_FAIL = 'GET_DESCRIPTION_VIEW_FAIL'
export const GET_DESCRIPTION_VIEW_RESET = 'GET_DESCRIPTION_VIEW_RESET'

export const getDescriptionView = (params) => {
    return { type: GET_DESCRIPTION_VIEW, params }
}

export const getDescriptionViewSuccess = (response) => {
    return { type: GET_DESCRIPTION_VIEW_SUCCESS, response }
}

export const getDescriptionViewFail = (response) => {
    return { type: GET_DESCRIPTION_VIEW_FAIL, response }
}

export const getDescriptionViewReset = () => {
    return { type: GET_DESCRIPTION_VIEW_RESET }
}