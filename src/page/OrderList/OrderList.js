import React, { useEffect, useState } from "react"
import { Button, Table, Space, Tag } from "antd"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { CopyOutlined, EditOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import { Indicator } from "./OrderListStyle"

/* actions */
import { getOrderList, getOrderListReset } from "../../action/getOrderListAction"


const OrderList = props => {
    /* variables */
    const { getOrderList, getOrderListReset, getOrderListState } = props
    const [tableData, setTableData] = useState([])
    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        // {
        //     title: 'Email',
        //     dataIndex: 's_email',
        //     key: 's_email',
        //     render: s_email => <span>{s_email}</span>
        // },
        {
            title: 'Phone',
            dataIndex: 's_phone',
            key: 's_phone',
            render: s_phone => <span>{s_phone}</span>
        },
        {
            title: 'Order No',
            dataIndex: 'order_no',
            key: 'order_no',
            render: order_no => <span>{order_no}</span>
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            key: 'order_date',
            render: (order_date) => {
                var date = new Date(order_date);
                var month = date.getMonth() +1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();

                var formattedDate = month + "/" + day + "/" + year;
                return (
                    <span>{formattedDate}</span>
                )
            }
        },
        {
            title: 'Total Amount',
            dataIndex: 'total',
            key: 'total',
            render: (obj) => <span>{obj.payment_type == "USD" ? <>$</> : <>₹</>}{obj.total}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                if (status == "processing")
                    return (<Tag color="#e39f19">{status.toUpperCase()}</Tag>)

                if (status == "shipped")
                    return (<Tag color="#1973e3">{status.toUpperCase()}</Tag>)

                if (status == "delivered")
                    return (<Tag color="#87d068">{status.toUpperCase()}</Tag>)

                if (status == "cancelled")
                    return (<Tag color="#d93a3a">{status.toUpperCase()}</Tag>)
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <>
                    <Link to={`/order/${id}/details`}><Button size="small" icon={<CopyOutlined />} /></Link> &nbsp;
                    <Link to={`/order/${id}/update`}><Button size="small" icon={<EditOutlined />} /></Link>

                </>
            )
        },
    ];

    /* callbacks */
    useEffect(() => {
        getOrderList()
    }, [])

    useEffect(() => {
        if (getOrderListState.apiState === "success") {
            let tableData = []
            getOrderListState.list.map(row => {
                tableData.push({
                    key: row.id,
                    customer_name: row.s_fname + ' ' + row.s_lname,
                    s_email: row.s_email,
                    s_phone: row.s_phone,
                    order_no: row.order_no,
                    order_date: row.order_date,
                    total: { "total": row.total, "payment_type": row.payment_type, },
                    status: row.status,
                    id: row.id,
                })
            })
            setTableData(tableData)
        }
    }, [getOrderListState])


    return (
        <>
            <Header
                title="Order List"
            />
            <PageContainer list >
                <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getOrderListState: state.getOrderList,
})

const mapDispatchToProps = (dispatch) => ({
    getOrderList: (params) => dispatch(getOrderList(params)),
    getOrderListReset: () => dispatch(getOrderListReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)