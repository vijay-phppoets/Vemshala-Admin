import React, { useState, useEffect } from "react"
import { Form, Input, Row, Col, TreeSelect, Button, message } from "antd"
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { Redirect } from "react-router-dom"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* action */
import { getCategoryTree, getCategoryTreeReset } from "../../action/getCategoryTreeAction"
import { createCategory, createCategoryReset } from "../../action/createCategoryAction"

/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"

const { TreeNode } = TreeSelect

const CategoryAdd = props => {
    /* variables */
    const {
        getCategoryTree, getCategoryTreeReset, getCategoryTreeState,
        createCategory, createCategoryReset, createCategoryState
    } = props
    const [formData, setFormData] = useState({
        parent_category_id: null,
        name: "",
        url_key: "",
        image: "",
        banner_img: "",
        m_banner_img: ""
    })
    const [image, set_image] = useState(null)
    const [banner_img, set_banner_img] = useState(null)
    const [m_banner_img, set_m_banner_img] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [redirect, setRedirect] = useState([false, ''])

    /* callbacks */
    useEffect(() => {
        return (() => {
            getCategoryTreeReset()
            createCategoryReset()
        })
    }, [])

    useEffect(() => {
        getCategoryTree()
    }, [])

    useEffect(() => {
        if (createCategoryState.apiState === "success") {
            setRedirect([true, '/category/list'])
            message.success(createCategoryState.message);
        }

        if (createCategoryState.apiState === "error") {
            createCategoryReset()
            message.error(createCategoryState.message);
        }
    }, [createCategoryState])

    /* function */
    const categoryOptions = (tree) => {
        let finalJsx = []
        tree.map(node => {
            if (node.children.length > 0) {
                finalJsx.push(
                    <TreeNode value={node.id} title={node.name}>{categoryOptions(node.children)}</TreeNode>
                )
            } else {
                finalJsx.push(
                    <TreeNode value={node.id} title={node.name} />
                )
            }
        })
        return finalJsx
    }

    const handleSubmit = async () => {
        let image_filename = uuidv4()
        let banner_img_filename = uuidv4()
        let m_banner_img_filename = uuidv4()

        let imageValRes = validateImageFile(image)
        let bannerImageValRes = validateImageFile(banner_img)
        let mBannerImageValRes = validateImageFile(m_banner_img)

        if (!imageValRes.status) {
            alert("Image's extension is not allowed.")
            return
        }
        if (!bannerImageValRes.status) {
            alert("Banner Image's extension is not allowed.")
            return
        }
        if (!mBannerImageValRes.status) {
            alert("Mobile Banner Image's extension is not allowed.")
            return
        }

        setSubmitLoading(true)

        let s3UrlRes1 = await getS3SingedUrl(image_filename, imageValRes.ext, image)
        await axios.put(s3UrlRes1.url, image)

        let s3UrlRes2 = await getS3SingedUrl(banner_img_filename, bannerImageValRes.ext, banner_img)
        await axios.put(s3UrlRes2.url, banner_img)

        let s3UrlRes3 = await getS3SingedUrl(m_banner_img_filename, mBannerImageValRes.ext, m_banner_img)
        await axios.put(s3UrlRes3.url, m_banner_img)

        formData.image = `${image_filename}.${imageValRes.ext}`
        formData.banner_img = `${banner_img_filename}.${bannerImageValRes.ext}`
        formData.m_banner_img = `${m_banner_img_filename}.${mBannerImageValRes.ext}`

        createCategory(formData)
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Category Add"
            />
            <PageContainer>

                <Form layout="vertical" onFinish={handleSubmit}>
                    <Row gutter="24" >
                        <Col span="12">
                            <Form.Item
                                label="Parent Category (Empty for Root level category)"
                                name="parent_category_id"
                            >
                                <TreeSelect
                                    showSearch
                                    filterTreeNode={(input, treeNode) =>
                                        treeNode.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Blank for root category"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={(value, node) => setFormData({ ...formData, ['parent_category_id']: value })}
                                >
                                    {categoryOptions(getCategoryTreeState.tree)}
                                </TreeSelect>
                            </Form.Item>
                        </Col>

                        <Col span="12" >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="name" placeholder="Enter Category Name"
                                    onChange={(e) => setFormData({ ...formData, ['name']: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter="24" >
                        <Col span="12" >
                            <Form.Item
                                label="URL Key"
                                name="url_key"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp('^[a-zA-Z0-9-.]+$'),
                                        message: "This field must be a valid url. It should only contain alphanumeric character, dash(-) and dot(.)"
                                    }
                                ]}
                            >
                                <Input name="url_key" placeholder="Enter Category URL Key"
                                    onChange={(e) => setFormData({ ...formData, ['url_key']: e.target.value })}
                                    addonBefore={cnf.domain}
                                />
                            </Form.Item>
                        </Col>

                        <Col span="12" >
                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Required' }]}
                                extra={<span>JPEG, JPG, PNG, WEBP | 1:1 Ratio  </span>}
                            >
                                <Input type="file" name="image"
                                    onChange={e => set_image(e.target.files[0])}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter="24" >
                        <Col span="12" >
                            <Form.Item
                                label="Banner Image"
                                name="banner_img"
                                rules={[{ required: true, message: 'Required' }]}
                                extra={<span>JPEG, JPG, PNG, WEBP | 4:1 Ratio  </span>}
                            >
                                <Input type="file" name="banner_img"
                                    onChange={e => set_banner_img(e.target.files[0])}
                                />
                            </Form.Item>
                        </Col>

                        <Col span="12" >
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
                    </Row>

                    <Button type="primary" htmlType="submit" loading={submitLoading} >SUBMIT</Button>

                </Form>
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getCategoryTreeState: state.getCategoryTree,
    createCategoryState: state.createCategory,
})

const mapDispatchToProps = (dispatch) => ({
    getCategoryTree: (params) => dispatch(getCategoryTree(params)),
    getCategoryTreeReset: () => dispatch(getCategoryTreeReset()),
    createCategory: (params) => dispatch(createCategory(params)),
    createCategoryReset: () => dispatch(createCategoryReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd)