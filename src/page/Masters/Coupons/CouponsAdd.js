import React from "react"

// @custom-component-imports ------------------------------------------------------------------------ 

    import Header from "../../../component/Header/Header"
    import { PageContainer } from "../../../component/Xcomponent"
    import { Form, Row, Col,Input,Select,Button } from "antd"
    import saveCouponsApi from '../../../api/saveCouponsApi'

// --------------------------------------------------------------------------------------------------

const onSearch = (value) => { console.clear(); console.log('search:', value); };

const CouponsList = (props) => {

    const [couponState,updateCouponState] = React.useState({
        'customer_id'  : null,
        'coupon_name'  : null,
        'coupon_code'  : null,
        'coupon_price' : null,
        'coupon_expiry_date' : null
    })

    const saveCoupons = async () => {

        try {

            const { data } = await saveCouponsApi(couponState)

            console.clear(); 
            console.log('form is ready to submit'); 
            console.log({couponState,data})
            
        } catch (error) { console.clear(); console.log(error) }
    }

    return (
    <React.Fragment>
        <Header title="New Coupons"></Header>
        <PageContainer>
            <Form layout="vertical" onFinish={saveCoupons} >
                <Row gutter="24" >
                    <Col span="6">
                        <Form.Item label="Customer Name" name="customer_name" rules={[{ required: true, message: 'Required' }]}>
                            <Select showSearch placeholder="Select a customer" optionFilterProp="children" onChange={(value) => { updateCouponState({ ...couponState,['customer_id'] : value }) }}  onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                                <Select.Option value="tom">Tom</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Name" name="coupon_name" rules={[{ required: true, message: 'Please enter coupon name' }]}>
                            <Input name="coupon_name" placeholder="Enter Coupon Name" onChange={(event) => { updateCouponState({ ...couponState,[event.target.name] : event.target.value }) }}/>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Code" name="coupon_code" rules={[{ required: true, message: 'Please enter coupon code' }]}>
                            <Input name="coupon_code" placeholder="Enter Coupon Code" onChange={(event) => { updateCouponState({ ...couponState,[event.target.name] : event.target.value }) }}/>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Price" name="coupon_price" rules={[{ required: true, message: 'Please enter coupon price' }]}>
                            <Input name="coupon_price" placeholder="Enter Coupon Price" onChange={(event) => { updateCouponState({ ...couponState,[event.target.name] : event.target.value }) }}/>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item label="Expiry Date" name="coupon_expiry_date" rules={[{ required: true, message: 'Please select expiry date' }]}>
                            <Input name="coupon_expiry_date" type="date" placeholder="Enter Coupon Name" onChange={(event) => { updateCouponState({ ...couponState,[event.target.name] : event.target.value }) }}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={false} >SUBMIT</Button>
                    </Col>
                </Row>
            </Form>
        </PageContainer>
    </React.Fragment>
)}

export default CouponsList