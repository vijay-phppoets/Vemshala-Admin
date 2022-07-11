import React, { useState, useEffect } from "react"
import { Form, Row, Col, Select, Button, Input, InputNumber, message, Space, Tooltip, Popconfirm, Tag, Divider } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { DeleteOutlined, StarOutlined } from "@ant-design/icons"

/* actions */
import { getProductView, getProductViewReset } from "../../action/getProductViewAction"
import { saveProdImg, saveProdImgReset } from "../../action/saveProdImgAction"
import { delProdImg, delProdImgReset } from "../../action/delProdImgAction"
import { markImgThumb, markImgThumbReset } from "../../action/markImgThumbAction"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import ProductTabs from "../../component/ProductTabs/ProductTabs"

/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"

const ProductImages = props => {
    /* variables */
    const product_id = props.match.params.product_id
    const {
        getProductView, getProductViewReset, getProductViewState,
        saveProdImg, saveProdImgReset, saveProdImgState,
        delProdImg, delProdImgReset, delProdImgState,
        markImgThumb, markImgThumbReset, markImgThumbState,
    } = props
    const [redirect, setRedirect] = useState([false, ''])
    const [image, set_image] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [imgAttr, setImgAttr] = useState({
        attribute_id: null,
        attribute_option_id: null
    })

    /* callbacks */
    useEffect(() => {
        return (() => {
            getProductViewReset()
            saveProdImgReset()
            delProdImgReset()
            markImgThumbReset()
        })
    }, [])


    useEffect(() => {
        getProductView({
            product_id: product_id
        })
    }, [refresh])

    useEffect(() => {
        if (saveProdImgState.apiState === "success") {
            saveProdImgReset()
            setRefresh(refresh + 1)
            message.success(saveProdImgState.message);
            setSubmitLoading(false)
        }

        if (saveProdImgState.apiState === "error") {
            saveProdImgReset()
            message.error(saveProdImgState.message);
            setSubmitLoading(false)
        }
    }, [saveProdImgState])

    useEffect(() => {
        if (delProdImgState.apiState === "success") {
            delProdImgReset()
            setRefresh(refresh + 1)
            message.success(delProdImgState.message);
        }

        if (delProdImgState.apiState === "error") {
            delProdImgReset()
            message.error(delProdImgState.message);
        }
    }, [delProdImgState])

    useEffect(() => {
        if (markImgThumbState.apiState === "success") {
            markImgThumbReset()
            setRefresh(refresh + 1)
            message.success(markImgThumbState.message);
        }

        if (markImgThumbState.apiState === "error") {
            markImgThumbReset()
            message.error(markImgThumbState.message);
        }
    }, [markImgThumbState])

    /* functions */
    const handleImgSub = async () => {
        let filename = uuidv4()
        let imageValRes = validateImageFile(image)

        if (!imageValRes.status) {
            alert("Image's extension is not allowed.")
            return
        }

        setSubmitLoading(true)

        try {

            const s3UrlRes1 = await getS3SingedUrl(filename, imageValRes.ext, image)
            const response  = await axios.put(s3UrlRes1.url, image)

            saveProdImg({
                product_id: product_id,
                image: `${filename}.${imageValRes.ext}`,
                attribute_id: imgAttr.attribute_id,
                attribute_option_id: imgAttr.attribute_option_id,
            })

            console.clear(); console.log({ s3UrlRes1, response });  console.log(image)
            
        } catch (error) {
            console.clear();console.clear();
            console.log(error); console.log(image)
        }
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Edit Product"
            />
            <PageContainer>
                {getProductViewState.apiState === "success" &&
                    <>
                        <ProductTabs id={getProductViewState.product.id} active="images" type={getProductViewState.product.type} />
                        <Form onFinish={handleImgSub}>
                            <Row gutter="12" >
                                <Col span="12">
                                    <Form.Item
                                        label="Image"
                                        name="image"
                                        rules={[{ required: true, message: 'Required' }]}
                                        extra={<span>JPEG, JPG, PNG, WEBP | 1:1 Ratio  </span>}
                                    >
                                        <Input type="file" name="image"
                                            onChange={e => {
                                                set_image(e.target.files[0])
                                                setImgAttr({
                                                    attribute_id: null,
                                                    attribute_option_id: null,
                                                })
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span="4">
                                    <Button type="primary" htmlType="submit" loading={submitLoading} >SAVE</Button>
                                </Col>
                            </Row>
                        </Form>

                        <div style={{ display: "flex" }} >
                            {getProductViewState.images.map(img => {
                                if (!img.attribute_option_id) {
                                    return (
                                        <div style={{ marginRight: 4, border: "solid 1px #f5f5f5", padding: 4 }} >
                                            <img src={`${cnf.s3_base_url}${img.image}`} alt="" style={{ height: "auto", width: 100 }} />
                                            <div style={{ marginTop: 8 }} >
                                                <Space>
                                                    <Popconfirm
                                                        title="Are you sure to delete this image?"
                                                        onConfirm={() => delProdImg({
                                                            product_id: product_id,
                                                            img_id: img.id,
                                                            image: img.image,
                                                            attribute_id: null,
                                                            attribute_option_id: null,
                                                        })}
                                                        okText="Delete"
                                                        cancelText="Cancel"
                                                        okType="danger"
                                                    >
                                                        <Button size="small" icon={<DeleteOutlined />} />
                                                    </Popconfirm>
                                                    {!img.is_thumbnail ?
                                                        <Tooltip title="Mark as Thumbnail" placement="bottom" >
                                                            <Button size="small" icon={<StarOutlined />} onClick={() => markImgThumb({
                                                                img_id: img.id,
                                                                product_id: product_id,
                                                                attribute_id: null,
                                                                attribute_option_id: null,
                                                            })} />
                                                        </Tooltip>
                                                        : <Tag color="green">Thumbnail</Tag>
                                                    }
                                                </Space>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>

                        {getProductViewState.product.attribute_for_separate_images &&
                            <>
                                <Divider />
                                {getProductViewState.attr_data_for_sp_img.map(attr => (
                                    <>
                                        <Form onFinish={handleImgSub} >
                                            <h3>Separate Images for {attr.name}: {attr.option_value}</h3>
                                            <Row gutter="12" >
                                                <Col span="12">
                                                    <Form.Item
                                                        label="Image"
                                                        name="image"
                                                        rules={[{ required: true, message: 'Required' }]}
                                                        extra={<span>JPEG, JPG, PNG, WEBP | 1:1 Ratio  </span>}
                                                    >
                                                        <Input type="file" name="image"
                                                            onChange={e => {
                                                                set_image(e.target.files[0])
                                                                setImgAttr({
                                                                    attribute_id: attr.attribute_id,
                                                                    attribute_option_id: attr.attribute_option_id,
                                                                })
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span="4">
                                                    <Button type="primary" htmlType="submit" loading={submitLoading} >SAVE</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <div style={{ display: "flex" }} >
                                            {getProductViewState.images.map(img => {
                                                if (img.attribute_option_id === attr.attribute_option_id) {
                                                    return (
                                                        <div style={{ marginRight: 4, border: "solid 1px #f5f5f5", padding: 4 }} >
                                                            <img src={`${cnf.s3_base_url}${img.image}`} alt="" style={{ height: "auto", width: 100 }} />
                                                            <div style={{ marginTop: 8 }} >
                                                                <Space>
                                                                    <Popconfirm
                                                                        title="Are you sure to delete this image?"
                                                                        onConfirm={() => delProdImg({
                                                                            product_id: product_id,
                                                                            img_id: img.id,
                                                                            image: img.image,
                                                                            attribute_id: img.attribute_id,
                                                                            attribute_option_id: img.attribute_option_id,
                                                                        })}
                                                                        okText="Delete"
                                                                        cancelText="Cancel"
                                                                        okType="danger"
                                                                    >
                                                                        <Button size="small" icon={<DeleteOutlined />} />
                                                                    </Popconfirm>
                                                                    {!img.is_thumbnail ?
                                                                        <Tooltip title="Mark as Thumbnail" placement="bottom" >
                                                                            <Button size="small" icon={<StarOutlined />} onClick={() => markImgThumb({
                                                                                img_id: img.id,
                                                                                product_id: product_id,
                                                                                attribute_id: img.attribute_id,
                                                                                attribute_option_id: img.attribute_option_id,
                                                                            })} />
                                                                        </Tooltip>
                                                                        : <Tag color="green">Thumbnail</Tag>
                                                                    }
                                                                </Space>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                        <Divider />
                                    </>
                                ))}
                            </>
                        }
                    </>
                }
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getProductViewState: state.getProductView,
    saveProdImgState: state.saveProdImg,
    delProdImgState: state.delProdImg,
    markImgThumbState: state.markImgThumb,
})

const mapDispatchToProps = (dispatch) => ({
    getProductView: (params) => dispatch(getProductView(params)),
    getProductViewReset: () => dispatch(getProductViewReset()),
    saveProdImg: (params) => dispatch(saveProdImg(params)),
    saveProdImgReset: () => dispatch(saveProdImgReset()),
    delProdImg: (params) => dispatch(delProdImg(params)),
    delProdImgReset: () => dispatch(delProdImgReset()),
    markImgThumb: (params) => dispatch(markImgThumb(params)),
    markImgThumbReset: () => dispatch(markImgThumbReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductImages)