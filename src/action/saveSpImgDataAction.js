export const SAVE_SP_IMG_DATA = 'SAVE_SP_IMG_DATA'
export const SAVE_SP_IMG_DATA_SUCCESS = 'SAVE_SP_IMG_DATA_SUCCESS'
export const SAVE_SP_IMG_DATA_FAIL = 'SAVE_SP_IMG_DATA_FAIL'
export const SAVE_SP_IMG_DATA_RESET = 'SAVE_SP_IMG_DATA_RESET'

export const saveSpImgData = (params) => {
    return { type: SAVE_SP_IMG_DATA, params }
}

export const saveSpImgDataSuccess = (response) => {
    return { type: SAVE_SP_IMG_DATA_SUCCESS, response }
}

export const saveSpImgDataFail = (response) => {
    return { type: SAVE_SP_IMG_DATA_FAIL, response }
}

export const saveSpImgDataReset = () => {
    return { type: SAVE_SP_IMG_DATA_RESET }
}