import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Button, Form, Input, Row, Col, Table, Divider, Popconfirm, Space } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import ProductTabs from "../../component/ProductTabs/ProductTabs"

/* actions */
import { getProductView, getProductViewReset } from "../../action/getProductViewAction"
import { addDescription, addDescriptionReset } from "../../action/addDescriptionAction"
import { listDescription, listDescriptionReset } from "../../action/listDescriptionAction"


const ProductDescription = props => {
    /* variables */
    const product_id = props.match.params.product_id
    const {
        getProductView, getProductViewReset, getProductViewState,
        addDescription, addDescriptionReset, addDescriptionState,
        listDescription, listDescriptionReset, listDescriptionState,
    } = props
    const [formData, setFormData] = useState({
        product_id: product_id,
        title: ""
    })
    const [refresh, setRefresh] = useState(0)
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Sequence',
            dataIndex: 'sequence',
            key: 'sequence',
        },
        {
            title: 'Action',
            key: 'action',
            render: obj => (
                <Space size="middle">
                    <Link to={`/product/${product_id}/edit/description/${obj.key}`}>
                        <Button size="small" icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => console.log("hello")}
                        okText="DELETE"
                        cancelText="Cancel"
                        okType="danger"
                    >
                        <Button size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const [tableData, setTableData] = useState([])

    /* callbacks */
    useEffect(() => {
        return (() => {
            addDescriptionReset()
            listDescription()
        })
    }, [])

    useEffect(() => {
        getProductView({
            product_id: product_id
        })
        listDescription({
            product_id: product_id
        })
    }, [refresh])

    useEffect(() => {
        if (addDescriptionState.apiState === "success") {
            setRefresh(refresh + 1)
        }
    }, [addDescriptionState])

    useEffect(() => {
        if (listDescriptionState.apiState === "success") {
            let tblData = []
            listDescriptionState.list.map(item => {
                tblData.push({
                    key: item.id,
                    title: item.title,
                    sequence: item.sequence,
                    action: item.id,
                })
            })
            setTableData(tblData)
        }
    }, [listDescriptionState])

    /* FUNTIONS */
    const handleSubmit = () => {
        addDescription(formData)
    }

    return (
        <>
            <Header
                title="Product Description"
            />
            <PageContainer>
                {getProductViewState.apiState === "success" &&
                    <>
                        <ProductTabs id={product_id} active="description" type={getProductViewState.product.type} />
                        <Form layout="vertical" onFinish={handleSubmit} >
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Title"
                                        name="title"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input name="title" placeholder="Enter Title"
                                            onChange={e => setFormData({ ...formData, ['title']: e.target.value })}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit" >SUBMIT</Button>
                        </Form>
                        <Divider />
                        <Table columns={columns} dataSource={tableData} size='small' />
                    </>
                }
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getProductViewState: state.getProductView,
    addDescriptionState: state.addDescription,
    listDescriptionState: state.listDescription,
})

const mapDispatchToProps = (dispatch) => ({
    getProductView: (params) => dispatch(getProductView(params)),
    getProductViewReset: () => dispatch(getProductViewReset()),
    addDescription: (params) => dispatch(addDescription(params)),
    addDescriptionReset: () => dispatch(addDescriptionReset()),
    listDescription: (params) => dispatch(listDescription(params)),
    listDescriptionReset: () => dispatch(listDescriptionReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription)