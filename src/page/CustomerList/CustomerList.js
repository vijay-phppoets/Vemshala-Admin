import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

// @custom-component-imports ------------------------------------------------------------------------ 

    import DataTable from 'react-data-table-component';
    import DataTableExtensions from 'react-data-table-component-extensions';
    import 'react-data-table-component-extensions/dist/index.css';
    import { Button, Modal,notification   } from 'antd'
    import { ExclamationCircleOutlined } from '@ant-design/icons';
 
    import Header from "../../component/Header/Header"
    import { PageContainer } from "../../component/Xcomponent"
    import Mount from '../../modules/Mount'

    import updateStatus from "../../api/updateCustomerStatus";
    import sendEmail    from "../../api/sendCustomerEmail"

// @actions-imports ----------------------------------------------------------------------------------

    import { getOrderList, getOrderListReset } from "../../action/getOrderListAction"
    import { getCustomerList, getCustomerListReset } from "../../action/getCustomerListAction"
 
//-----------------------------------------------------------------------------------------------------

const CustomerList = props => {

  console.clear(); console.log(props)
   
    const { getCustomerList, getCustomerListState } = props
    const [tableData, setTableData] = useState([])
    const [selectedRows,setSelectedRows] = useState([])
    const [clearSelectedRows,updateClearSelectedRows] = useState(false)

    const openNotificationWithIcon = (type,message,description = "") => {
        notification[type]({
          message     : message,
          description : description,
        });
    };
  
    const showStatusChangeModal = (data) => {

        if(data.status === 'Active') {

            data.status  = 'Deactivate'
            data.message = `Do you really want to deactivate ${data.name} ?`
        }

        else { 
            data.status  = 'Active'
            data.message = `Do you really want to activate ${data.name} ?`
        }

        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: data.message,
          okText: 'Yes',
          cancelText: 'No',
          onOk: function() { updateCustomerStatus(data) /* call update-status api */ },
        });
    };

    const showEmailConfirmationModal = () => {

        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'Do you really want to send email ?',
          okText: 'Yes',
          cancelText: 'No',
          onOk: function() { sendCustomerEmail(selectedRows) },
        });
    };

    const [columns,setColumns] = useState([{
            name: 'Customer Name',
            cell: data => String(data.name),
            sortable: true,
        },{
            name: 'Customer Email',
            cell: data => String(data.email),
            sortable: true,
        },{
            name: 'Customer Contact No.',
            cell: data => String(data.contact_no),
            sortable: true,
        },{
            name: 'Customer Status',
            cell: data => String(data.status),
            sortable: true,
        },{
            name: 'Register Date',
            cell: data => String(data.date),
            sortable: true,
        },{
            name: 'Action',
            cell: data => <Button className={ data.status === 'Active' ? 'deactivate' : 'active' } onClick={() => showStatusChangeModal(data)}>{ data.status === 'Active' ? 'Inactive' : 'Active' }</Button>,
            sortable: true,
            export:false,
        }
    ])

/* @api-call -------------------------------------------------------------------------------------------------*/ 

    const sendCustomerEmail = async(data) => {

        try {

            const customersEmail = data.map((customer,index) => customer.email).join(',');
            const subject = 'Notification';
            const text    = 'Hi this is a test email :)';  
    
            const serverResponse = await sendEmail({ customersEmail,subject,text });

            if(serverResponse.status === 'error') { throw new Error(); }

            openNotificationWithIcon('success','Send Email','Email send successfully');

            updateClearSelectedRows(true) /* clear selected rows */

            setSelectedRows([]) /* clear selected rows */

        } catch (error) { openNotificationWithIcon('error','Send Email','Sorry email could not send to customer') }
    }

    const updateCustomerStatus = async(data) => {

        try {

            const serverResponse = await updateStatus(data);

            if(serverResponse.status === 'error') { throw new Error(); }

            openNotificationWithIcon('success','Customer status','Customer status updated successfully');

            getCustomerList() /* refresh customers list */
            
        } catch (error) { openNotificationWithIcon('error','Customer status','Customer status could not update') }
    }

/* callbacks -------------------------------------------------------------------------------------------------*/

    useEffect(() => { getCustomerList()}, [])
    useEffect(() => {
        
        if (getCustomerListState.apiState === "success") {

            const customerList = getCustomerListState.list.map(data => {

                const serverDate = date => date.toISOString().slice(0, 10);

                data.created_at = serverDate(new Date(data.created_at))
       
                return  {
                    id     : data.id,
                    name   : data.name,
                    email  : data.email,
                    date   : data.created_at,
                    status : data.status,
                    contact_no: data.contact_no,
                }
            })

            setTableData(customerList);
        }
    }, [getCustomerListState])

/* ----------------------------------------------------------------------------------------------------------*/

    return (
        <React.Fragment>
            <Header title="Customer List"/>
            <PageContainer>
                <Mount condition={selectedRows.length > 0 }>
                    <div className="email-container">
                        <Button className="active" onClick={showEmailConfirmationModal}>Send Email</Button>
                    </div>
                </Mount>     
             
                <DataTableExtensions print={false} exportHeaders={true} columns={columns} data={tableData} >
                    <DataTable
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        exportHeaders={true}
                        selectableRows={true}
                        onSelectedRowsChange={(data) => { updateClearSelectedRows(false); setSelectedRows(data.selectedRows) }}
                        clearSelectedRows={clearSelectedRows}
                    />
                </DataTableExtensions>
            </PageContainer>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    getOrderListState    : state.getOrderList,
    getCustomerListState : state.getCustomerList,
})

const mapDispatchToProps = (dispatch) => ({
    getOrderList:         (params) => dispatch(getOrderList(params)),
    getOrderListReset:    ()       => dispatch(getOrderListReset()),
    getCustomerList:      (params) => dispatch(getCustomerList(params)),
    getCustomerListReset: ()       => dispatch(getCustomerListReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)