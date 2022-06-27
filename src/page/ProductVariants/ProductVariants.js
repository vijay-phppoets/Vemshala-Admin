import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
    Select, Form, Row, Col, Button, message, Divider, Alert, InputNumber, Table, Switch,
    Space, Popconfirm, Input
} from "antd"
import _ from "lodash"
import { DeleteOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import ProductTabs from "../../component/ProductTabs/ProductTabs"

/* actions */
import { getProductView, getProductViewReset } from "../../action/getProductViewAction"
import { getAttributeList, getAttributeListReset } from "../../action/getAttributeListAction"
import { saveAttributeForVariants, saveAttributeForVariantsReset } from "../../action/saveAttributeForVariantsAction"
import { createProductVariant, createProductVariantReset } from "../../action/createProductVariantAction"
import { getProductVariantList, getProductVariantListReset } from "../../action/getProductVariantListAction"
import { saveSpProdData, saveSpProdDataReset } from "../../action/saveSpProdDataAction"
import { saveSpImgData, saveSpImgDataReset } from "../../action/saveSpImgDataAction"
import { delProdVar, delProdVarReset } from "../../action/delProdVarAction"

const ProductVariants = props => {
    /* variables */
    const product_id = props.match.params.product_id
    const {
        getProductView, getProductViewReset, getProductViewState,
        getAttributeList, getAttributeListReset, getAttributeListState,
        saveAttributeForVariants, saveAttributeForVariantsReset, saveAttributeForVariantsState,
        createProductVariant, createProductVariantReset, createProductVariantState,
        getProductVariantList, getProductVariantListReset, getProductVariantListState,
        saveSpProdData, saveSpProdDataReset, saveSpProdDataState,
        saveSpImgData, saveSpImgDataReset, saveSpImgDataState,
        delProdVar, delProdVarReset, delProdVarState,
    } = props
    const [attributes_for_variants, set_attributes_for_variants] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [form] = Form.useForm()
    const [form2] = Form.useForm()
    const [form3] = Form.useForm()
    const [variant_data, set_variant_data] = useState({
        attributes: [],
        stock: 0,
        price: 0,
        product_id: product_id
    })
    const [columns, set_columns] = useState([])
    const [tableData, setTableData] = useState([])
    const [separateProductData, setSeparateProductData] = useState({
        product_id: product_id,
        display_separate: false,
        attribute_id: ""
    })
    const [separateImgData, setSeparateImgData] = useState({
        product_id: product_id,
        display_separate: false,
        attribute_id: ""
    })

    /* callbacks */
    useEffect(() => {
        return (() => {
            getProductViewReset()
            getAttributeListReset()
            saveAttributeForVariantsReset()
            createProductVariantReset()
            getProductVariantListReset()
            saveSpProdDataReset()
            saveSpImgDataReset()
            delProdVarReset()
        })
    }, [])


    useEffect(() => {
        getProductView({
            product_id: product_id
        })
        getAttributeList({
            nature: "variant"
        })
    }, [refresh])

    useEffect(() => {
        if (getProductViewState.apiState === "success") {
            if (getProductViewState.product.attributes_for_variants) {
                form.setFieldsValue({
                    attributes_for_variants: getProductViewState.product.attributes_for_variants.split(",")
                })
                set_attributes_for_variants(getProductViewState.product.attributes_for_variants.split(","))
            }

            if (getProductViewState.product.variant_count > 0) {
                getProductVariantList({ product_id: product_id })
            }

            form2.setFieldsValue({
                display_separate: getProductViewState.product.display_separate_product_by_attribute ? true : false,
                display_separate_attribute_id: getProductViewState.product.display_separate_product_by_attribute,
            })
            setSeparateProductData({
                ...separateProductData,
                ["display_separate"]: getProductViewState.product.display_separate_product_by_attribute ? true : false,
                ["attribute_id"]: getProductViewState.product.display_separate_product_by_attribute
            })

            form3.setFieldsValue({
                display_separate_img: getProductViewState.product.attribute_for_separate_images ? true : false,
                display_separate_img_attribute_id: getProductViewState.product.attribute_for_separate_images,
            })
            setSeparateImgData({
                ...separateImgData,
                ["display_separate"]: getProductViewState.product.attribute_for_separate_images ? true : false,
                ["attribute_id"]: getProductViewState.product.attribute_for_separate_images
            })

        }
    }, [getProductViewState])

    useEffect(() => {
        if (saveAttributeForVariantsState.apiState === "success") {
            message.success(saveAttributeForVariantsState.message);
            setRefresh(refresh + 1)
            saveAttributeForVariantsReset()
        }

        if (saveAttributeForVariantsState.apiState === "error") {
            saveAttributeForVariantsReset()
            message.error(saveAttributeForVariantsState.message);
        }
    }, [saveAttributeForVariantsState])

    useEffect(() => {
        if (createProductVariantState.apiState === "success") {
            setRefresh(refresh + 1)
            createProductVariantReset()
            message.success(createProductVariantState.message);
        }

        if (createProductVariantState.apiState === "error") {
            createProductVariantReset()
            message.error(createProductVariantState.message);
        }
    }, [createProductVariantState])

    useEffect(() => {
        if (getProductVariantListState.apiState === "success") {
            let columns = []

            getProductVariantListState.list[0].attributes.map(obj => {
                columns.push({
                    title: obj.name,
                    dataIndex: obj.name,
                    key: obj.name,
                })
            })
            columns.push({
                title: "Name",
                dataIndex: "name",
                key: "name",
            }, {
                title: "Price",
                dataIndex: "price",
                key: "Price",
            }, {
                title: "Is Sale Price",
                dataIndex: "is_sale_price",
                key: "is_sale_price",
            }, {
                title: "Sale Price",
                dataIndex: "sale_price",
                key: "sale_price",
            }, {
                title: "Stock",
                dataIndex: "stock",
                key: "Stock",
            }, {
                title: 'Action',
                dataIndex: 'id',
                key: 'action',
                render: (id) => (
                    <Popconfirm
                        title="Are you sure to delete this variant?"
                        onConfirm={() => delProdVar({
                            product_id: product_id,
                            product_variant_id: id
                        })}
                        okText="Delete"
                        cancelText="Cancel"
                        okType="danger"
                    >
                        <Button size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                )
            })
            set_columns(columns)

            let tableData = []
            getProductVariantListState.list.map(p => {
                let rowObj = {}
                rowObj.key = p.id
                rowObj.name = p.name
                rowObj.price = p.price
                rowObj.is_sale_price = p.is_sale_price
                rowObj.sale_price = p.sale_price
                rowObj.stock = p.stock
                rowObj.id = p.id
                p.attributes.map(obj => {
                    rowObj[obj.name] = obj.option_value
                })
                tableData.push(rowObj)
            })
            setTableData(tableData)
        }
    }, [getProductVariantListState])

    useEffect(() => {
        if (saveSpProdDataState.apiState === "success") {
            setRefresh(refresh + 1)
            saveSpProdDataReset()
            message.success(saveSpProdDataState.message);
        }

        if (saveSpProdDataState.apiState === "error") {
            saveSpProdDataReset()
            message.error(saveSpProdDataState.message);
        }
    }, [saveSpProdDataState])

    useEffect(() => {
        if (saveSpImgDataState.apiState === "success") {
            setRefresh(refresh + 1)
            saveSpImgDataReset()
            message.success(saveSpImgDataState.message);
        }

        if (saveSpImgDataState.apiState === "error") {
            saveSpImgDataReset()
            message.error(saveSpImgDataState.message);
        }
    }, [saveSpImgDataState])

    useEffect(() => {
        if (delProdVarState.apiState === "success") {
            message.success(delProdVarState.message);
            setRefresh(refresh + 1)
            delProdVarReset()
        }

        if (delProdVarState.apiState === "error") {
            delProdVarReset()
            message.error(delProdVarState.message);
        }
    }, [delProdVarState])


    /* functions */
    const handleAttributeForVariantsSubmit = () => {
        saveAttributeForVariants({
            product_id: product_id,
            attributes: attributes_for_variants
        })
    }

    const handleAttributeChange = (obj) => {
        let arr = variant_data.attributes
        if (_.findIndex(arr, { 'attr_id': obj.attr_id }) > -1) {
            arr = arr.filter(item => item.attr_id !== obj.attr_id)
        }
        arr.push(obj)
        set_variant_data({ ...variant_data, ['attributes']: arr })
    }

    const renderVariantForm = () => {
        let jsx = []
        getAttributeListState.list.map(attr => {
            let attributes_for_variants = getProductViewState.product.attributes_for_variants.split(",")
            if (attributes_for_variants.includes(attr.id)) {
                jsx.push(
                    <Col span="6">
                        <Form.Item
                            name={`attribute_${attr.id}`}
                            label={`${attr.name}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select
                                onChange={v => handleAttributeChange({ attr_id: attr.id, option_id: v })}
                                placeholder={`Select ${attr.name}`}
                                name={`attribute_${attr.id}`}
                            >
                                {attr.options.map(option => (
                                    <Select.Option key={option.id} value={option.id} >{option.option_value}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                )
            }
        })
        jsx.push(
            <>
                <Col span="6">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input name="name" placeholder="Enter Name"
                            onChange={e => set_variant_data({ ...variant_data, ["name"]: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span="6">
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <InputNumber name="price" placeholder="Enter Price" style={{ width: "100%" }}
                            onChange={v => set_variant_data({ ...variant_data, ["price"]: v })}
                        />
                    </Form.Item>
                </Col>
                <Col span="6">
                    <Form.Item
                        name="is_sale_price"
                        label="Set Sale Price"
                    >
                        <Select name="is_sale_price" placeholder="Select Sale Price Rule" defaultValue="no"
                            onSelect={v => set_variant_data({ ...variant_data, ["is_sale_price"]: v })}
                        >
                            <Select.Option key="yes" value="yes">Yes</Select.Option>
                            <Select.Option key="no" value="no">No</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span="6">
                    <Form.Item
                        name="sale_price"
                        label="Sale Price"
                    >
                        <InputNumber name="sale_price" placeholder="Enter Sale Price" style={{ width: "100%" }}
                            onChange={v => set_variant_data({ ...variant_data, ["sale_price"]: v })}
                        />
                    </Form.Item>
                </Col>
                <Col span="6">
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <InputNumber name="stock" placeholder="Enter Stock" style={{ width: "100%" }}
                            onChange={v => set_variant_data({ ...variant_data, ["stock"]: v })}
                        />
                    </Form.Item>
                </Col>
            </>
        )
        return jsx
    }

    const handleCreateVariantSubmit = () => {
        createProductVariant(variant_data)
    }

    const handleSpProdDataSub = () => {
        if (separateProductData.display_separate) {
            if (!separateProductData.attribute_id) {
                alert("Select an attribute")
                return
            }
        }

        saveSpProdData(separateProductData)
    }

    const handleSpImgDataSub = () => {
        if (separateImgData.display_separate) {
            if (!separateImgData.attribute_id) {
                alert("Select an attribute")
                return
            }
        }

        saveSpImgData(separateImgData)
    }

    return (
        <>
            <Header
                title="Edit Product"
            />
            <PageContainer>
                {(getProductViewState.apiState === "success" && getAttributeListState.apiState === "success") &&
                    <>
                        <ProductTabs id={getProductViewState.product.id} active="variants" type={getProductViewState.product.type} />
                        {getProductViewState.product.variant_count === 0 &&
                            <>
                                <Row >
                                    <Col span="18">
                                        <Form form={form} layout="vertical" onFinish={handleAttributeForVariantsSubmit}>
                                            <Form.Item
                                                name="attributes_for_variants"
                                                label="Select attributes to create variants"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Select
                                                    onChange={v => set_attributes_for_variants(v)}
                                                    placeholder="Select attributes to create variants"
                                                    mode="multiple"
                                                >
                                                    {getAttributeListState.list.map(attr => (
                                                        <Select.Option key={attr.id} value={attr.id} >{`${attr.name} (${attr.type})`}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit" >NEXT</Button>
                                        </Form>
                                    </Col>
                                </Row>
                                <Divider />
                            </>
                        }

                        {getProductViewState.product.variant_count > 0 &&
                            <Alert message="Do you want to change attribute set for product variant? For that you need to delete below variants."
                                type="info" showIcon style={{ marginBottom: 24 }} />
                        }

                        {getProductViewState.product.attributes_for_variants &&
                            <>
                                <h3>Create Variant</h3>
                                <Form layout="vertical" onFinish={handleCreateVariantSubmit} >
                                    <Row gutter="20" >
                                        {renderVariantForm()}
                                    </Row>
                                    <Button type="primary" htmlType="submit" >CREATE VARIANT</Button>
                                </Form>
                                <Divider />
                            </>
                        }

                        {(getProductVariantListState.list).length > 0 &&
                            <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
                        }

                        {/* {getProductViewState.product.attributes_for_variants &&
                            <>
                                <h3 style={{ marginTop: 24 }} >Do you want to display separate products on product-list by attribute?</h3>

                                <Form form={form2} layout="vertical" >
                                    <Row gutter="20" >
                                        <Col span={3}>
                                            <Form.Item name="display_separate">
                                                <Switch name="display_separate"
                                                    onChange={(checked) => setSeparateProductData({ ...separateProductData, ["display_separate"]: checked })}
                                                    defaultChecked={getProductViewState.product.display_separate_product_by_attribute ? true : false}
                                                />
                                            </Form.Item>
                                        </Col>
                                        {separateProductData.display_separate &&
                                            <>
                                                <Col span={8}>
                                                    <Form.Item name="display_separate_attribute_id">
                                                        <Select
                                                            onChange={v => setSeparateProductData({ ...separateProductData, ["attribute_id"]: v })}
                                                            placeholder="Select attribute"
                                                            style={{ width: "100%" }}
                                                            name="display_separate_attribute_id"
                                                        >
                                                            {getAttributeListState.list.map(attr => {
                                                                if (attributes_for_variants.includes(attr.id)) {
                                                                    return (
                                                                        <Select.Option key={attr.id} value={attr.id} >{`${attr.name}`}</Select.Option>
                                                                    )
                                                                }
                                                            }
                                                            )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                            </>
                                        }
                                        <Col span={4}>
                                            <Button type="primary" onClick={handleSpProdDataSub} >SAVE</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </>
                        } */}


                        {getProductViewState.product.attributes_for_variants &&
                            <>
                                <h3 style={{ marginTop: 24 }} >Do you want to display separate images by attribute?</h3>

                                <Form form={form3} layout="vertical" >
                                    <Row gutter="20" >
                                        <Col span={3}>
                                            <Form.Item name="display_separate_img">
                                                <Switch name="display_separate_img"
                                                    onChange={(checked) => setSeparateImgData({ ...separateImgData, ["display_separate"]: checked })}
                                                    defaultChecked={getProductViewState.product.attribute_for_separate_images ? true : false}
                                                />
                                            </Form.Item>
                                        </Col>
                                        {separateImgData.display_separate &&
                                            <>
                                                <Col span={8}>
                                                    <Form.Item name="display_separate_img_attribute_id">
                                                        <Select
                                                            onChange={v => setSeparateImgData({ ...separateImgData, ["attribute_id"]: v })}
                                                            placeholder="Select attribute"
                                                            style={{ width: "100%" }}
                                                            name="display_separate_img_attribute_id"
                                                        >
                                                            {getAttributeListState.list.map(attr => {
                                                                if (attributes_for_variants.includes(attr.id)) {
                                                                    return (
                                                                        <Select.Option key={attr.id} value={attr.id} >{`${attr.name}`}</Select.Option>
                                                                    )
                                                                }
                                                            }
                                                            )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                            </>
                                        }
                                        <Col span={4}>
                                            <Button type="primary" onClick={handleSpImgDataSub} >SAVE</Button>
                                        </Col>
                                    </Row>
                                </Form>
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
    getAttributeListState: state.getAttributeList,
    saveAttributeForVariantsState: state.saveAttributeForVariants,
    createProductVariantState: state.createProductVariant,
    getProductVariantListState: state.getProductVariantList,
    saveSpProdDataState: state.saveSpProdData,
    saveSpImgDataState: state.saveSpImgData,
    delProdVarState: state.delProdVar,
})

const mapDispatchToProps = (dispatch) => ({
    getProductView: (params) => dispatch(getProductView(params)),
    getProductViewReset: () => dispatch(getProductViewReset()),
    getAttributeList: (params) => dispatch(getAttributeList(params)),
    getAttributeListReset: () => dispatch(getAttributeListReset()),
    saveAttributeForVariants: (params) => dispatch(saveAttributeForVariants(params)),
    saveAttributeForVariantsReset: () => dispatch(saveAttributeForVariantsReset()),
    createProductVariant: (params) => dispatch(createProductVariant(params)),
    createProductVariantReset: () => dispatch(createProductVariantReset()),
    getProductVariantList: (params) => dispatch(getProductVariantList(params)),
    getProductVariantListReset: () => dispatch(getProductVariantListReset()),
    saveSpProdData: (params) => dispatch(saveSpProdData(params)),
    saveSpProdDataReset: () => dispatch(saveSpProdDataReset()),
    saveSpImgData: (params) => dispatch(saveSpImgData(params)),
    saveSpImgDataReset: () => dispatch(saveSpImgDataReset()),
    delProdVar: (params) => dispatch(delProdVar(params)),
    delProdVarReset: () => dispatch(delProdVarReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariants)