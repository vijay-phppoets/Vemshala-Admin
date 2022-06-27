export const DEL_SLIDER = 'DEL_SLIDER'
export const DEL_SLIDER_SUCCESS = 'DEL_SLIDER_SUCCESS'
export const DEL_SLIDER_FAIL = 'DEL_SLIDER_FAIL'
export const DEL_SLIDER_RESET = 'DEL_SLIDER_RESET'

export const delSlider = (params) => {
    return { type: DEL_SLIDER, params }
}

export const delSliderSuccess = (response) => {
    return { type: DEL_SLIDER_SUCCESS, response }
}

export const delSliderFail = (response) => {
    return { type: DEL_SLIDER_FAIL, response }
}

export const delSliderReset = () => {
    return { type: DEL_SLIDER_RESET }
}