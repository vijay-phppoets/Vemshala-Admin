export const UPDATE_SETTING = 'UPDATE_SETTING'
export const UPDATE_SETTING_SUCCESS = 'UPDATE_SETTING_SUCCESS'
export const UPDATE_SETTING_FAIL = 'UPDATE_SETTING_FAIL'
export const UPDATE_SETTING_RESET = 'SAVE_TESTIMONIAL_RESET'

export const updateSetting = (params) => {
    return { type: UPDATE_SETTING, params }
}

export const updateSettingSuccess = (response) => {
    return { type: UPDATE_SETTING_SUCCESS, response }
}

export const updateSettingFail = (response) => {
    return { type: UPDATE_SETTING_FAIL, response }
}

export const updateSettingReset = () => {
    return { type: UPDATE_SETTING_RESET }
}