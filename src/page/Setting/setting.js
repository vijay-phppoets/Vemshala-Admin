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
import { updateSetting, updateSettingReset } from "../../action/updateSettingAction"
import { getSetting, getSettingReset } from "../../action/getSettingAction"


/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"
import _ from "lodash"



const HomeSlider = props => {
    /* variables */
    const {
        updateSetting, updateSettingReset, updateSettingState,
        getSetting, getSettingReset, getSettingState,
    } = props
    const initial_values = {
        international_price: 0,
        admin_email: "",
        offer_strip:"",
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
            let IP = _.find(data, ['meta_key', "international_price"]);
            let AE = _.find(data, ['meta_key', "admin_email"]);
            let OS = _.find(data, ['meta_key', "offer_strip"]);

            form.setFieldsValue({
                international_price: IP.meta_value,
                admin_email: AE.meta_value,
                offer_strip: OS.meta_value,
            })
            setFormData({
                ...formData,
                ['international_price']: IP.meta_value,
                ['admin_email']: AE.meta_value,
                ['offer_strip']: OS.meta_value,
            })
        }
    }, [getSettingState])

    useEffect(() => {
        if (updateSettingState.apiState === "success") {
            setRefresh(refresh + 1)
            form.resetFields()
            setFormData(initial_values)
            setSubmitLoading(false)
            message.success(updateSettingState.message);
        }

        if (updateSettingState.apiState === "error") {
            updateSettingReset()
            setSubmitLoading(false)
            message.error(updateSettingState.message);
        }
    }, [updateSettingState])

    /* functions */
    const handleSubmit = async () => {
        setSubmitLoading(true)
        updateSetting(formData)
    }

    const handleChange = e => { 
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Setting Configuration"
            />
            <PageContainer>

                <Form form={form} layout="vertical" onFinish={handleSubmit} >
                    <Row gutter="24" >

                        <Col span="4">
                        <Form.Item
                                label="INR for 1 USD"
                                name="international_price"
                                rules={[{ required: true, message: 'Required',pattern: new RegExp(/^[0-9]+$/) }]}
                            >
                                <Input name="international_price" placeholder="Enter INR for 1 USD"
                                    style={{ width: "100%" }}
                                    onChange={handleChange}
                                />
                            </Form.Item> 
                        </Col>
                        <Col span="8">
                            <Form.Item
                                label="Admin Email"
                                name="admin_email"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="admin_email" placeholder="Enter admin email id"
                                    style={{ width: "100%" }}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                label="Offer Strip "
                                name="offer_strip"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="offer_strip" placeholder="Enter offer strip for admin"
                                    style={{ width: "100%" }}
                                    onChange={handleChange}
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
    updateSettingState: state.updateSetting,
    getSettingState: state.getSetting,
})

const mapDispatchToProps = (dispatch) => ({
    updateSetting: (params) => dispatch(updateSetting(params)),
    updateSettingReset: () => dispatch(updateSettingReset()),
    getSetting: (params) => dispatch(getSetting(params)),
    getSettingReset: (params) => dispatch(getSettingReset(params)),

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider)