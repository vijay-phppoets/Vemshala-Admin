import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Button, Form, Input, Row, Col, InputNumber, message } from "antd"
import { Editor } from '@tinymce/tinymce-react'
import Mount from '../../modules/Mount'

/* CUSTOM COMPONENTS */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import ProductTabs from "../../component/ProductTabs/ProductTabs"


/* ACTIONS */
import { getProductView, getProductViewReset } from "../../action/getProductViewAction"
import { getDescriptionView, getDescriptionViewReset } from "../../action/getDescriptionViewAction"
import { updateDescription, updateDescriptionReset } from "../../action/updateDescriptionAction"

/* OTHERS */
import cnf from "../../config"

const ProductDescriptionEdit = props => {
    /* VARIABLES */
    const product_id = props.match.params.product_id
    const description_id = props.match.params.description_id
    const {
        getProductView, getProductViewReset, getProductViewState,
        getDescriptionView, getDescriptionViewReset, getDescriptionViewState,
        updateDescription, updateDescriptionReset, updateDescriptionState,
    } = props
    const [formData, setFormData] = useState({
        product_id: product_id,
        description_id: description_id,
        title: "",
        content: "",
        sequence: 1
    })
    const [form] = Form.useForm()

    /* CALLBACKS */
    useEffect(() => {
        getProductView({
            product_id: product_id
        })
        getDescriptionView({
            description_id: description_id
        })
    }, [])

    useEffect(() => {
        if (getDescriptionViewState.apiState === "success") {
            form.setFieldsValue({
                title: getDescriptionViewState.description.title,
                sequence: getDescriptionViewState.description.sequence,
            })
            setFormData({
                ...formData,
                ['title']: getDescriptionViewState.description.title,
                ['sequence']: getDescriptionViewState.description.sequence,
                ['content']: getDescriptionViewState.description.content,
            })
        }
    }, [getDescriptionViewState])

    useEffect(() => {
        if (updateDescriptionState.apiState === "success") {
            updateDescriptionReset()
            message.success(updateDescriptionState.message);
        }

        if (updateDescriptionState.apiState === "error") {
            message.error(updateDescriptionState.message);
        }
    }, [updateDescriptionState])

    /* FUNTIONS */
    const handleSubmit = () => {
        updateDescription(formData)
    }

    const handleEditorChange = (content, editor) => {
        setFormData({
            ...formData,
            ["content"]: encodeURI(content)
        })
    }



    return (
        <React.Fragment>
            <Header title="Product Description" />
            <PageContainer>
                <Mount condition={getProductViewState.apiState === "success" && getDescriptionViewState.apiState === "success"}>
                    <ProductTabs id={product_id} active="description" type={getProductViewState.product.type} />
                        <Form form={form} layout="vertical" onFinish={handleSubmit} >
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Required' }]}>
                                        <Input name="title" placeholder="Enter Title" onChange={e => setFormData({ ...formData, ['title']: e.target.value })}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item label="Sequence" name="sequence" rules={[{ required: true, message: 'Required' }]}>
                                        <InputNumber name="sequence" placeholder="Enter Sequence" onChange={v => setFormData({ ...formData, ['sequence']: v })} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <p>game of thrones</p>
                                    <Editor
                                        initialValue={decodeURIComponent(getDescriptionViewState.description.content)}
                                        // apiKey={cnf.tinyKey}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | link image | fontsizeselect',
                                            fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt'
                                        }}
                                        onEditorChange={handleEditorChange}
                                    />
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit" style={{ marginTop: 16 }} >SUBMIT</Button>
                        </Form>
                </Mount>
            </PageContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    getProductViewState: state.getProductView,
    getDescriptionViewState: state.getDescriptionView,
    updateDescriptionState: state.updateDescription,
})

const mapDispatchToProps = (dispatch) => ({
    getProductView: (params) => dispatch(getProductView(params)),
    getProductViewReset: () => dispatch(getProductViewReset()),
    getDescriptionView: (params) => dispatch(getDescriptionView(params)),
    getDescriptionViewReset: () => dispatch(getDescriptionViewReset()),
    updateDescription: (params) => dispatch(updateDescription(params)),
    updateDescriptionReset: () => dispatch(updateDescriptionReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionEdit)