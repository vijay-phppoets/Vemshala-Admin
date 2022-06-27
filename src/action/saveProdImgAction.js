export const SAVE_PROD_IMG = 'SAVE_PROD_IMG'
export const SAVE_PROD_IMG_SUCCESS = 'SAVE_PROD_IMG_SUCCESS'
export const SAVE_PROD_IMG_FAIL = 'SAVE_PROD_IMG_FAIL'
export const SAVE_PROD_IMG_RESET = 'SAVE_PROD_IMG_RESET'

export const saveProdImg = (params) => {
    return { type: SAVE_PROD_IMG, params }
}

export const saveProdImgSuccess = (response) => {
    return { type: SAVE_PROD_IMG_SUCCESS, response }
}

export const saveProdImgFail = (response) => {
    return { type: SAVE_PROD_IMG_FAIL, response }
}

export const saveProdImgReset = () => {
    return { type: SAVE_PROD_IMG_RESET }
}