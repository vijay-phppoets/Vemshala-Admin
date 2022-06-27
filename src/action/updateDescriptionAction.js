export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_DESCRIPTION_SUCCESS = 'UPDATE_DESCRIPTION_SUCCESS'
export const UPDATE_DESCRIPTION_FAIL = 'UPDATE_DESCRIPTION_FAIL'
export const UPDATE_DESCRIPTION_RESET = 'UPDATE_DESCRIPTION_RESET'

export const updateDescription = (params) => {
    return { type: UPDATE_DESCRIPTION, params }
}

export const updateDescriptionSuccess = (response) => {
    return { type: UPDATE_DESCRIPTION_SUCCESS, response }
}

export const updateDescriptionFail = (response) => {
    return { type: UPDATE_DESCRIPTION_FAIL, response }
}

export const updateDescriptionReset = () => {
    return { type: UPDATE_DESCRIPTION_RESET }
}