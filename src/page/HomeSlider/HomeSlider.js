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
import { saveSliderImages, saveSliderImagesReset } from "../../action/saveSliderImagesAction"
import { getSliderList, getSliderListReset } from "../../action/getSliderListAction"
import { delSlider, delSliderReset } from "../../action/delSliderAction"


/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"




const HomeSlider = props => {
    /* variables */
    const {
        saveSliderImages, saveSliderImagesReset, saveSliderImagesState,
        getSliderList, getSliderListReset, getSliderListState,
        delSlider, delSliderReset, delSliderState,
    } = props
    const initial_values = {
        banner_img: "",
        m_banner_img: "",
        sequence: 0,
    }
    const [formData, setFormData] = useState(initial_values)
    const [redirect, setRedirect] = useState([false, ''])
    const [banner_img, set_banner_img] = useState(null)
    const [m_banner_img, set_m_banner_img] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (<img src={`${cnf.s3_base_url}${image}`} alt="" style={{ width: 100 }} />)
        },
        {
            title: 'Mobile Image',
            dataIndex: 'mobile_image',
            key: 'mobile_image',
            render: (mobile_image) => (<img src={`${cnf.s3_base_url}${mobile_image}`} alt="" style={{ width: 100 }} />)
        },
        {
            title: 'Sequence',
            dataIndex: 'sequence',
            key: 'sequence',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Popconfirm
                    title="Are you sure to delete this slider?"
                    onConfirm={() => delSlider({
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
            saveSliderImagesReset()
            getSliderListReset()
            delSliderReset()
        })
    }, [])

    useEffect(() => {
        getSliderList()
    }, [refresh])

    useEffect(() => {
        if (saveSliderImagesState.apiState === "success") {
            setRefresh(refresh + 1)
            form.resetFields()
            setFormData(initial_values)
            setSubmitLoading(false)
            message.success(saveSliderImagesState.message);
        }

        if (saveSliderImagesState.apiState === "error") {
            saveSliderImagesReset()
            setSubmitLoading(false)
            message.error(saveSliderImagesState.message);
        }
    }, [saveSliderImagesState])


    useEffect(() => {
        if (delSliderState.apiState === "success") {
            setRefresh(refresh + 1)
            message.success(delSliderState.message);
        }

        if (delSliderState.apiState === "error") {
            delSliderReset()
            message.error(delSliderState.message);
        }
    }, [delSliderState])

    useEffect(() => {
        if (getSliderListState.apiState === "success") {
            let ar = []
            getSliderListState.list.map(obj => {
                ar.push({
                    key: obj.id,
                    image: obj.image,
                    mobile_image: obj.m_image,
                    sequence: obj.sequence,
                    id: obj.id,
                })
            })
            setTableData(ar)
        }
    }, [getSliderListState])

    /* functions */
    const handleSubmit = async () => {
        let banner_img_filename = uuidv4()
        let m_banner_img_filename = uuidv4()

        let bannerImageValRes = validateImageFile(banner_img)
        let mBannerImageValRes = validateImageFile(m_banner_img)


        if (!bannerImageValRes.status) {
            alert("Banner Image's extension is not allowed.")
            return
        }
        if (!mBannerImageValRes.status) {
            alert("Mobile Banner Image's extension is not allowed.")
            return
        }

        setSubmitLoading(true)

        let s3UrlRes2 = await getS3SingedUrl(banner_img_filename, bannerImageValRes.ext, banner_img)
        await axios.put(s3UrlRes2.url, banner_img)

        let s3UrlRes3 = await getS3SingedUrl(m_banner_img_filename, mBannerImageValRes.ext, m_banner_img)
        await axios.put(s3UrlRes3.url, m_banner_img)

        formData.banner_img = `${banner_img_filename}.${bannerImageValRes.ext}`
        formData.m_banner_img = `${m_banner_img_filename}.${mBannerImageValRes.ext}`

        saveSliderImages(formData)
    }





    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Home Page Sliders"
            />
            <PageContainer>

                <Form form={form} layout="vertical" onFinish={handleSubmit} >
                    <Row gutter="24" >
                        <Col span="8">
                            <Form.Item
                                label="Banner Image"
                                name="banner_img"
                                rules={[{ required: true, message: 'Required' }]}
                                extra={<span>JPEG, JPG, PNG, WEBP | 4:1 Ratio  </span>}
                            >
                                <Input type="file" name="m_banner_img"
                                    onChange={e => set_banner_img(e.target.files[0])}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="8">
                            <Form.Item
                                label="Banner Image For Mobile"
                                name="m_banner_img"
                                rules={[{ required: true, message: 'Required' }]}
                                extra={<span>JPEG, JPG, PNG, WEBP | 3:2 Ratio  </span>}
                            >
                                <Input type="file" name="m_banner_img"
                                    onChange={e => set_m_banner_img(e.target.files[0])}
                                />
                            </Form.Item>
                        </Col>
                        <Col span="4">
                            <Form.Item
                                label="Sequence"
                                name="sequence"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <InputNumber name="sequence" placeholder="Enter Sequence"
                                    style={{ width: "100%" }}
                                    onChange={v => setFormData({ ...formData, ["sequence"]: v })}
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
    saveSliderImagesState: state.saveSliderImages,
    getSliderListState: state.getSliderList,
    delSliderState: state.delSlider,
})

const mapDispatchToProps = (dispatch) => ({
    saveSliderImages: (params) => dispatch(saveSliderImages(params)),
    saveSliderImagesReset: () => dispatch(saveSliderImagesReset()),
    getSliderList: (params) => dispatch(getSliderList(params)),
    getSliderListReset: () => dispatch(getSliderListReset()),
    delSlider: (params) => dispatch(delSlider(params)),
    delSliderReset: () => dispatch(delSliderReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider)