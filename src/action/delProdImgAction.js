export const DEL_PROD_IMG = 'DEL_PROD_IMG'
export const DEL_PROD_IMG_SUCCESS = 'DEL_PROD_IMG_SUCCESS'
export const DEL_PROD_IMG_FAIL = 'DEL_PROD_IMG_FAIL'
export const DEL_PROD_IMG_RESET = 'DEL_PROD_IMG_RESET'

export const delProdImg = (params) => {
    return { type: DEL_PROD_IMG, params }
}

export const delProdImgSuccess = (response) => {
    return { type: DEL_PROD_IMG_SUCCESS, response }
}

export const delProdImgFail = (response) => {
    return { type: DEL_PROD_IMG_FAIL, response }
}

export const delProdImgReset = () => {
    return { type: DEL_PROD_IMG_RESET }
}