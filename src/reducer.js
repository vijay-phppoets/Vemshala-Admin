import { combineReducers } from 'redux'

import login from './reducer/loginReducer'
import getCategoryTree from './reducer/getCategoryTreeReducer'
import createCategory from './reducer/createCategoryReducer'
import getCategoryView from './reducer/getCategoryViewReducer'
import updateCategory from './reducer/updateCategoryReducer'
import deleteCategory from './reducer/deleteCategoryReducer'
import createProduct from './reducer/createProductReducer'
import getProductList from './reducer/getProductListReducer'
import getProductView from './reducer/getProductViewReducer'
import updateProduct from './reducer/updateProductReducer'
import getAttributeList from './reducer/getAttributeListReducer'
import saveAttributeForVariants from './reducer/saveAttributeForVariantsReducer'
import createProductVariant from './reducer/createProductVariantReducer'
import getProductVariantList from './reducer/getProductVariantListReducer'
import saveSpProdData from './reducer/saveSpProdDataReducer'
import saveSpImgData from './reducer/saveSpImgDataReducer'
import saveProdImg from './reducer/saveProdImgReducer'
import delProdImg from './reducer/delProdImgReducer'
import markImgThumb from './reducer/markImgThumbReducer'
import delProdVar from './reducer/delProdVarReducer'
import saveSliderImages from './reducer/saveSliderImagesReducer'
import getSliderList from './reducer/getSliderListReducer'
import delSlider from './reducer/delSliderReducer'
import saveTestimonial from './reducer/saveTestimonialReducer'
import getTestimonialList from './reducer/getTestimonialListReducer'
import delTestimonial from './reducer/delTestimonialReducer'
import addDescription from './reducer/addDescriptionReducer'
import listDescription from './reducer/listDescriptionReducer'
import getDescriptionView from './reducer/getDescriptionViewReducer'
import updateDescription from './reducer/updateDescriptionReducer'
import addRelProd from './reducer/addRelProdReducer'
import listRelProd from './reducer/listRelProdReducer'
import delRelProd from './reducer/delRelProdReducer'
import updateSetting from './reducer/updateSettingReducer'
import getSetting from './reducer/getSettingReducer'
import updateShipping from './reducer/updateShippingReducer'
import getVoucherList from './reducer/getVoucherListReducer'
import createVoucher from './reducer/createVoucherReducer'
import getVoucherView from './reducer/getVoucherViewReducer'
import updateVoucher from './reducer/updateVoucherReducer'
import getOrderList from './reducer/getOrderListReducer'
import getCustomerList from './reducer/getCustomerListReducer'
import getOrderDetails from './reducer/getOrderDetailsReducer'
import updateOrder from './reducer/updateOrderReducer'


export default combineReducers({
    login,
    getCategoryTree,
    createCategory,
    getCategoryView,
    updateCategory,
    deleteCategory,
    createProduct,
    getProductList,
    getProductView,
    updateProduct,
    getAttributeList,
    saveAttributeForVariants,
    createProductVariant,
    getProductVariantList,
    saveSpProdData,
    saveSpImgData,
    saveProdImg,
    delProdImg,
    markImgThumb,
    delProdVar,
    saveSliderImages,
    getSliderList,
    delSlider,
    saveTestimonial,
    getTestimonialList,
    delTestimonial,
    addDescription,
    listDescription,
    getDescriptionView,
    updateDescription,
    addRelProd,
    listRelProd,
    delRelProd,
    updateSetting,
    getSetting,
    updateShipping,
    getVoucherList,
    createVoucher,
    getVoucherView,
    updateVoucher,
    getOrderList,
    getCustomerList,
    getOrderDetails,
    updateOrder,
})