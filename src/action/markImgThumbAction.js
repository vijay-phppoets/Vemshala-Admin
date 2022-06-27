export const MARK_IMG_THUMB = 'MARK_IMG_THUMB'
export const MARK_IMG_THUMB_SUCCESS = 'MARK_IMG_THUMB_SUCCESS'
export const MARK_IMG_THUMB_FAIL = 'MARK_IMG_THUMB_FAIL'
export const MARK_IMG_THUMB_RESET = 'MARK_IMG_THUMB_RESET'

export const markImgThumb = (params) => {
    return { type: MARK_IMG_THUMB, params }
}

export const markImgThumbSuccess = (response) => {
    return { type: MARK_IMG_THUMB_SUCCESS, response }
}

export const markImgThumbFail = (response) => {
    return { type: MARK_IMG_THUMB_FAIL, response }
}

export const markImgThumbReset = () => {
    return { type: MARK_IMG_THUMB_RESET }
}