export const DEL_TESTIMONIAL = 'DEL_TESTIMONIAL'
export const DEL_TESTIMONIAL_SUCCESS = 'DEL_TESTIMONIAL_SUCCESS'
export const DEL_TESTIMONIAL_FAIL = 'DEL_TESTIMONIAL_FAIL'
export const DEL_TESTIMONIAL_RESET = 'DEL_TESTIMONIAL_RESET'

export const delTestimonial = (params) => {
    return { type: DEL_TESTIMONIAL, params }
}

export const delTestimonialSuccess = (response) => {
    return { type: DEL_TESTIMONIAL_SUCCESS, response }
}

export const delTestimonialFail = (response) => {
    return { type: DEL_TESTIMONIAL_FAIL, response }
}

export const delTestimonialReset = () => {
    return { type: DEL_TESTIMONIAL_RESET }
}