import { useSelector } from "react-redux"
import { OrderType } from "../../model/OrderType";
import { Box, Snackbar, Alert, Modal } from "@mui/material";
import { useMemo, useState, useRef } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { LocalShipping, Visibility } from "@mui/icons-material";
import { ordersService } from "../../config/orders-service-config";
import { OrderContent } from "../OrderContent";
import { ConfirmationDialog } from "../ConfirmationDialog";
function checkDateFormat(date: string): boolean {
    const dateParts = date.split("-");
    let res: boolean = false;
    if (dateParts.length == 3 && dateParts.every(p => !isNaN(+p) && p.length > 1)) {
        res = true;
    }
    return res;
}

export const Orders: React.FC = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [openContent, setOpenContent] = useState(false);
    const orderId = useRef('');
    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
    const alertMessage = useRef<string>('');
    const title = useRef<string>('');
    const content = useRef<string>('');
    const deliveryDate = useRef<string>('');
    const orders = useSelector<any, OrderType[]>(state => state.ordersState.orders);
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const tableData = useMemo(() => getTableData(), [orders]);
    const columns: GridColDef[] = useMemo(() => getColumns(), [authUser, orders]);
    function actualUpdate(isAgree: boolean) {
        if(isAgree) {
            delivery(orderId.current, deliveryDate.current);
        }
        setOpenConfirmation(false)
    }
    function getTableData(): {
        id: string, email: string, productsAmount: number,
        cost: number, orderDate: string, deliveryDate: string
    }[] {
        return orders.map(o => ({
            id: o.id, email: o.email,
            productsAmount: o.shopping.length,  
            cost: o.shopping.reduce((res, cur) => res + cur.cost * cur.count, 0),
            orderDate: o.orderDate, deliveryDate: o.deliveryDate
        })).sort((r1, r2) => {
            let res = 0;
            if(!r1.deliveryDate && r2.deliveryDate ) {
                res = -1;
            } else if (r1.deliveryDate && !r2.deliveryDate) {
                res = 1;
            } else if(!r1.deliveryDate && !r2.deliveryDate) {
                res = r1.orderDate.localeCompare(r2.orderDate);
            } else {
                res = r2.deliveryDate.localeCompare(r1.deliveryDate);
            }
            return res;
        });
    }
    function getColumns(): GridColDef[] {
        const commonColumns: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 0.4 },
            {
                field: 'productsAmount', headerName: 'Amount', flex: 0.3, type: "number",
                headerAlign: 'center', align: 'center'
            },
            {
                field: 'cost', headerName: 'Cost', flex: 0.4, type: "number",
                headerAlign: 'center', align: 'center'
            },
            { field: 'orderDate', headerName: 'Order Date', flex: 0.5,sortable: false },
            {
                field: 'deliveryDate', headerName: 'Delivery Date', flex: 0.5,
                editable: authUser.includes('admin'), sortable: false
            },
            {
                field: 'actions', type: 'actions', getActions: params => {
                    const res = [<GridActionsCellItem label="details" 
                    icon={<Visibility/>} 
                    onClick={() => {
                        orderId.current = params.id as string;
                        setOpenContent(true);
                    }}/>]
                    if (authUser.includes("admin")) {
                        res.push(<GridActionsCellItem label="delivery"
                         icon={<LocalShipping />}
                        disabled={!!params.row.deliveryDate}
                           onClick={async () => await delivery(params.id as string,
                               new Date().toISOString().substring(0, 10))}/>)
   
                    }
                    return res;
                }
            }

        ];
        
        if(authUser.includes('admin')) {
            commonColumns.splice(1, 0, { field: 'email', headerName: 'Customer', flex: 0.8 })
        }
        
        return  commonColumns;
    }
    async function delivery(id: string, date: string) {
        const order = { ...orders.find(o => o.id == id)!, deliveryDate: date };
        if(!!order.id) {
               await ordersService.updateOrder(order!)
        }
     
    }
    function updateError(error: any) {

        alertMessage.current = JSON.stringify(error);
        setOpenAlert(true)
    }
    async function updateDeliveryDate(newRow: any, oldRow: any) {
        const newDeliveryDate = newRow.deliveryDate;
        const orderDate = newRow.orderDate;

        if (newDeliveryDate) {
            if (!checkDateFormat(newDeliveryDate)) {
                throw `${newDeliveryDate} has wrong format`
            }
            if (newDeliveryDate < orderDate) {
                throw `${newDeliveryDate} must not be less than order date`
            }
            if (newDeliveryDate > new Date().toISOString().substring(0, 10)) {
                throw `${newDeliveryDate} must not be greater than current date`
            }
            

        } 
        orderId.current = newRow.id;
        deliveryDate.current = newDeliveryDate;
        if(!newDeliveryDate) {
            title.current = 'Canceling delivery?'
            content.current = `You are going to cancel delivery of the order ${newRow.id}`
        } else {
            title.current = 'Updating delivery date?'
            content.current = `You are going to update delivery date of the order ${newRow.id}
            from ${oldRow.deliveryDate} to ${newDeliveryDate}`
        }
        setOpenConfirmation(true);
        return oldRow;
    }
    return <Box sx={{
        display: "flex", flexDirection: "column", height: "80vh",
        justifyContent: "center", alignItems: "center"
    }}>
        <Box sx={{ width: "80vw", height: "50vh" }}>
            <DataGrid rows={tableData} columns={columns} processRowUpdate={updateDeliveryDate}
                onProcessRowUpdateError={updateError} />
        </Box>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
            <Alert severity="error" sx={{ width: '80vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
        <Modal open={openContent} onClose={() => setOpenContent(false)}>
            <Box>
                 <OrderContent orderId={orderId.current}/>
            </Box>
           
        </Modal>
        <ConfirmationDialog open={openConfirmation} onCloseFn={actualUpdate}
            title={title.current} content={content.current} />
    </Box>
}