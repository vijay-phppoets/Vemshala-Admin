import React from "react"

// @custom-component-imports ------------------------------------------------------------------------ 

    import Header from "../../../component/Header/Header"
    import { PageContainer } from "../../../component/Xcomponent"
    import { Form, Row, Col,Input } from "antd"

// --------------------------------------------------------------------------------------------------

const CouponsList = () => {
    return (
    <React.Fragment>
        <Header title="New Coupons"></Header>
        <PageContainer>
            <Form layout="vertical" onFinish={() => { console.log('') }} >
                <Row gutter="24" >
                    <Col span="6">
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Required' }]}>
                            <Input name="name" placeholder="Enter Coupon Name" onChange={() => console.log('')}/>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Code" name="code" rules={[{ required: true, message: 'Required' }]}>
                            <Input name="name" placeholder="Enter Coupon Code" onChange={() => console.log('')}/>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Required' }]}>
                            <Input name="name" placeholder="Enter Coupon Price" onChange={() => console.log('')}/>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Expiry Date" name="expiry_date" rules={[{ required: true, message: 'Required' }]}>
                            <Input name="name" placeholder="Enter Coupon Name" onChange={() => console.log('')}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </PageContainer>
    </React.Fragment>
)}

export default CouponsList