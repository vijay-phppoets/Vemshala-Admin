import React, { useState, useEffect } from "react"
import { Form, Input, Row, Col, TreeSelect, Button, message, Skeleton } from "antd"
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import _ from "lodash"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* action */
import { getCategoryTree, getCategoryTreeReset } from "../../action/getCategoryTreeAction"
import { getCategoryView, getCategoryViewReset } from "../../action/getCategoryViewAction"
import { updateCategory, updateCategoryReset } from "../../action/updateCategoryAction"

/* others */
import { validateImageFile, getS3SingedUrl } from "../../utils"
import cnf from "../../config"

const { TreeNode } = TreeSelect

const CategoryEdit = props => {
    /* variables */
    const category_id = props.match.params.category_id
    const {
        getCategoryTree, getCategoryTreeReset, getCategoryTreeState,
        getCategoryView, getCategoryViewReset, getCategoryViewState,
        updateCategory, updateCategoryReset, updateCategoryState,
    } = props
    const [formData, setFormData] = useState({
        category_id: category_id,
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
    const [form] = Form.useForm()
    const [imgChanged, setImgChanged] = useState({
        image: false,
        banner_img: false,
        m_banner_img: false,
    })

    /* callbacks */
    useEffect(() => {
        return (() => {
            getCategoryTreeReset()
            getCategoryViewReset()
            updateCategoryReset()
        })
    }, [])

    useEffect(() => {
        getCategoryTree()
        getCategoryView({ category_id: category_id })
    }, [])

    useEffect(() => {
        if (getCategoryViewState.apiState === "success") {
            form.setFieldsValue({
                parent_category_id: getCategoryViewState.category.parent_category_id,
                name: getCategoryViewState.category.name,
                url_key: getCategoryViewState.category.url_key,
            })
            setFormData({
                ...formData,
                ['parent_category_id']: getCategoryViewState.category.parent_category_id,
                ['name']: getCategoryViewState.category.name,
                ['url_key']: getCategoryViewState.category.url_key,
                ['image']: getCategoryViewState.category.image,
                ['banner_img']: getCategoryViewState.category.banner_img,
                ['m_banner_img']: getCategoryViewState.category.m_banner_img,
            })
        }
    }, [getCategoryViewState])

    useEffect(() => {
        if (updateCategoryState.apiState === "success") {
            setRedirect([true, '/category/list'])
            message.success(updateCategoryState.message);
        }

        if (updateCategoryState.apiState === "error") {
            updateCategoryReset()
            message.error(updateCategoryState.message);
            setSubmitLoading(false)
        }
    }, [updateCategoryState])



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
        if (category_id == formData.parent_category_id) {
            alert("You can't select same category as parent category!")
            return
        }


        let image_filename = uuidv4()
        let banner_img_filename = uuidv4()
        let m_banner_img_filename = uuidv4()

        let imageValRes
        let bannerImageValRes
        let mBannerImageValRes

        if (imgChanged.image) {
            imageValRes = validateImageFile(image)
            if (!imageValRes.status) {
                alert("Image's extension is not allowed.")
                return
            }
        }

        if (imgChanged.banner_img) {
            bannerImageValRes = validateImageFile(banner_img)
            if (!bannerImageValRes.status) {
                alert("Banner Image's extension is not allowed.")
                return
            }
        }

        if (imgChanged.m_banner_img) {
            mBannerImageValRes = validateImageFile(m_banner_img)
            if (!mBannerImageValRes.status) {
                alert("Mobile Banner Image's extension is not allowed.")
                return
            }
        }


        setSubmitLoading(true)

        if (imgChanged.image) {
            console.log("hello", "uploading image");
            let s3UrlRes1 = await getS3SingedUrl(image_filename, imageValRes.ext, image)
            await axios.put(s3UrlRes1.url, image)
            formData.image = `${image_filename}.${imageValRes.ext}`
        }

        if (imgChanged.banner_img) {
            console.log("hello", "uploading banner_img");
            let s3UrlRes2 = await getS3SingedUrl(banner_img_filename, bannerImageValRes.ext, banner_img)
            await axios.put(s3UrlRes2.url, banner_img)
            formData.banner_img = `${banner_img_filename}.${bannerImageValRes.ext}`
        }

        if (imgChanged.m_banner_img) {
            console.log("hello", "uploading m_banner_img");
            let s3UrlRes3 = await getS3SingedUrl(m_banner_img_filename, mBannerImageValRes.ext, m_banner_img)
            await axios.put(s3UrlRes3.url, m_banner_img)
            formData.m_banner_img = `${m_banner_img_filename}.${mBannerImageValRes.ext}`
        }

        updateCategory(_.merge(formData, { imgChanged: imgChanged }))

    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Header
                title="Category Edit"
            />
            <PageContainer>
                {getCategoryViewState.apiState === "loading" &&
                    <Skeleton active />
                }

                {getCategoryViewState.apiState === "error" &&
                    <p>{getCategoryViewState.message}</p>
                }

                {getCategoryViewState.apiState === "success" &&
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                                    extra={<span>JPEG, JPG, PNG, WEBP | 1:1 Ratio  </span>}
                                >
                                    {!imgChanged.image &&
                                        <img src={`${cnf.s3_base_url}${getCategoryViewState.category.image}`} alt="" style={{ maxWidth: "100%", maxHeight: 150 }} />}
                                    <Input type="file" name="image"
                                        onChange={e => {
                                            setImgChanged({ ...imgChanged, ['image']: true })
                                            set_image(e.target.files[0])
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter="24" >
                            <Col span="12" >
                                <Form.Item
                                    label="Banner Image"
                                    name="banner_img"
                                    extra={<span>JPEG, JPG, PNG, WEBP | 4:1 Ratio  </span>}
                                >
                                    {!imgChanged.banner_img &&
                                        <img src={`${cnf.s3_base_url}${getCategoryViewState.category.banner_img}`} alt="" style={{ maxWidth: "100%", maxHeight: 150 }} />}
                                    <Input type="file" name="banner_img"
                                        onChange={e => {
                                            setImgChanged({ ...imgChanged, ['banner_img']: true })
                                            set_banner_img(e.target.files[0])
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span="12" >
                                <Form.Item
                                    label="Banner Image For Mobile"
                                    name="m_banner_img"
                                    extra={<span>JPEG, JPG, PNG, WEBP | 3:2 Ratio  </span>}
                                >
                                    {!imgChanged.m_banner_img &&
                                        <img src={`${cnf.s3_base_url}${getCategoryViewState.category.m_banner_img}`} alt="" style={{ maxWidth: "100%", maxHeight: 150 }} />}
                                    <Input type="file" name="m_banner_img"
                                        onChange={e => {
                                            setImgChanged({ ...imgChanged, ['m_banner_img']: true })
                                            set_m_banner_img(e.target.files[0])
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" loading={submitLoading} >SUBMIT</Button>

                    </Form>
                }
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getCategoryTreeState: state.getCategoryTree,
    getCategoryViewState: state.getCategoryView,
    updateCategoryState: state.updateCategory,
})

const mapDispatchToProps = (dispatch) => ({
    getCategoryTree: (params) => dispatch(getCategoryTree(params)),
    getCategoryTreeReset: () => dispatch(getCategoryTreeReset()),
    getCategoryView: (params) => dispatch(getCategoryView(params)),
    getCategoryViewReset: () => dispatch(getCategoryViewReset()),
    updateCategory: (params) => dispatch(updateCategory(params)),
    updateCategoryReset: () => dispatch(updateCategoryReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit)