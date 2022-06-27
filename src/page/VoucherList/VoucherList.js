import React, { useEffect, useState } from "react"
import { Button, Table, Space, Badge } from "antd"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { EditOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import { Indicator } from "./VoucherListStyle"

/* actions */
import { getVoucherList, getVoucherListReset } from "../../action/getVoucherListAction"


const VoucherList = props => {
    /* variables */
    const { getVoucherList, getVoucherListReset, getVoucherListState } = props
    const [tableData, setTableData] = useState([])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: code => <span>{code}</span>
        },
        {
            title: 'Discount',
            dataIndex: 'discountData',
            key: 'discountData',
            render: (obj) => (
                <Space>
                    {obj.type === "percentage" ?
                        <span>{obj.discount}%</span>
                        : <span>₹{obj.discount}</span>
                    }

                </Space>
            )
        },
        {
            title: 'Valid From',
            dataIndex: 'valid_from',
            key: 'valid_from',
            render: (valid_from) => {
                var date = new Date(valid_from);
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
            title: 'Valid To',
            dataIndex: 'valid_to',
            key: 'valid_to',
            render: (valid_to) => {
                var date = new Date(valid_to);
                var month = date.getMonth() +1 + 1;
                var day = date.getDate();
                var year = date.getFullYear();
                var formattedDate = month + "/" + day + "/" + year;
                return (
                    <span>{formattedDate}</span>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => status === "active" ? <Indicator green /> : <Indicator red />
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Link to={`/voucher_management/${id}/edit`}><Button size="small" icon={<EditOutlined />} /></Link>
            )
        },
    ];

    /* callbacks */
    useEffect(() => {
        getVoucherList()
    }, [])

    useEffect(() => {
        if (getVoucherListState.apiState === "success") {
            let tableData = []
            getVoucherListState.list.map(row => {
                tableData.push({
                    key: row.id,
                    name: row.name,
                    code: row.code,
                    valid_from: row.valid_from,
                    valid_to: row.valid_to,
                    discountData: { type: row.type, discount: row.discount },
                    status: row.status,
                    id: row.id,
                })
            })
            setTableData(tableData)
        }
    }, [getVoucherListState])


    return (
        <>
            <Header
                title="Voucher List"
                actionBtn={<Link to='/voucher_management/add'><Button >New</Button></Link>}
            />
            <PageContainer list >
                <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getVoucherListState: state.getVoucherList,
})

const mapDispatchToProps = (dispatch) => ({
    getVoucherList: (params) => dispatch(getVoucherList(params)),
    getVoucherListReset: () => dispatch(getVoucherListReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VoucherList)