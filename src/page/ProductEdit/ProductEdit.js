import React, { useState, useEffect } from "react"
import { Form, Row, Col, Select, Button, Input, InputNumber, message, TreeSelect, Switch } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import ProductTabs from "../../component/ProductTabs/ProductTabs"

/* actions */
import { getProductView, getProductViewReset } from "../../action/getProductViewAction"
import { updateProduct, updateProductReset } from "../../action/updateProductAction"
import { getCategoryTree, getCategoryTreeReset } from "../../action/getCategoryTreeAction"

const { TreeNode } = TreeSelect



const ProductEdit = props => {
    /* variables */
    const product_id = props.match.params.product_id
    const {
        getProductView, getProductViewReset, getProductViewState,
        updateProduct, updateProductReset, updateProductState,
        getCategoryTree, getCategoryTreeReset, getCategoryTreeState,
    } = props
    const [redirect, setRedirect] = useState([false, ''])
    const [form] = Form.useForm()
    const [formData, setFormData] = useState({
        product_id: product_id,
        type: "",
        status: "enabled",
        name: "",
        url_key: "",
        price: "",
        is_sale_price: "",
        sale_price: "",
        categories: [],
        is_exclusive: "no",
        sku: "",
        short_description: "",
        tags: "",
        stock: "",
        gst: "",
    })

    /* callbacks */
    useEffect(() => {
        return (() => {
            getProductViewReset()
            updateProductReset()
            getCategoryTreeReset()
        })
    }, [])


    useEffect(() => {
        getCategoryTree()
        getProductView({
            product_id: product_id
        })
    }, [])

    useEffect(() => {
        if (getProductViewState.apiState === "success") {
            form.setFieldsValue({
                type: getProductViewState.product.type,
                status: getProductViewState.product.status,
                name: getProductViewState.product.name,
                url_key: getProductViewState.product.url_key,
                price: getProductViewState.product.price,
                is_sale_price: getProductViewState.product.is_sale_price,
                sale_price: getProductViewState.product.sale_price,
                categories: getProductViewState.product.categories,
                sku: getProductViewState.product.sku,
                short_description: getProductViewState.product.short_description,
                tags: getProductViewState.product.tags,
                stock: getProductViewState.product.stock,
                gst: getProductViewState.product.gst,
            })
            setFormData({
                ...formData,
                ['type']: getProductViewState.product.type,
                ['status']: getProductViewState.product.status,
                ['name']: getProductViewState.product.name,
                ['url_key']: getProductViewState.product.url_key,
                ['price']: getProductViewState.product.price,
                ['is_sale_price']: getProductViewState.product.is_sale_price,
                ['sale_price']: getProductViewState.product.sale_price,
                ['categories']: getProductViewState.product.categories,
                ['is_exclusive']: getProductViewState.product.is_exclusive,
                ['sku']: getProductViewState.product.sku,
                ['short_description']: getProductViewState.product.short_description,
                ['tags']: getProductViewState.product.tags,
                ['stock']: getProductViewState.product.stock,
                ['gst']: getProductViewState.product.gst,
            })
        }
    }, [getProductViewState])

    useEffect(() => {
        if (updateProductState.apiState === "success") {
            setRedirect([true, '/product/list'])
            message.success(updateProductState.message);
        }

        if (updateProductState.apiState === "error") {
            updateProductReset()
            message.error(updateProductState.message);
        }
    }, [updateProductState])

    /* functions */
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

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNumberChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSelect = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        updateProduct(formData)
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
                        <ProductTabs id={getProductViewState.product.id} active="basic_info" type={getProductViewState.product.type} />
                        <Form layout="vertical" form={form} onFinish={handleSubmit} >
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Product Type"
                                        name="type"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select name="type" placeholder="Select Product Type"
                                            onSelect={v => handleNumberChange("type", v)}
                                            disabled
                                        >
                                            <Select.Option key="simple" value="simple">Simple</Select.Option>
                                            <Select.Option key="variant" value="variant">Variant</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Status"
                                        name="status"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select name="status" placeholder="Select Status"
                                            onSelect={v => handleNumberChange("status", v)}
                                        >
                                            <Select.Option key="enabled" value="enabled" >Enabled</Select.Option>
                                            <Select.Option key="disabled" value="disabled">Disabled</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="SKU"
                                        name="sku"
                                    >
                                        <Input name="sku" placeholder="Enter SKU"
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                {getProductViewState.product.type === "simple" &&
                                    <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                        <Form.Item
                                            label="Stock"
                                            name="stock"
                                        >
                                            <InputNumber name="stock" placeholder="Enter Stock"
                                                onChange={v => handleNumberChange("stock", v)}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                }
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input name="name" placeholder="Enter Name"
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        label="URL key"
                                        name="url_key"
                                        rules={[
                                            { required: true, message: 'Required' },
                                            {
                                                pattern: new RegExp('^[a-zA-Z0-9-.]+$'),
                                                message: "This field must be a valid url. It should only contain alphanumeric character, dash(-) and dot(.)"
                                            }
                                        ]}
                                    >
                                        <Input name="url_key" placeholder="Enter URL key"
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Price"
                                        name="price"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <InputNumber name="price" placeholder="Enter Price" style={{ width: "100%" }} min={0}
                                            onChange={v => handleNumberChange("price", v)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Set Sale Price"
                                        name="is_sale_price"
                                    >
                                        <Select name="is_sale_price" placeholder="Select Sale Price Rule" defaultValue="no"
                                            onSelect={v => handleNumberChange("is_sale_price", v)}
                                        >
                                            <Select.Option key="yes" value="yes">Yes</Select.Option>
                                            <Select.Option key="no" value="no">No</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Sale Price"
                                        name="sale_price"
                                    >
                                        <InputNumber name="sale_price" placeholder="Enter Sale Price" style={{ width: "100%" }} min={0}
                                            onChange={v => handleNumberChange("sale_price", v)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="GST"
                                        name="gst"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select name="gst" placeholder="Select GST" defaultValue="Select GST"
                                            onSelect={v => handleNumberChange("gst", v)}
                                        >
                                            <Select.Option key="5" value="5">5</Select.Option>
                                            <Select.Option key="12" value="12">12</Select.Option>
                                            <Select.Option key="18" value="18">18</Select.Option>
                                            <Select.Option key="28" value="28">28</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        label="Categories"
                                        name="categories"
                                    >
                                        <TreeSelect
                                            showSearch
                                            filterTreeNode={(input, treeNode) =>
                                                treeNode.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Select categories"
                                            allowClear
                                            multiple
                                            treeDefaultExpandAll
                                            onChange={(value, node) => handleSelect("categories", value)}
                                            showCheckedStrategy={TreeSelect.SHOW_ALL}
                                        >
                                            {categoryOptions(getCategoryTreeState.tree)}
                                        </TreeSelect>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        label="Is Exclusive?"
                                        name="is_exclusive"
                                    >
                                        <Switch name="is_exclusive" checkedChildren="Yes" unCheckedChildren="No"
                                            onChange={checked => setFormData({ ...formData, ['is_exclusive']: checked ? "yes" : "no" })}
                                            defaultChecked={getProductViewState.product.is_exclusive === "yes" ? true : false}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        label="Short Description"
                                        name="short_description"
                                    >
                                        <Input.TextArea name="short_description" placeholder="Enter Short Description"
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        label="Tags (comma separted)"
                                        name="tags"
                                    >
                                        <Input.TextArea name="tags" placeholder="Enter comma separted Tags"
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Button type="primary" htmlType="submit" loading={updateProductState.apiState === "loading"} >SUBMIT</Button>
                        </Form>
                    </>
                }
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getProductViewState: state.getProductView,
    updateProductState: state.updateProduct,
    getCategoryTreeState: state.getCategoryTree,
})

const mapDispatchToProps = (dispatch) => ({
    getProductView: (params) => dispatch(getProductView(params)),
    getProductViewReset: () => dispatch(getProductViewReset()),
    updateProduct: (params) => dispatch(updateProduct(params)),
    updateProductReset: () => dispatch(updateProductReset()),
    getCategoryTree: (params) => dispatch(getCategoryTree(params)),
    getCategoryTreeReset: () => dispatch(getCategoryTreeReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)