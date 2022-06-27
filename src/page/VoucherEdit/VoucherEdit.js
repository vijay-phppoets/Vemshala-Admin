import React, { useState, useEffect } from "react"
import { Form, Row, Col, Select, Button, Input, InputNumber, message, DatePicker, Space } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import moment from 'moment'

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* actions */
import { updateVoucher, updateVoucherReset } from "../../action/updateVoucherAction"
import { getVoucherView, getVoucherViewReset } from "../../action/getVoucherViewAction"
const { RangePicker } = DatePicker;
const VoucherEdit = props => {
    /* variables */
    const voucher_id = props.match.params.voucher_id
    const {
        updateVoucher, updateVoucherReset, updateVoucherState,
        getVoucherView, getVoucherViewReset, getVoucherViewState,
    } = props
    const [formData, setFormData] = useState({
        voucher_id: voucher_id,
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
        return (() => {
            getVoucherViewReset()
            updateVoucherReset()
        })
    }, [])
    useEffect(() => {
        getVoucherView({
            voucher_id: voucher_id
        })
    }, [])
    useEffect(() => {
        if (getVoucherViewState.apiState === "success") {
            form.setFieldsValue({
                type: getVoucherViewState.coupon.type,
                status: getVoucherViewState.coupon.status,
                name: getVoucherViewState.coupon.name,
                code: getVoucherViewState.coupon.code,
                description: getVoucherViewState.coupon.description,
                no_of_usage_for_all: getVoucherViewState.coupon.no_of_usage_for_all,
                discount: getVoucherViewState.coupon.discount,
                minimum_cart_value: getVoucherViewState.coupon.minimum_cart_value,
                maximum_discount_amount: getVoucherViewState.coupon.maximum_discount_amount,
                validity: [moment(moment(getVoucherViewState.coupon.valid_from).format("YYYY-MM-DD HH:mm:ss"), 'YYYY-MM-DD HH:mm:ss'), moment(moment(getVoucherViewState.coupon.valid_to).format("YYYY-MM-DD HH:mm:ss"), 'YYYY-MM-DD HH:mm:ss')],
            })
            setFormData({
                ...formData,
                ['type']: getVoucherViewState.coupon.type,
                ['status']: getVoucherViewState.coupon.status,
                ['name']: getVoucherViewState.coupon.name,
                ['code']: getVoucherViewState.coupon.code,
                ['description']: getVoucherViewState.coupon.description,
                ['no_of_usage_for_all']: getVoucherViewState.coupon.no_of_usage_for_all,
                ['discount']: getVoucherViewState.coupon.discount,
                ['minimum_cart_value']: getVoucherViewState.coupon.minimum_cart_value,
                ['maximum_discount_amount']: getVoucherViewState.coupon.maximum_discount_amount,
                ["valid_from"]: moment(getVoucherViewState.coupon.valid_from).format("DD-MM-YYYY HH:mm:ss"),
                ["valid_to"]: moment(getVoucherViewState.coupon.valid_to).format("DD-MM-YYYY HH:mm:ss"),
            })
        }
    }, [getVoucherViewState])

    useEffect(() => {
        form.setFieldsValue({
            status: "active",
            type: "percentage"
        })
    }, [])

    useEffect(() => {
        if (updateVoucherState.apiState === "success") {
            setRedirect([true, '/voucher_management/list'])
            message.success(updateVoucherState.message);
        }

        if (updateVoucherState.apiState === "error") {
            updateVoucherReset()
            message.error(updateVoucherState.message);
        }
    }, [updateVoucherState])

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
        updateVoucher(formData)
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

                    <Button type="primary" htmlType="submit" loading={updateVoucherState.apiState === "loading"} >SUBMIT</Button>
                </Form>
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    updateVoucherState: state.updateVoucher,
    getVoucherViewState: state.getVoucherView,
})

const mapDispatchToProps = (dispatch) => ({
    updateVoucher: (params) => dispatch(updateVoucher(params)),
    updateVoucherReset: () => dispatch(updateVoucherReset()),
    getVoucherView: (params) => dispatch(getVoucherView(params)),
    getVoucherViewReset: () => dispatch(getVoucherViewReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VoucherEdit)