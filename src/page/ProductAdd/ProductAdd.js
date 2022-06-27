import React, { useState, useEffect } from "react"
import { Form, Row, Col, Select, Button, Input, InputNumber, message } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* actions */
import { createProduct, createProductReset } from "../../action/createProductAction"

const ProductAdd = props => {
    /* variables */
    const {
        createProduct, createProductReset, createProductState
    } = props
    const [formData, setFormData] = useState({
        type: "",
        status: "enabled",
        name: "",
        url_key: "",
        price: "",
        is_sale_price: "",
        sale_price: "",
        gst:""
    })
    const [form] = Form.useForm()
    const [redirect, setRedirect] = useState([false, ''])

    /* callbacks */
    useEffect(() => {
        return (() => createProductReset())
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            status: "enabled",
        })
    }, [])

    useEffect(() => {
        if (createProductState.apiState === "success") {
            setRedirect([true, '/product/list'])
            message.success(createProductState.message);
        }

        if (createProductState.apiState === "error") {
            createProductReset()
            message.error(createProductState.message);
        }
    }, [createProductState])

    /* functions */
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNumberChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSelect = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        createProduct(formData)
    }


    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Add Product"
            />
            <PageContainer>
                <Form layout="vertical" form={form} onFinish={handleSubmit} >
                    <Row gutter="24" >
                        <Col span="6">
                            <Form.Item
                                label="Product Type"
                                name="type"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="type" placeholder="Select Product Type"
                                    onSelect={v => handleNumberChange("type", v)}
                                >
                                    <Select.Option key="simple" value="simple">Simple</Select.Option>
                                    <Select.Option key="variant" value="variant">Variant</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="status" placeholder="Select Status"
                                    onSelect={v => handleNumberChange("status", v)}
                                >
                                    <Select.Option key="enabled" value="enabled" >Enabled</Select.Option>
                                    <Select.Option key="disabled" value="disabled">Disabled</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="12">
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="name" placeholder="Enter Name"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="12">
                            <Form.Item
                                label="URL key"
                                name="url_key"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp('^[a-zA-Z0-9-.]+$'),
                                        message: "This field must be a valid url. It should only contain alphanumeric character, dash(-) and dot(.)"
                                    }
                                ]}
                            >
                                <Input name="url_key" placeholder="Enter URL key"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item
                                label="GST"
                                name="gst"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="gst" placeholder="Select GST" defaultValue="Select GST"
                                    onSelect={v => handleNumberChange("gst", v)}
                                > 
                                    <Select.Option key="5" value="5">5</Select.Option>
                                    <Select.Option key="12" value="12">12</Select.Option>
                                    <Select.Option key="18" value="18">18</Select.Option>
                                    <Select.Option key="28" value="28">28</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="6">
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="price" placeholder="Enter Price" style={{ width: "100%" }} min={0}
                                    onChange={v => handleNumberChange("price", v)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item
                                label="Set Sale Price"
                                name="is_sale_price"
                            >
                                <Select name="is_sale_price" placeholder="Select Sale Price Rule" defaultValue="no"
                                    onSelect={v => handleNumberChange("is_sale_price", v)}
                                >
                                    <Select.Option key="yes" value="yes">Yes</Select.Option>
                                    <Select.Option key="no" value="no">No</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item
                                label="Sale Price"
                                name="sale_price"
                            >
                                <InputNumber name="sale_price" placeholder="Enter Sale Price" style={{ width: "100%" }} min={0}
                                    onChange={v => handleNumberChange("sale_price", v)}
                                />
                            </Form.Item>
                        </Col> 
                    </Row>

                    <Button type="primary" htmlType="submit" loading={createProductState.apiState === "loading"} >SUBMIT</Button>
                </Form>
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    createProductState: state.createProduct,
})

const mapDispatchToProps = (dispatch) => ({
    createProduct: (params) => dispatch(createProduct(params)),
    createProductReset: () => dispatch(createProductReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd)