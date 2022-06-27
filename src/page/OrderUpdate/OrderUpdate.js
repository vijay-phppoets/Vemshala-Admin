import React, { useEffect, useState } from "react"
import { Button, Table, Space, Select, Form, Row, Col, message } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import cnf from "../../config"
/* actions */
import { getOrderDetails, getOrderDetailsReset } from "../../action/getOrderDetailsAction"
import { updateOrder, updateOrderReset } from "../../action/updateOrderAction"


const OrderList = props => {
    /* variables */
    const [form] = Form.useForm()
    const order_id = props.match.params.order_id
    const {
        getOrderDetails, getOrderDetailsReset, getOrderDetailsState,
        updateOrder, updateOrderReset, updateOrderState
    } = props
    const [redirect, setRedirect] = useState([false, ''])
    const [orderData, setOrderData] = useState([])
    const [tableData, setTableData] = useState([])
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (<img src={`${cnf.s3_base_url}${image}`} alt="" style={{ width: 50 }} />)
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (product_name) => (<span>{product_name}</span>)
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => (<span>{quantity}</span>)
        },
        {
            title: 'Buy Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (<span>{orderData.payment_type == "USD" ? <>$</> : <>₹</>}{price}</span>)
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => (<span>{orderData.payment_type == "USD" ? <>$</> : <>₹</>}{total}</span>)
        }
    ];
    const [formData, setFormData] = useState({
        status: "",
        order_id: order_id,
        currencyType: getOrderDetailsState.order.payment_type,
    })

    /* callbacks */
    useEffect(() => {
        getOrderDetails({ order_id: order_id })
    }, [])

    useEffect(() => {
        if (getOrderDetailsState.apiState === "success") {
            setOrderData(getOrderDetailsState.order)
            let ar = []
            getOrderDetailsState.order.items.map(obj => {
                ar.push({
                    key: obj.product_id,
                    product_name: obj.product_name,
                    image: obj.thumbnail,
                    quantity: obj.quantity,
                    price: obj.price,
                    total: obj.total,
                    id: obj.product_id,
                })
            })
            setTableData(ar)
            // Form set 
            form.setFieldsValue({
                status: getOrderDetailsState.order.status,
            })
            setFormData({
                ...formData,
                ['status']: getOrderDetailsState.order.status,
            })
        }
    }, [getOrderDetailsState])

    useEffect(() => {
        if (updateOrderState.apiState === "success") {
            setRedirect([true, '/order_management/list'])
            message.success(updateOrderState.message);
        }

        if (updateOrderState.apiState === "error") {
            updateOrderReset()
            message.error(updateOrderState.message);
        }
    }, [updateOrderState])

    const handleNumberChange = (name, value) => {
        console.log(name, value)
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = () => {
        updateOrder(formData)
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}
            <Header
                title="Order Details"
            />
            <PageContainer >
                <div style={{ border: "solid 1px #ccc", padding: 20 }} >
                    <table width="100%" >
                        <tr>
                            <td width="20%" height="30px"><b>Order ID: </b></td>
                            <td width="30%">#{orderData.order_no}</td>
                            <td width="20%"><b> Order Status:</b></td>
                            <td width="30%">{orderData.status}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Customer Name:</b></td>
                            <td>{orderData.b_fname + ' ' + orderData.b_lname}</td>
                            <td><b>E-Mail:</b></td>
                            <td>{orderData.b_email}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Order Date:</b></td>
                            <td>{orderData.order_date}</td>
                            <td><b>Order Total:</b></td>
                            <td>{orderData.payment_type == "USD" ? <>$</> : <>₹</>}{orderData.grand_total}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Payment Mode:</b></td>
                            <td>{orderData.payment_mode}</td>
                            <td><b>Shipping Charge</b></td>
                            <td>{orderData.payment_type == "USD" ? <>$</> : <>₹</>}{orderData.shipping_charge}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Coupon Code:</b></td>
                            <td>{orderData.coupon_code}</td>
                            <td><b>Order Discount:</b></td>
                            <td>{orderData.discount}</td>
                        </tr>
                    </table>
                </div>
                {/* <div style={{ border: "solid 1px #ccc", padding: 20, marginTop: "10px" }} >
                    <h3>Item Details</h3>
                    <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
                </div> */}
                <div style={{ border: "solid 1px #ccc", padding: 20, marginTop: "10px" }} >
                    <h3>Update Status</h3>
                    <Form layout="vertical" form={form} onFinish={handleSubmit} >
                        <Row gutter="24" >
                            <Col span="12">
                                <Form.Item
                                    label="Status"
                                    name="status"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Select name="status" placeholder="Select Status"
                                        onSelect={v => handleNumberChange("status", v)}
                                    >
                                        <Select.Option key="processing" value="processing" >Processing</Select.Option>
                                        <Select.Option key="shipped" value="shipped">Shipped</Select.Option>
                                        <Select.Option key="delivered" value="delivered">Delivered</Select.Option>
                                        <Select.Option key="cancelled" value="cancelled">Cancelled</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button type="primary" htmlType="submit">SUBMIT</Button>
                    </Form>
                </div>

            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getOrderDetailsState: state.getOrderDetails,
    updateOrderState: state.updateOrder,
})

const mapDispatchToProps = (dispatch) => ({
    getOrderDetails: (params) => dispatch(getOrderDetails(params)),
    getOrderDetailsReset: () => dispatch(getOrderDetailsReset()),
    updateOrder: (params) => dispatch(updateOrder(params)),
    updateOrderReset: () => dispatch(updateOrderReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)