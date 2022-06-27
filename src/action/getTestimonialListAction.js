export const GET_TESTIMONIAL_LIST = 'GET_TESTIMONIAL_LIST'
export const GET_TESTIMONIAL_LIST_SUCCESS = 'GET_TESTIMONIAL_LIST_SUCCESS'
export const GET_TESTIMONIAL_LIST_FAIL = 'GET_TESTIMONIAL_LIST_FAIL'
export const GET_TESTIMONIAL_LIST_RESET = 'GET_TESTIMONIAL_LIST_RESET'

export const getTestimonialList = (params) => {
    return { type: GET_TESTIMONIAL_LIST, params }
}

export const getTestimonialListSuccess = (response) => {
    return { type: GET_TESTIMONIAL_LIST_SUCCESS, response }
}

export const getTestimonialListFail = (response) => {
    return { type: GET_TESTIMONIAL_LIST_FAIL, response }
}

export const getTestimonialListReset = () => {
    return { type: GET_TESTIMONIAL_LIST_RESET }
}