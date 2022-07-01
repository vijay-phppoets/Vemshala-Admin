import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "antd/dist/antd.less"
import { ThemeProvider } from 'styled-components'
import { Provider } from "react-redux"

import store from "./store"

import { Layout } from 'antd';

import Sidebar from "./component/Sidebar/Sidebar"
import PrivateRoute from "./component/PrivateRoute";

import Home from "./page/Home/Home"
import CategoryAdd from "./page/CategoryAdd/CategoryAdd"
import CategoryList from "./page/CategoryList/CategoryList"
import CategoryEdit from "./page/CategoryEdit/CategoryEdit"
import ProductList from "./page/ProductList/ProductList"
import ProductAdd from "./page/ProductAdd/ProductAdd"
import ProductEdit from "./page/ProductEdit/ProductEdit"
import ProductVariants from "./page/ProductVariants/ProductVariants"
import ProductImages from "./page/ProductImages/ProductImages"
import ProductDescription from "./page/ProductDescription/ProductDescription"
import ProductDescriptionEdit from "./page/ProductDescriptionEdit/ProductDescriptionEdit"
import RelatedProducts from "./page/RelatedProducts/RelatedProducts"
import HomeSlider from "./page/HomeSlider/HomeSlider"
import Testimonial from "./page/Testimonial/Testimonial"
import NotFound from "./page/NotFound/NotFound"
import Login from "./page/Login/Login"
import Logout from "./page/Logout"
import setting from "./page/Setting/setting"
import ShippingCharge from "./page/ShippingCharge/ShippingCharge"
import VoucherList from "./page/VoucherList/VoucherList"
import VoucherAdd from "./page/VoucherAdd/VoucherAdd"
import VoucherEdit from "./page/VoucherEdit/VoucherEdit"
import OrderList from "./page/OrderList/OrderList"
import CustomerList from "./page/CustomerList/CustomerList"
import OrderDetails from "./page/OrderDetails/OrderDetails"
import OrderUpdate from "./page/OrderUpdate/OrderUpdate"


// @masters -----------------------------------------------------------

    import CouponsList from "./page/Masters/Coupons/CouponsList"
    import CouponsAdd  from "./page/Masters/Coupons/CouponsAdd"
    import CouponsEdit from "./page/Masters/Coupons/CouponsEdit"

// --------------------------------------------------------------------

// others
import theme from './theme'


const { Header, Footer, Sider, Content } = Layout;

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path={[
                            '/',
                            '/master/coupons',
                            '/master/coupons/add',
                            '/master/coupons/edit',
                            '/category/list',
                            '/category/add',
                            '/category/:category_id/edit',
                            '/product/list',
                            '/product/add',
                            '/product/:product_id/edit',
                            '/product/:product_id/edit/variants',
                            '/product/:product_id/edit/images',
                            '/product/:product_id/edit/description',
                            '/product/:product_id/edit/description/:description_id',
                            '/product/:product_id/edit/related-products',
                            '/home/slider',
                            '/home/testimonial',
                            '/setting',
                            '/shipping_configuration',
                            '/voucher_management/list',
                            '/voucher_management/add',
                            '/voucher_management/:voucher_id/edit',
                            '/order_management/list',
                            '/customer/list',
                            '/order/:order_id/details',
                            '/order/:order_id/update',


                        ]} exact >

                            <Layout>
                                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, }} >
                                    <Sidebar />
                                </Sider>
                                <Layout className="site-layout" style={{ marginLeft: '250px' }}>
                                    <Content style={{ overflow: 'initial', background: "#fff" }}>
                                        <Switch>
                                            <PrivateRoute exact path="/" component={Home} />

                                            <PrivateRoute exact path="/master/coupons"      component={CouponsList} />
                                            <PrivateRoute exact path="/master/coupons/add"  component={CouponsAdd} />
                                            <PrivateRoute exact path="/master/coupons/edit" component={CouponsEdit} />

                                            
                                            <PrivateRoute exact path="/category/list" component={CategoryList} />
                                            <PrivateRoute exact path="/category/add" component={CategoryAdd} />
                                            <PrivateRoute exact path="/category/:category_id/edit" component={CategoryEdit} />
                                            <PrivateRoute exact path="/product/list" component={ProductList} />
                                            <PrivateRoute exact path="/product/add" component={ProductAdd} />
                                            <PrivateRoute exact path="/product/:product_id/edit" component={ProductEdit} />
                                            <PrivateRoute exact path="/product/:product_id/edit/variants" component={ProductVariants} />
                                            <PrivateRoute exact path="/product/:product_id/edit/images" component={ProductImages} />
                                            <PrivateRoute exact path="/product/:product_id/edit/description" component={ProductDescription} />
                                            <PrivateRoute exact path="/product/:product_id/edit/description/:description_id" component={ProductDescriptionEdit} />
                                            <PrivateRoute exact path="/product/:product_id/edit/related-products" component={RelatedProducts} />
                                            <PrivateRoute exact path="/home/slider" component={HomeSlider} />
                                            <PrivateRoute exact path="/home/testimonial" component={Testimonial} />
                                            <PrivateRoute exact path="/setting" component={setting} />
                                            <PrivateRoute exact path="/shipping_configuration" component={ShippingCharge} />
                                            <PrivateRoute exact path="/voucher_management/list" component={VoucherList} />
                                            <PrivateRoute exact path="/voucher_management/add" component={VoucherAdd} />
                                            <PrivateRoute exact path="/voucher_management/:voucher_id/edit" component={VoucherEdit} />
                                            <PrivateRoute exact path="/order_management/list" component={OrderList} />
                                            <PrivateRoute exact path="/customer/list" component={CustomerList} />
                                            <PrivateRoute exact path="/order/:order_id/details" component={OrderDetails} />
                                            <PrivateRoute exact path="/order/:order_id/update" component={OrderUpdate} />

                                        </Switch>
                                    </Content>
                                </Layout>
                            </Layout>
                        </Route>

                        <Route path={['/login', '/logout']} exact >
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/logout" component={Logout} />
                            </Switch>
                        </Route>

                        <Route path="*" component={NotFound} status={404} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider>
    )
}

export default App