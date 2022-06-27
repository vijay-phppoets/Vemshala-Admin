import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Button, Form, Select, Row, Col, message, Table, Divider, Popconfirm } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
/* CUSTOM COMPONENTS */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import ProductTabs from "../../component/ProductTabs/ProductTabs"

/* ACTIONS */
import { getProductView, getProductViewReset } from "../../action/getProductViewAction"
import { getProductList, getProductListReset } from "../../action/getProductListAction"
import { addRelProd, addRelProdReset } from "../../action/addRelProdAction"
import { listRelProd, listRelProdReset } from "../../action/listRelProdAction"
import { delRelProd, delRelProdReset } from "../../action/delRelProdAction"

const RelatedProducts = props => {
    /* VARIABLES */
    const product_id = props.match.params.product_id
    const {
        getProductView, getProductViewReset, getProductViewState,
        getProductList, getProductListReset, getProductListState,
        addRelProd, addRelProdReset, addRelProdState,
        listRelProd, listRelProdReset, listRelProdState,
        delRelProd, delRelProdReset, delRelProdState,
    } = props
    const [formData, setFormData] = useState({
        product_id: product_id,
        related_product_id: ""
    })
    const [refresh, setRefresh] = useState(0)
    const [tableData, setTableData] = useState([])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: obj => (
                <Popconfirm
                    title="Are you sure to delete?"
                    onConfirm={() => delRelProd({
                        product_id: product_id,
                        related_product_id: obj.key,
                    })}
                    okText="DELETE"
                    cancelText="Cancel"
                    okType="danger"
                >
                    <Button size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    /* callbacks */
    useEffect(() => {
        getProductView({
            product_id: product_id
        })
        getProductList()
        listRelProd({
            product_id: product_id
        })
    }, [refresh])

    useEffect(() => {
        if (addRelProdState.apiState === "success") {
            addRelProdReset()
            setRefresh(refresh + 1)
            message.success(addRelProdState.message);
        }

        if (addRelProdState.apiState === "error") {
            message.error(addRelProdState.message);
        }
    }, [addRelProdState])

    useEffect(() => {
        if (listRelProdState.apiState === "success") {
            let tblData = []
            listRelProdState.list.map(item => {
                tblData.push({
                    key: item.id,
                    name: item.name,
                    action: item.id,
                })
            })
            setTableData(tblData)
        }
    }, [listRelProdState])


    useEffect(() => {
        if (delRelProdState.apiState === "success") {
            delRelProdReset()
            setRefresh(refresh + 1)
            message.success(delRelProdState.message);
        }

        if (delRelProdState.apiState === "error") {
            message.error(delRelProdState.message);
        }
    }, [delRelProdState])



    /* FUNCTIONS */
    const handleSubmit = () => {
        addRelProd(formData)
    }

    const handleSelect = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    return (
        <>
            <Header
                title="Related Products"
            />
            <PageContainer>
                {getProductViewState.apiState === "success" &&
                    <>
                        <ProductTabs id={product_id} active="related_products" type={getProductViewState.product.type} />
                        <Form layout="vertical" onFinish={handleSubmit} >
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        label="Related Product"
                                        name="related_product_id"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select name="related_product_id" placeholder="Select Related Product"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            onChange={(value) => handleSelect("related_product_id", value)}
                                        >
                                            {getProductListState.list.map(p => (
                                                <Select.Option key={p.id} value={p.id} >{`${p.name}`}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit" >SAVE</Button>
                            <Divider />
                            <Table columns={columns} dataSource={tableData} size='small' pagination={false} />
                        </Form>
                    </>
                }
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getProductViewState: state.getProductView,
    getProductListState: state.getProductList,
    addRelProdState: state.addRelProd,
    listRelProdState: state.listRelProd,
    delRelProdState: state.delRelProd,
})

const mapDispatchToProps = (dispatch) => ({
    getProductView: (params) => dispatch(getProductView(params)),
    getProductViewReset: () => dispatch(getProductViewReset()),
    getProductList: (params) => dispatch(getProductList(params)),
    getProductListReset: () => dispatch(getProductListReset()),
    addRelProd: (params) => dispatch(addRelProd(params)),
    addRelProdReset: () => dispatch(addRelProdReset()),
    listRelProd: (params) => dispatch(listRelProd(params)),
    listRelProdReset: () => dispatch(listRelProdReset()),
    delRelProd: (params) => dispatch(delRelProd(params)),
    delRelProdReset: () => dispatch(delRelProdReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelatedProducts)