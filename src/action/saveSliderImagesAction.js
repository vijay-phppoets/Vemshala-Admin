export const SAVE_SLIDER_IMAGES = 'SAVE_SLIDER_IMAGES'
export const SAVE_SLIDER_IMAGES_SUCCESS = 'SAVE_SLIDER_IMAGES_SUCCESS'
export const SAVE_SLIDER_IMAGES_FAIL = 'SAVE_SLIDER_IMAGES_FAIL'
export const SAVE_SLIDER_IMAGES_RESET = 'SAVE_SLIDER_IMAGES_RESET'

export const saveSliderImages = (params) => {
    return { type: SAVE_SLIDER_IMAGES, params }
}

export const saveSliderImagesSuccess = (response) => {
    return { type: SAVE_SLIDER_IMAGES_SUCCESS, response }
}

export const saveSliderImagesFail = (response) => {
    return { type: SAVE_SLIDER_IMAGES_FAIL, response }
}

export const saveSliderImagesReset = () => {
    return { type: SAVE_SLIDER_IMAGES_RESET }
}