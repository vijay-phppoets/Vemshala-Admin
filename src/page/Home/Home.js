import React from "react";
import { Row, Col, Card, DatePicker,Button } from "antd";
import { ExportToCsv } from 'export-to-csv';

/* @custom component ------------------------------------------------------------------------------------------- */
    
    import Header from "../../component/Header/Header";
    import { PageContainer }   from "../../component/Xcomponent";
    import getDashboardDetails from "../../api/getDashboardDetails";
    import getSalesExport      from '../../api/getSalesExport'
    
/* ------------------------------------------------------------------------------------------------------------- */

const Home = (props) => {

    // @declare-states --------------------------------------------------------------------------------

        const exportOptions = { 
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

        const dashboardDefaultStates = {
            orders    : { total : 0, today : 0 },
            sales     : { total : 0, today : 0 },
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

    const xlsxExport = async () => {

        console.clear(); console.clear();

        try {

            const csvExporterData = [];

            const { data } = await getSalesExport(dateFilter)

            for (const salesData of data.data) {

                const dateBeautify = (date) => {

                    const month = String(date.getUTCMonth() + 1);
                    const day  = String(date.getUTCDate())
              
                    return `${date.getUTCFullYear()}-${month.padStart(2, "0")}-${day.padStart(2,"0")}`
                }

                csvExporterData.push({
                    'Customer Name' : `${salesData.b_fname} ${salesData.b_lname}`,
                    'Product'       :  salesData.productName,
                    'Price'         :  salesData.productPrice,
                    'Payment Mode'  :  salesData.payment_mode,
                    'Order Date'    :  dateBeautify(new Date(salesData.order_date)),
                    'Payment Type'  :  salesData.payment_type,
                    'Sub Total'     :  salesData.sub_total,
                    'Total'         :  salesData.total,
                })
            }

            const csvExporter = new ExportToCsv(exportOptions);
 
            csvExporter.generateCsv(csvExporterData);
            
        } catch (error) { console.clear(); console.log(error); }
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
                sales     : { today : data.data.todaySales,     total : data.data.totalSales },
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
                            <p className="today-sales">Today Sales : { details.sales.today } ₹</p>
                            <p className="total-sales">Total Sales : { details.sales.total } ₹</p>
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
