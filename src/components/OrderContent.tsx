import { Avatar, Box } from "@mui/material"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { OrderType } from "../model/OrderType"
import { useMemo } from "react"
import { ShoppingDataType } from "../model/ShoppingDataType"
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '60vh',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const columns: GridColDef[] = [
        {
            field: 'image', headerName: '', flex: 0.7, align: 'center', sortable: false,
             headerAlign: 'center',
            renderCell: (params) => <Avatar src={params.value } sx={{ width: "50%", height: "12vh" }} />
        },
        {
            field: 'title', headerName: 'Title', flex: 1,
            align: 'center', headerAlign: 'center'
        },
        { field: 'unit', headerName: 'Unit', flex: 0.3 },
        { field: 'cost', headerName: 'Cost(ILS)', flex: 0.3, type: 'number' },
        { field: 'count', headerName: 'Count', flex: 0.2, editable: false, type: 'number'  },
        { field: 'price', headerName: 'Price', flex: 0.3, type: 'number'  }
]
export const OrderContent: React.FC<{orderId: string}> = ({orderId}) => {
    const orders = useSelector<any, OrderType[]>(state => state.ordersState.orders);
    const order: OrderType = useMemo(()=>getOrder(), [orderId]);
    const rows = useMemo(()=>getTableData(), [order]);
    function getTableData(): ShoppingDataType[] {
        let res: ShoppingDataType[] = [];
        if(order.shopping){
            res = order.shopping;
        }
        return  res
    }
    function getOrder(): OrderType {
        const res: OrderType = orders.find(o => o.id == orderId)!;
        return res;
    }
    return <Box sx={style}>
        <DataGrid rows={rows} columns={columns} getRowHeight={() => 'auto'}/>
    </Box>
}