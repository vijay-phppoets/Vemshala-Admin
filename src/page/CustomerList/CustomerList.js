import React, { useEffect, useState } from "react"
import { Button, Table, Space, Badge } from "antd"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { EditOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* actions */
import { getOrderList, getOrderListReset } from "../../action/getOrderListAction"
import { getCustomerList, getCustomerListReset } from "../../action/getCustomerListAction"


const CustomerList = props => {
    /* variables */
    const {
        getOrderList, getOrderListReset, getOrderListState,
        getCustomerList, getCustomerListReset, getCustomerListState,
    } = props
    const [tableData, setTableData] = useState([])
    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email => <span>{email}</span>
        },
        {
            title: 'Register Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => {
                var date = new Date(created_at);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();

                var formattedDate = month + "/" + day + "/" + year;
                return (
                    <span>{formattedDate}</span>
                )
            }
        },
    ];

    /* callbacks */
    useEffect(() => {
        getCustomerList()
    }, [])

    useEffect(() => {
        console.log("hello", getCustomerListState.list);
        if (getCustomerListState.apiState === "success") {
            let tableData = []
            getCustomerListState.list.map(row => {
                tableData.push({
                    key: row.id,
                    name: row.name,
                    email: row.email,
                    created_at: row.created_at,
                    id: row.id,
                })
            })
            setTableData(tableData)
        }
    }, [getCustomerListState])


    return (
        <>
            <Header
                title="Customer List"
            />
            <PageContainer list >
                <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
            </PageContainer>
        </>
    )
}
const mapStateToProps = (state) => ({
    getOrderListState: state.getOrderList,
    getCustomerListState: state.getCustomerList,
})

const mapDispatchToProps = (dispatch) => ({
    getOrderList: (params) => dispatch(getOrderList(params)),
    getOrderListReset: () => dispatch(getOrderListReset()),
    getCustomerList: (params) => dispatch(getCustomerList(params)),
    getCustomerListReset: () => dispatch(getCustomerListReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)