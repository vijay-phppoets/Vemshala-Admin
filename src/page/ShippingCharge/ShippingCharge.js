import React, { useState, useEffect } from "react"
import { Form, Input, Row, Col, TreeSelect, Button, message, InputNumber, Divider, Popconfirm, Table } from "antd"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { DeleteOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"


/* action */
import { updateShipping, updateShippingReset } from "../../action/updateShippingAction"
import { getSetting, getSettingReset } from "../../action/getSettingAction"


/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"
import _ from "lodash"



const HomeSlider = props => {
    /* variables */
    const {
        updateShipping, updateShippingReset, updateShippingState,
        getSetting, getSettingReset, getSettingState,
    } = props
    const initial_values = {
        minimun_cart_value: 0,
        shipping_price: 0,
        international_shipping: 0,
    }
    const [formData, setFormData] = useState(initial_values)
    const [redirect, setRedirect] = useState([false, ''])
    const [banner_img, set_banner_img] = useState(null)
    const [m_banner_img, set_m_banner_img] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [form] = Form.useForm()

    /* callbakcs */
    useEffect(() => {
        return (() => {
            getSettingReset()
        })
    }, [])

    useEffect(() => {
        getSetting();
    }, [refresh])

    useEffect(() => {
        if (getSettingState.apiState === "success") {
            let data = getSettingState.list;
            let SP = _.find(data, ['meta_key', "shipping_charge"]);
            let MCV = _.find(data, ['meta_key', "minimun_cart_value"]);
            let ISP = _.find(data, ['meta_key', "international_shipping"]);

            form.setFieldsValue({
                minimun_cart_value: MCV.meta_value,
                shipping_price: SP.meta_value,
                international_shipping: ISP.meta_value,
            })
            setFormData({
                ...formData,
                ['minimun_cart_value']: MCV.meta_value,
                ['shipping_price']: SP.meta_value,
                ['international_shipping']: ISP.meta_value,
            })
        }
    }, [getSettingState])

    useEffect(() => {
        if (updateShippingState.apiState === "success") {
            setRefresh(refresh + 1)
            form.resetFields()
            setFormData(initial_values)
            setSubmitLoading(false)
            message.success(updateShippingState.message);
        }

        if (updateShippingState.apiState === "error") {
            updateShippingReset()
            setSubmitLoading(false)
            message.error(updateShippingState.message);
        }
    }, [updateShippingState])

    /* functions */
    const handleSubmit = async () => {
        setSubmitLoading(true)
        updateShipping(formData)
    }





    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Shipping Charge Configuration"
            />
            <PageContainer>

                <Form form={form} layout="vertical" onFinish={handleSubmit} >
                    <Row gutter="24" >

                        <Col span="6">
                            <Form.Item
                                label="Minimun Cart Value"
                                name="minimun_cart_value"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="minimun_cart_value" placeholder="Enter minimun cart value"
                                    style={{ width: "100%" }}
                                    onChange={v => setFormData({ ...formData, ["minimun_cart_value"]: v })}
                                />
                            </Form.Item>
                        </Col>

                        <Col span="6">
                            <Form.Item
                                label="Shipping Price"
                                name="shipping_price"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="shipping_price" placeholder="Enter shipping price"
                                    style={{ width: "100%" }}
                                    onChange={v => setFormData({ ...formData, ["shipping_price"]: v })}
                                />
                            </Form.Item>
                        </Col>

                        <Col span="6">
                            <Form.Item
                                label="International Shipping Price"
                                name="international_shipping"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="international_shipping" placeholder="Enter international shipping price"
                                    style={{ width: "100%" }}
                                    onChange={v => setFormData({ ...formData, ["international_shipping"]: v })}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Button type="primary" htmlType="submit" loading={submitLoading} >SUBMIT</Button>
                </Form>
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    updateShippingState: state.updateShipping,
    getSettingState: state.getSetting,
})

const mapDispatchToProps = (dispatch) => ({
    updateShipping: (params) => dispatch(updateShipping(params)),
    updateShippingReset: () => dispatch(updateShippingReset()),
    getSetting: (params) => dispatch(getSetting(params)),
    getSettingReset: (params) => dispatch(getSettingReset(params)),

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider)