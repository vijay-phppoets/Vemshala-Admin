export const SAVE_TESTIMONIAL = 'SAVE_TESTIMONIAL'
export const SAVE_TESTIMONIAL_SUCCESS = 'SAVE_TESTIMONIAL_SUCCESS'
export const SAVE_TESTIMONIAL_FAIL = 'SAVE_TESTIMONIAL_FAIL'
export const SAVE_TESTIMONIAL_RESET = 'SAVE_TESTIMONIAL_RESET'

export const saveTestimonial = (params) => {
    return { type: SAVE_TESTIMONIAL, params }
}

export const saveTestimonialSuccess = (response) => {
    return { type: SAVE_TESTIMONIAL_SUCCESS, response }
}

export const saveTestimonialFail = (response) => {
    return { type: SAVE_TESTIMONIAL_FAIL, response }
}

export const saveTestimonialReset = () => {
    return { type: SAVE_TESTIMONIAL_RESET }
}