import {  Box, Avatar, Snackbar, Alert, Button } from "@mui/material"
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { productsService } from "../../config/products-service-config"
import { Delete, Add} from "@mui/icons-material"
import { ProductForm } from "../forms/ProductForm"
export const ProductsAdmin: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [flAdd, setFlAdd] = useState<boolean>(false);
    const alertMessage = useRef<string>('');
    const products: ProductType[] =
     useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        {field:"image", headerName: '', flex: 0.3, editable: true,
         renderCell: (params) => <Avatar 
         src={params.value} 
         sx={{width: "90%", height: "80px"}}/>, align: "center", headerAlign: "center"},
        {field: "title", headerName: 'Title', flex: 0.8, align: "center", headerAlign: "center"},
        {field: "category", headerName: "Category", flex: 0.5},
        {field: "unit", headerName: "Unit", flex: 0.4},
        {field: "cost", headerName: "Cost (ILS)", flex: 0.3, type: "number", editable: true},
        {field: "actions", type: "actions", getActions: (params) => [
            <GridActionsCellItem label="remove" icon={<Delete></Delete>} 
            onClick={() => productsService.removeProduct(params.id as string)}/>
        ]}
    ]
    function updateCost(newRow: any, oldRow: any): any {
        const newCost: number = +newRow.cost;
        const oldCost: number = +oldRow.cost;
       
        const delta = Math.abs(newCost - oldCost);
        if(delta / oldCost > 0.5) {
            throw "product cost cannot be updated more than on 50%"
        }
        productsService.addProduct(newRow);
        return newRow;
    }
    function updateCostError(error: any) {
        alertMessage.current = error;
        setOpen(true);
    }
    function submitAddProduct(product: ProductType): string {
        let res = '';
        if (products.find(p => p.title == product.title && p.unit == product.unit)) {
            res = `product ${product.title} with unit ${product.unit} already exists`
        } else {
            productsService.addProduct(product);
        setFlAdd(false);
        }
        
        return res;
    }
    return !flAdd ? <Box sx={{width: "100vw",display: "flex",
     flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
        <Box sx={{width: "80vw",height: "60vh"}}>
        <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}
        processRowUpdate={updateCost}
         onProcessRowUpdateError={updateCostError}/>
    </Box>
    <Button onClick={() => setFlAdd(true)}>
        <Add></Add>
    </Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
    </Box> : <ProductForm submitFn={submitAddProduct}></ProductForm>;
}