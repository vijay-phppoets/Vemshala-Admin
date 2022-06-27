import React, { useState, useEffect } from "react"
import { Form, Row, Col, Select, Button, Input, InputNumber, message, DatePicker, Space } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* actions */
import { createVoucher, createVoucherReset } from "../../action/createVoucherAction"
const { RangePicker } = DatePicker;
const VoucherAdd = props => {
    /* variables */
    const {
        createVoucher, createVoucherReset, createVoucherState
    } = props
    const [formData, setFormData] = useState({
        type: "percentage",
        status: "active",
        name: "",
        code: "",
        description: "",
        no_of_usage_for_all: "",
        discount: "",
        minimum_cart_value: "",
        maximum_discount_amount: "",
        valid_from: "",
        valid_to: "",

    })
    const [form] = Form.useForm()
    const [redirect, setRedirect] = useState([false, ''])

    /* callbacks */
    useEffect(() => {
        return (() => createVoucherReset())
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            status: "active",
            type: "percentage"
        })
    }, [])

    useEffect(() => {
        if (createVoucherState.apiState === "success") {
            setRedirect([true, '/voucher_management/list'])
            message.success(createVoucherState.message);
        }

        if (createVoucherState.apiState === "error") {
            createVoucherReset()
            message.error(createVoucherState.message);
        }
    }, [createVoucherState])

    /* functions */
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNumberChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }
    const handleDatePickerChange = (date, dateString) => {
        setFormData(({
            ...formData,
            ["valid_from"]: dateString[0],
            ["valid_to"]: dateString[1]
        }))
    }

    const handleSelect = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        createVoucher(formData)
    }


    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Add Voucher"
            />
            <PageContainer>
                <Form layout="vertical" form={form} onFinish={handleSubmit} >

                    <Row gutter="24" >
                        <Col span="12">
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="name" placeholder="Enter Coupon Name"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="code" placeholder="Enter Coupon Code"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="24">
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <Input.TextArea name="description" placeholder="Enter Description"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter="24" >
                        <Col span="6">
                            <Form.Item
                                label="No of usage for all"
                                name="no_of_usage_for_all"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="no_of_usage_for_all" placeholder="No of usage for all"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        {/* <Col span="6">
                            <Form.Item
                                label="No of usage for a customer"
                                name="no_of_usage_for_a_customer"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="no_of_usage_for_a_customer" placeholder="No of usage for a customer"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Row gutter="24" >
                        <Col span="12">
                            <Form.Item
                                label="Validity"
                                name="validity"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <RangePicker showTime format="DD-MM-YYYY HH:mm:ss" onChange={handleDatePickerChange} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter="24">
                        <Col span="6">
                            <Form.Item
                                label="Type"
                                name="type"
                            >
                                <Select name="type" placeholder="Select Type" defaultValue="percentage"
                                    onSelect={v => handleNumberChange("type", v)}
                                >
                                    <Select.Option key="percentage" value="percentage">Percentage</Select.Option>
                                    <Select.Option key="flat" value="flat">Flat</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="discount" placeholder="Enter discount" style={{ width: "100%" }} min={0}
                                    onChange={v => handleNumberChange("discount", v)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="6">
                            <Form.Item
                                label="Minimum cart value"
                                name="minimum_cart_value"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="minimum_cart_value" placeholder="Enter minimum cart value" style={{ width: "100%" }} min={0}
                                    onChange={v => handleNumberChange("minimum_cart_value", v)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item
                                label="Maximum discount amount"
                                name="maximum_discount_amount"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="maximum_discount_amount" placeholder="Enter maximum discount amount" style={{ width: "100%" }} min={0}
                                    onChange={v => handleNumberChange("maximum_discount_amount", v)}
                                />
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
                                    <Select.Option key="active" value="active" >Active</Select.Option>
                                    <Select.Option key="inactive" value="inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" loading={createVoucherState.apiState === "loading"} >SUBMIT</Button>
                </Form>
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    createVoucherState: state.createVoucher,
})

const mapDispatchToProps = (dispatch) => ({
    createVoucher: (params) => dispatch(createVoucher(params)),
    createVoucherReset: () => dispatch(createVoucherReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VoucherAdd)