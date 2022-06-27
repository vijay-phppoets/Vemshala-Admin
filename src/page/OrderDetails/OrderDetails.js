import React, { useEffect, useState } from "react"
import { Button, Table, Space, Badge } from "antd"
import { connect } from "react-redux"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"
import cnf from "../../config"
/* actions */
import { getOrderDetails, getOrderDetailsReset } from "../../action/getOrderDetailsAction"


const OrderList = props => {
    /* variables */
    const order_id = props.match.params.order_id
    const { getOrderDetails, getOrderDetailsReset, getOrderDetailsState } = props
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
        }
    }, [getOrderDetailsState])


    return (
        <>
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

                <div style={{ border: "solid 1px #ccc", padding: 20, marginTop: "10px" }} >
                    <h3>Item Details</h3>
                    <Table dataSource={tableData} columns={columns} size="small" pagination={false} />
                </div>
                <div style={{ border: "solid 1px #ccc", padding: 20, marginTop: "10px" }} >
                    <h3>Billing Address</h3>
                    <table width="100%" >
                        <tr>
                            <td width="20%" height="30px"><b>Frist Name: </b></td>
                            <td width="30%">#{orderData.b_fname}</td>
                            <td width="20%"><b> Last Name:</b></td>
                            <td width="30%">{orderData.b_lname}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Phone:</b></td>
                            <td>{orderData.b_phone}</td>
                            <td><b>Email:</b></td>
                            <td>{orderData.b_email}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Company Name:</b></td>
                            <td>{orderData.b_company_name}</td>
                            <td><b>Country:</b></td>
                            <td>{orderData.b_country}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>State:</b></td>
                            <td>{orderData.b_state}</td>
                            <td><b>City:</b></td>
                            <td>{orderData.b_city}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Street:</b></td>
                            <td>{orderData.b_street}</td>
                            <td><b>Landmark:</b></td>
                            <td>{orderData.b_landmark}</td>
                        </tr>
                    </table>
                </div>
                <div style={{ border: "solid 1px #ccc", padding: 20, marginTop: "10px" }} >
                    <h3>Shipping Address</h3>
                    <table width="100%" >
                        <tr>
                            <td width="20%" height="30px"><b>Frist Name: </b></td>
                            <td width="30%">#{orderData.s_fname}</td>
                            <td width="20%"><b> Last Name:</b></td>
                            <td width="30%">{orderData.s_lname}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Phone:</b></td>
                            <td>{orderData.s_phone}</td>
                            <td><b>Email:</b></td>
                            <td>{orderData.s_email}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Company Name:</b></td>
                            <td>{orderData.s_company_name}</td>
                            <td><b>Country:</b></td>
                            <td>{orderData.s_country}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>State:</b></td>
                            <td>{orderData.s_state}</td>
                            <td><b>City:</b></td>
                            <td>{orderData.s_city}</td>
                        </tr>
                        <tr>
                            <td height="30px"><b>Street:</b></td>
                            <td>{orderData.s_street}</td>
                            <td><b>Landmark:</b></td>
                            <td>{orderData.s_landmark}</td>
                        </tr>
                    </table>
                </div>
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getOrderDetailsState: state.getOrderDetails,
})

const mapDispatchToProps = (dispatch) => ({
    getOrderDetails: (params) => dispatch(getOrderDetails(params)),
    getOrderDetailsReset: () => dispatch(getOrderDetailsReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)