export const ADD_DESCRIPTION = 'ADD_DESCRIPTION'
export const ADD_DESCRIPTION_SUCCESS = 'ADD_DESCRIPTION_SUCCESS'
export const ADD_DESCRIPTION_FAIL = 'ADD_DESCRIPTION_FAIL'
export const ADD_DESCRIPTION_RESET = 'ADD_DESCRIPTION_RESET'

export const addDescription = (params) => {
    return { type: ADD_DESCRIPTION, params }
}

export const addDescriptionSuccess = (response) => {
    return { type: ADD_DESCRIPTION_SUCCESS, response }
}

export const addDescriptionFail = (response) => {
    return { type: ADD_DESCRIPTION_FAIL, response }
}

export const addDescriptionReset = () => {
    return { type: ADD_DESCRIPTION_RESET }
}