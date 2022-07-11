import React from "react";
import { Row, Col, Card, DatePicker,Button } from "antd";
import { ExportToCsv } from 'export-to-csv';

/* @custom component ------------------------------------------------------------------------------------------- */
    
    import Header from "../../component/Header/Header";
    import { PageContainer }   from "../../component/Xcomponent";
    import getDashboardDetails from "../../api/getDashboardDetails";
    
/* ------------------------------------------------------------------------------------------------------------- */

const Home = (props) => {

    // @declare-states --------------------------------------------------------------------------------

        const dashboardDefaultStates = {
            orders    : { total : 0, today : 0 },
            cancelled : { total : 0, today : 0 },
            others    : { 
                deliveredOrders  : 0,
                shippedOrders    : 0,
                processingOrders : 0,
                pendingOrders    : 0,
            }
        }

        const dateFilterState = {
            startDate : "",
            endDate   : "", 
        } 

        const [dateFilter,updateDateFilter] = React.useState({ ...dateFilterState })
        const [details,updateDetails] = React.useState({ ...dashboardDefaultStates })

    // ------------------------------------------------------------------------------------------------

    const xlsxExport = () => {

        var data = [
            {
              Name: 'Test 1',
              Age: 13,
              Average: 8.2,
              Approved: true,
              Description: "using 'Content here, content here' "
            },
            {
              Name: 'Test 2',
              Age: 11,
              Average: 8.2,
              Approved: true,
              Description: "using 'Content here, content here' "
            },
            {
              Name: 'Test 4',
              Age: 10,
              Average: 8.2,
              Approved: true,
              Description: "using 'Content here, content here' "
            },
          ];

        const options = { 
            filename:"Monthly-Sales",
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: false, 
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            headers: []
          };

        const csvExporter = new ExportToCsv(options);
 
        csvExporter.generateCsv(data);
    }

    const dateChangeHandler = (date,name) => { updateDateFilter({ ...dateFilter, [name] : date }) };

    const searchHandler = () => { 
        
        if(dateFilter.startDate === "" || dateFilter.endDate === "") {
            return alert('Please select date');
        }
    
        return getDashboard();
    }

    const getDashboard = async () => {

        try {

            const { data } = await getDashboardDetails(dateFilter)

            if(data.status !== 'success') throw new Error(data.message);

            updateDetails({
                orders    : { today : data.data.todayOrders,    total : data.data.totalOrders },
                cancelled : { total : data.data.totalCancelled, today : data.data.todayCancelled },
                others    : { 
                    deliveredOrders  : data.data.deliveredOrders, 
                    shippedOrders    : data.data.shippedOrders,
                    processingOrders : data.data.processingOrders,
                    pendingOrders    : data.data.pendingOrders 
                }
            })

        } catch (error) { console.clear(); console.log(error); }
    }

    React.useEffect(() => { getDashboard(); return () => { return false; } },[])

  return (
    <React.Fragment>
        <Header title="" />
        <PageContainer>
            <div className="site-card-wrapper dashboard-fieldset">
                <h3 className="dashboard-fieldset-heading"><b>Dashboard</b></h3>

                <Row gutter={16} className="dashboard-date-filter">
                    <Col span={6}><DatePicker className="date-picker" placeholder="From date" onChange={(date,stringDate) => dateChangeHandler(stringDate,'startDate') } /></Col>
                    <Col span={6}><DatePicker className="date-picker" placeholder="To date"   onChange={(date,stringDate) => dateChangeHandler(stringDate,'endDate') } /></Col>
                    <Col span={6}>
                            <Button onClick={searchHandler} className="ant-btn ant-btn-primary">Search</Button>
                            <Button onClick={xlsxExport}    className="ant-btn ant-btn-primary xlsx-export">Export</Button>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Card className="dashboard-card orders-card">
                            <p className="today-orders">Today Orders : { details.orders.today }</p>
                            <p className="total-orders">Total Orders : { details.orders.total }</p>
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
                            <p className="today-cancelled-orders">Today Cancelled Orders : { details.cancelled.today }</p>
                            <p className="total-cancelled-orders">Total Cancelled Orders : { details.cancelled.total }</p>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card className="dashboard-card other-orders-details">
                            <p>Processing Orders : { details.others.processingOrders }</p>
                            <p>Shipped Orders : { details.others.shippedOrders }</p>
                            <p>Delivered Orders : { details.others.deliveredOrders }</p>
                            <p>Pending Orders : { details.others.pendingOrders }</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </PageContainer>
    </React.Fragment>
)};

export default Home;
