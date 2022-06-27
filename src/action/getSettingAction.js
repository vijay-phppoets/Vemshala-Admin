export const GET_SETTING = 'GET_SETTING'
export const GET_SETTING_SUCCESS = 'GET_SETTING_SUCCESS'
export const GET_SETTING_FAIL = 'GET_SETTING_FAIL'
export const GET_SETTING_RESET = 'GET_SETTING_RESET'

export const getSetting = (params) => {
    return { type: GET_SETTING, params }
}

export const getSettingSuccess = (response) => {
    return { type: GET_SETTING_SUCCESS, response }
}

export const getSettingFail = (response) => {
    return { type: GET_SETTING_FAIL, response }
}

export const getSettingReset = () => {
    return { type: GET_SETTING_RESET }
}