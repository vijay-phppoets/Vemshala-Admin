import React, { useEffect, useState } from "react"
import { Button, Table, Space, Badge } from "antd"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { EditOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import { Indicator } from "./ProductListStyle"

/* actions */
import { getProductList, getProductListReset } from "../../action/getProductListAction"


const ProductList = props => {
    /* variables */
    const { getProductList, getProductListReset, getProductListState } = props
    const [tableData, setTableData] = useState([])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: type => <span style={{ textTransform: "capitalize" }} >{type}</span>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (obj) => (
                <Space>
                    {obj.is_sale_price === "yes" ?
                        <>
                            <span style={{ textDecoration: "line-through", color: "#00000099" }} >₹{obj.price}</span>
                            <span>₹{obj.sale_price}</span>
                        </>
                        : <span>₹{obj.price}</span>
                    }

                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => status === "enabled" ? <Indicator green /> : <Indicator red />
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Link to={`/product/${id}/edit`}><Button size="small" icon={<EditOutlined />} /></Link>
            )
        },
    ];

    /* callbacks */
    useEffect(() => {
        getProductList()
    }, [])

    useEffect(() => {
        if (getProductListState.apiState === "success") {
            let tableData = []
            getProductListState.list.map(row => {
                tableData.push({
                    key: row.id,
                    name: row.name,
                    type: row.type,
                    price: { price: row.price, is_sale_price: row.is_sale_price, sale_price: row.sale_price },
                    status: row.status,
                    id: row.id,
                })
            })
            setTableData(tableData)
        }
    }, [getProductListState])


    return (
        <>
            <Header
                title="Product List"
                actionBtn={<Link to='/product/add'><Button >New</Button></Link>}
            />
            <PageContainer list >
                <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getProductListState: state.getProductList,
})

const mapDispatchToProps = (dispatch) => ({
    getProductList: (params) => dispatch(getProductList(params)),
    getProductListReset: () => dispatch(getProductListReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)