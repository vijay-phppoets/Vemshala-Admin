import React from "react"
import { Menu } from 'antd';
import { Link } from "react-router-dom"

const { SubMenu } = Menu;

const Sidebar = props => {
    return (
        <div>
            <div style={{ padding: "16px 8px", textAlign: "center" }} >
                <h1 style={{ color: "#fff" }} >LOGO</h1>
            </div>
            <Menu mode="inline" theme="dark" >
                <Menu.Item key="category"><Link to="/category/list">Category</Link></Menu.Item>
                <Menu.Item key="products"><Link to="/product/list">Product</Link></Menu.Item>
                <Menu.Item key="settings"><Link to="/setting">Setting</Link></Menu.Item>
                <Menu.Item key="ShippingCharge"><Link to="/shipping_configuration">Shipping Configuration</Link></Menu.Item>
                <Menu.SubMenu title="Home Page" key="Home Page">
                    <Menu.Item key="slider"><Link to="/home/slider">Slider</Link></Menu.Item>
                    <Menu.Item key="testimonial"><Link to="/home/testimonial">Testimonial</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="VoucherList"><Link to="/voucher_management/list">Voucher Management</Link></Menu.Item>
                <Menu.Item key="OrderList"><Link to="/order_management/list">Order Management</Link></Menu.Item>
                <Menu.Item key="CustomerList"><Link to="/customer/list">Customers</Link></Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar