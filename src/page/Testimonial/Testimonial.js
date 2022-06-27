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
import { saveTestimonial, saveTestimonialReset } from "../../action/saveTestimonialAction"
import { getTestimonialList, getTestimonialListReset } from "../../action/getTestimonialListAction"
import { delTestimonial, delTestimonialReset } from "../../action/delTestimonialAction"


/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"

const Testimonial = props => {
    /* variables */
    const {
        saveTestimonial, saveTestimonialReset, saveTestimonialState,
        getTestimonialList, getTestimonialListReset, getTestimonialListState,
        delTestimonial, delTestimonialReset, delTestimonialState,
    } = props
    const initial_values = {
        description: "",
        image: "",
        name: "",
        title: "",
        sequence: 1,
    }
    const [formData, setFormData] = useState(initial_values)
    const [redirect, setRedirect] = useState([false, ''])
    const [image, set_image] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (<img src={`${cnf.s3_base_url}${image}`} alt="" style={{ width: 50 }} />)
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Popconfirm
                    title="Are you sure to delete this testimonial?"
                    onConfirm={() => delTestimonial({
                        id: id,
                    })}
                    okText="Delete"
                    cancelText="Cancel"
                    okType="danger"
                >
                    <Button size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            )
        }
    ];
    const [tableData, setTableData] = useState([])
    const [form] = Form.useForm()

    /* callbakcs */
    useEffect(() => {
        return (() => {
            saveTestimonialReset()
            getTestimonialListReset()
            delTestimonialReset()
        })
    }, [])

    useEffect(() => {
        getTestimonialList()
    }, [refresh])

    useEffect(() => {
        if (saveTestimonialState.apiState === "success") {
            setRefresh(refresh + 1)
            form.resetFields()
            setFormData(initial_values)
            setSubmitLoading(false)
            message.success(saveTestimonialState.message);
        }

        if (saveTestimonialState.apiState === "error") {
            saveTestimonialReset()
            setSubmitLoading(false)
            message.error(saveTestimonialState.message);
        }
    }, [saveTestimonialState])


    useEffect(() => {
        if (delTestimonialState.apiState === "success") {
            setRefresh(refresh + 1)
            message.success(delTestimonialState.message);
        }

        if (delTestimonialState.apiState === "error") {
            delTestimonialReset()
            message.error(delTestimonialState.message);
        }
    }, [delTestimonialState])

    useEffect(() => {
        if (getTestimonialListState.apiState === "success") {
            let ar = []
            getTestimonialListState.list.map(obj => {
                ar.push({
                    key: obj.id,
                    description: obj.description,
                    image: obj.image,
                    name: obj.name,
                    title: obj.title,
                    id: obj.id,
                })
            })
            setTableData(ar)
        }
    }, [getTestimonialListState])

    /* functions */
    const handleSubmit = async () => {
        let image_filename
        let imageValRes
        if (image) {
            image_filename = uuidv4()
            imageValRes = validateImageFile(image)
            if (!imageValRes.status) {
                alert("Image's extension is not allowed.")
                return
            }
        }


        setSubmitLoading(true)

        if (image) {
            let s3UrlRes = await getS3SingedUrl(image_filename, imageValRes.ext, image)
            await axios.put(s3UrlRes.url, image)

            formData.image = `${image_filename}.${imageValRes.ext}`
        }

        saveTestimonial(formData)
    }



    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Home Page Testimonials"
            />
            <PageContainer>

                <Form form={form} layout="vertical" onFinish={handleSubmit} >
                    <Row gutter="24" >
                        <Col span="8">
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input.TextArea name="description" placeholder="Enter Description"
                                    onChange={e => setFormData({ ...formData, ['description']: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="8">
                            <Form.Item
                                label="Image"
                                name="image"
                                extra={<span>JPEG, JPG, PNG, WEBP | 1:1 Ratio  </span>}
                            >
                                <Input type="file" name="image"
                                    onChange={e => set_image(e.target.files[0])}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="8">
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="name" placeholder="Enter Name"
                                    onChange={e => setFormData({ ...formData, ['name']: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="8">
                            <Form.Item
                                label="Title"
                                name="title"
                            >
                                <Input name="title" placeholder="Enter Title"
                                    onChange={e => setFormData({ ...formData, ['title']: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item
                                label="Sequence"
                                name="sequence"
                            >
                                <InputNumber name="sequence" placeholder="Enter Sequence"
                                    style={{ width: "100%" }}
                                    onChange={v => setFormData({ ...formData, ['sequence']: v })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" loading={submitLoading} >SUBMIT</Button>
                </Form>

                <Divider />
                <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    saveTestimonialState: state.saveTestimonial,
    getTestimonialListState: state.getTestimonialList,
    delTestimonialState: state.delTestimonial,
})

const mapDispatchToProps = (dispatch) => ({
    saveTestimonial: (params) => dispatch(saveTestimonial(params)),
    saveTestimonialReset: () => dispatch(saveTestimonialReset()),
    getTestimonialList: (params) => dispatch(getTestimonialList(params)),
    getTestimonialListReset: () => dispatch(getTestimonialListReset()),
    delTestimonial: (params) => dispatch(delTestimonial(params)),
    delTestimonialReset: () => dispatch(delTestimonialReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial)