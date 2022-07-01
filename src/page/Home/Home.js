import React from "react";
import { Row, Col, Card, DatePicker,Button } from "antd";

/* @custom component ------------------------------------------------------------------------------------------- */
    
    import Header from "../../component/Header/Header";
    import { PageContainer } from "../../component/Xcomponent";

/* ------------------------------------------------------------------------------------------------------------- */

const Home = (props) => {

    const onChange = (date, dateString) => {
        console.log({date, dateString});
    };

  return (
    <React.Fragment>
        <Header title="" />
        <PageContainer>
            <div className="site-card-wrapper dashboard-fieldset">
                <h3 className="dashboard-fieldset-heading"><b>Dashboard</b></h3>

                <Row gutter={16} className="dashboard-date-filter">
                    <Col span={6}><DatePicker className="date-picker" placeholder="From date" onChange={onChange} /></Col>
                    <Col span={6}><DatePicker className="date-picker" placeholder="To date" onChange={onChange} /></Col>
                    <Col span={6}><Button className="ant-btn ant-btn-primary ant-btn-block">Search</Button></Col>
                </Row>

                

                <Row gutter={16}>
                    <Col span={8}>
                        <Card className="dashboard-card orders-card">
                            <p className="today-orders">Today Orders : 25</p>
                            <p className="total-orders">Total Orders : 120</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="dashboard-card sales-card">
                            <p className="today-sales">Today Sales : 25 ₹</p>
                            <p className="total-sales">Total Sales : 120 ₹</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="dashboard-card cancelled-orders-card">
                        <p className="today-cancelled-orders">Today Cancelled Orders : 25</p>
                            <p className="total-cancelled-orders">Total Cancelled Orders: 120</p>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card className="dashboard-card other-orders-details">
                            <p>COD Orders : 150</p>
                            <p>YTD Orders : 150</p>
                            <p>MTD Orders : 150</p>
                            <p>Online Orders : 150</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </PageContainer>
    </React.Fragment>
)};

export default Home;


// Show orders details at " Dashboard" Side bar item 

// "Total Sales",
// "Cancelled Orders", 
// "CoD Orders,YTD Orders, MTD Orders, Todays' Orders"  
// also add date filter. Orders Processed / Orders Pending