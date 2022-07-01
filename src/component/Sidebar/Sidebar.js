import React from "react"
import styled from "styled-components";

// @import-components ---------------------------------------------------------------------------------------------------------
 
    import { Menu } from 'antd';
    import Logo from '../../icons/logo.jpg'
    import { Link } from "react-router-dom"

// ----------------------------------------------------------------------------------------------------------------------------

const Sidebar = props => {
    return (
        <div>
            <div style={{ padding: "16px 8px", textAlign: "center", backgroundColor: '#5b0c1c' }} >
                <img src={Logo} alt="..." style={{ width:'100px' }}></img>
            </div>
            <Menu mode="inline" theme="dark" >
                <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
                <Menu.SubMenu title="Masters" key="Masters">
                    <Menu.Item key="coupons"><Link to="/master/coupons">Coupons</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="Home Page" key="Home Page">
                    <Menu.Item key="slider"><Link to="/home/slider">Slider</Link></Menu.Item>
                    <Menu.Item key="testimonial"><Link to="/home/testimonial">Testimonial</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="category"><Link to="/category/list">Category</Link></Menu.Item>
                <Menu.Item key="products"><Link to="/product/list">Product</Link></Menu.Item>
                <Menu.Item key="settings"><Link to="/setting">Setting</Link></Menu.Item>
                <Menu.Item key="ShippingCharge"><Link to="/shipping_configuration">Shipping Configuration</Link></Menu.Item>
                <Menu.Item key="VoucherList"><Link to="/voucher_management/list">Voucher Management</Link></Menu.Item>
                <Menu.Item key="OrderList"><Link to="/order_management/list">Order Management</Link></Menu.Item>
                <Menu.Item key="CustomerList"><Link to="/customer/list">Customers</Link></Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar