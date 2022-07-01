import React from "react";

// @custom-component-imports ------------------------------------------------------------------------ 

    import Header from "../../../component/Header/Header"
    import { PageContainer } from "../../../component/Xcomponent"
    import { Button } from "antd";
    import { Link } from "react-router-dom";

    import DataTable from 'react-data-table-component';
    import DataTableExtensions from 'react-data-table-component-extensions';
    import 'react-data-table-component-extensions/dist/index.css';

// -------------------------------------------------------------------------------------------------

const CouponsList = () => {

    return(
    <React.Fragment>
        <Header title="Coupons Master"  actionBtn={<Link to='/master/coupons/add'><Button >New</Button></Link>}></Header>
        <PageContainer>
            <DataTableExtensions print={false} export={false} exportHeaders={true} columns={[]} data={[]} >
                <DataTable
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    exportHeaders={true}
                    selectableRows={true}
                />
            </DataTableExtensions>
        </PageContainer>
    </React.Fragment>
    )

}

export default CouponsList;