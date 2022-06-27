export const SAVE_ATTRIBUTE_FOR_VARIANTS = 'SAVE_ATTRIBUTE_FOR_VARIANTS'
export const SAVE_ATTRIBUTE_FOR_VARIANTS_SUCCESS = 'SAVE_ATTRIBUTE_FOR_VARIANTS_SUCCESS'
export const SAVE_ATTRIBUTE_FOR_VARIANTS_FAIL = 'SAVE_ATTRIBUTE_FOR_VARIANTS_FAIL'
export const SAVE_ATTRIBUTE_FOR_VARIANTS_RESET = 'SAVE_ATTRIBUTE_FOR_VARIANTS_RESET'

export const saveAttributeForVariants = (params) => {
    return { type: SAVE_ATTRIBUTE_FOR_VARIANTS, params }
}

export const saveAttributeForVariantsSuccess = (response) => {
    return { type: SAVE_ATTRIBUTE_FOR_VARIANTS_SUCCESS, response }
}

export const saveAttributeForVariantsFail = (response) => {
    return { type: SAVE_ATTRIBUTE_FOR_VARIANTS_FAIL, response }
}

export const saveAttributeForVariantsReset = () => {
    return { type: SAVE_ATTRIBUTE_FOR_VARIANTS_RESET }
}