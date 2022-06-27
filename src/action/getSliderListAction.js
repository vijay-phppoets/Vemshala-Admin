export const GET_SLIDER_LIST = 'GET_SLIDER_LIST'
export const GET_SLIDER_LIST_SUCCESS = 'GET_SLIDER_LIST_SUCCESS'
export const GET_SLIDER_LIST_FAIL = 'GET_SLIDER_LIST_FAIL'
export const GET_SLIDER_LIST_RESET = 'GET_SLIDER_LIST_RESET'

export const getSliderList = (params) => {
    return { type: GET_SLIDER_LIST, params }
}

export const getSliderListSuccess = (response) => {
    return { type: GET_SLIDER_LIST_SUCCESS, response }
}

export const getSliderListFail = (response) => {
    return { type: GET_SLIDER_LIST_FAIL, response }
}

export const getSliderListReset = () => {
    return { type: GET_SLIDER_LIST_RESET }
}