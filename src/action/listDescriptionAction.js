export const LIST_DESCRIPTION = 'LIST_DESCRIPTION'
export const LIST_DESCRIPTION_SUCCESS = 'LIST_DESCRIPTION_SUCCESS'
export const LIST_DESCRIPTION_FAIL = 'LIST_DESCRIPTION_FAIL'
export const LIST_DESCRIPTION_RESET = 'LIST_DESCRIPTION_RESET'

export const listDescription = (params) => {
    return { type: LIST_DESCRIPTION, params }
}

export const listDescriptionSuccess = (response) => {
    return { type: LIST_DESCRIPTION_SUCCESS, response }
}

export const listDescriptionFail = (response) => {
    return { type: LIST_DESCRIPTION_FAIL, response }
}

export const listDescriptionReset = () => {
    return { type: LIST_DESCRIPTION_RESET }
}