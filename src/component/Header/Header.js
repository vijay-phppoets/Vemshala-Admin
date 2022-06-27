import React from "react"
import { Avatar, Popover, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"

const Header = props => {
    return (
        <div style={{
            height: 50, background: "#fff", padding: "4px 8px", display: "flex", alignItems: "center",
            justifyContent: "space-between", borderBottom: "solid 1px #ccc", position: "sticky", top: 0,
            zIndex: 5
        }} >
            <div>
                <h1 style={{ margin: 0 }} >{props.title}</h1>
            </div>
            <Space>
                {props.actionBtn}
                <Popover placement="bottomLeft" title={null} content={
                    <Link to="/logout"><Button type="dashed" >Log Out</Button></Link>
                } trigger="click">
                    <a><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></a>
                </Popover>
            </Space>
        </div>
    )
}

export default Header