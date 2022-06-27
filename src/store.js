import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'

// sagas
import loginSaga from './saga/loginSaga'
import getCategoryTreeSaga from './saga/getCategoryTreeSaga'
import createCategorySaga from './saga/createCategorySaga'
import getCategoryViewSaga from './saga/getCategoryViewSaga'
import updateCategorySaga from './saga/updateCategorySaga'
import deleteCategorySaga from './saga/deleteCategorySaga'
import createProductSaga from './saga/createProductSaga'
import getProductListSaga from './saga/getProductListSaga'
import getProductViewSaga from './saga/getProductViewSaga'
import updateProductSaga from './saga/updateProductSaga'
import getAttributeListSaga from './saga/getAttributeListSaga'
import saveAttributeForVariantsSaga from './saga/saveAttributeForVariantsSaga'
import createProductVariantSaga from './saga/createProductVariantSaga'
import getProductVariantListSaga from './saga/getProductVariantListSaga'
import saveSpProdDataSaga from './saga/saveSpProdDataSaga'
import saveSpImgDataSaga from './saga/saveSpImgDataSaga'
import saveProdImgSaga from './saga/saveProdImgSaga'
import delProdImgSaga from './saga/delProdImgSaga'
import markImgThumbSaga from './saga/markImgThumbSaga'
import delProdVarSaga from './saga/delProdVarSaga'
import saveSliderImagesSaga from './saga/saveSliderImagesSaga'
import getSliderListSaga from './saga/getSliderListSaga'
import delSliderSaga from './saga/delSliderSaga'
import saveTestimonialSaga from './saga/saveTestimonialSaga'
import getTestimonialListSaga from './saga/getTestimonialListSaga'
import delTestimonialSaga from './saga/delTestimonialSaga'
import addDescriptionSaga from './saga/addDescriptionSaga'
import listDescriptionSaga from './saga/listDescriptionSaga'
import getDescriptionViewSaga from './saga/getDescriptionViewSaga'
import updateDescriptionSaga from './saga/updateDescriptionSaga'
import addRelProdSaga from './saga/addRelProdSaga'
import listRelProdSaga from './saga/listRelProdSaga'
import delRelProdSaga from './saga/delRelProdSaga'
import updateSettingSaga from './saga/updateSettingSaga'
import getSettingSaga from './saga/getSettingSaga'
import updateShippingSaga from './saga/updateShippingSaga'
import getVoucherListSaga from './saga/getVoucherListSaga'
import createVoucherSaga from './saga/createVoucherSaga'
import getVoucherViewSaga from './saga/getVoucherViewSaga'
import updateVoucherSaga from './saga/updateVoucherSaga'
import getOrderListSaga from './saga/getOrderListSaga'
import getCustomerListSaga from './saga/getCustomerListSaga'
import getOrderDetailsSaga from './saga/getOrderDetailsSaga'
import updateOrderSaga from './saga/updateOrderSaga'



// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

// then run the saga
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(getCategoryTreeSaga)
sagaMiddleware.run(createCategorySaga)
sagaMiddleware.run(getCategoryViewSaga)
sagaMiddleware.run(updateCategorySaga)
sagaMiddleware.run(deleteCategorySaga)
sagaMiddleware.run(createProductSaga)
sagaMiddleware.run(getProductListSaga)
sagaMiddleware.run(getProductViewSaga)
sagaMiddleware.run(updateProductSaga)
sagaMiddleware.run(getAttributeListSaga)
sagaMiddleware.run(saveAttributeForVariantsSaga)
sagaMiddleware.run(createProductVariantSaga)
sagaMiddleware.run(getProductVariantListSaga)
sagaMiddleware.run(saveSpProdDataSaga)
sagaMiddleware.run(saveSpImgDataSaga)
sagaMiddleware.run(saveProdImgSaga)
sagaMiddleware.run(delProdImgSaga)
sagaMiddleware.run(markImgThumbSaga)
sagaMiddleware.run(delProdVarSaga)
sagaMiddleware.run(saveSliderImagesSaga)
sagaMiddleware.run(getSliderListSaga)
sagaMiddleware.run(delSliderSaga)
sagaMiddleware.run(saveTestimonialSaga)
sagaMiddleware.run(getTestimonialListSaga)
sagaMiddleware.run(delTestimonialSaga)
sagaMiddleware.run(addDescriptionSaga)
sagaMiddleware.run(listDescriptionSaga)
sagaMiddleware.run(getDescriptionViewSaga)
sagaMiddleware.run(updateDescriptionSaga)
sagaMiddleware.run(addRelProdSaga)
sagaMiddleware.run(listRelProdSaga)
sagaMiddleware.run(delRelProdSaga)
sagaMiddleware.run(updateSettingSaga)
sagaMiddleware.run(getSettingSaga)
sagaMiddleware.run(updateShippingSaga)
sagaMiddleware.run(getVoucherListSaga)
sagaMiddleware.run(createVoucherSaga)
sagaMiddleware.run(getVoucherViewSaga)
sagaMiddleware.run(updateVoucherSaga)
sagaMiddleware.run(getOrderListSaga)
sagaMiddleware.run(getCustomerListSaga)
sagaMiddleware.run(getOrderDetailsSaga)
sagaMiddleware.run(updateOrderSaga)



// render the application
export default store