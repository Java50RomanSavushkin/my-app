import {
   Box, Button, Grid, TextField,
    Snackbar, Alert, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { ProductType } from "../../model/ProductType"
import { useState, useRef, ReactNode } from "react";
import { useSelector } from "react-redux";
import productParams from "../../config/product-params-config.json";

type Props = {
    submitFn: (product: ProductType) => string
}
const initialProduct: ProductType = {
    category: '', image: '', cost: 0,
    title: '', unit: ''
};
const {minCost, maxCost, units} = productParams;
export const ProductForm: React.FC<Props> = ({ submitFn }) => {
    const [product, setProduct] = useState<ProductType>(initialProduct);
    
    const alertMessage = useRef<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const categories: string[] = useSelector<any, string[]>
        (state => state.categoriesState.categories);
    function onSubmitFn(event: any) {
        event.preventDefault(); //canceling default form submit
        const errorMessage = submitFn(product);
        if (!errorMessage) {
            document.querySelector("form")!.reset();
        } else {
            setOpen(true);
            alertMessage.current = errorMessage;
        }
    }
    function imageHandler(event: any) {
        const urlImage = event.target.value;
        setProduct({ ...product, image: urlImage });
    }
    function titleHandler(event: any) {
        const title = event?.target.value;
        setProduct({ ...product, title });
    }
    function categoryHandler(event: any) {
        const category = event?.target.value;
        setProduct({ ...product, category });
    }
    function costHandler(event: any) {
        const cost = +event?.target.value;
        setProduct({ ...product, cost });
    }
    function unitHandler(event: any) {
        const unit = event?.target.value;
        setProduct({ ...product, unit });
    }
    function getCategoryMenuItems(): ReactNode {
        return categories.map(c => <MenuItem value={c}>{c}</MenuItem>)
    }
    function getUnitMenuItems(): ReactNode {
        return units.map(u => <MenuItem value={u}>{u}</MenuItem>)
    }
    return <Box sx={{marginTop: "15vh"}}>
        <form onSubmit={onSubmitFn} onReset={() => {setProduct(initialProduct);
        }}>
            <Grid container spacing={4} justifyContent={'center'}>
                <Grid item xs={12} sm={8} >
                    <TextField label='URL image'
                        required fullWidth value={product.image}
                        onChange={imageHandler} />
                </Grid>
                <Grid item xs={10} justifyContent={'center'}>
                    <Box sx={{width: "100%",
                        height: "10vw", display: 'flex', justifyContent: 'center'}} >
                    {product.image && <img src={product.image} style={{
                        width: "20vw",
                        height: "10vw"
                    }} />}
                    </Box>
                    
                </Grid>
                <Grid item xs={8} sm={5}>
                    <TextField label="Product Title" required fullWidth value={product.title}
                        onChange={titleHandler} />
                </Grid>
                <Grid item xs={8} sm={5}>
                    <FormControl required sx={{width: "100%"}}>
                        <InputLabel id="categories-label">Category</InputLabel>
                        <Select
                            labelId="categories-label"
                            value={product.category}
                            label="Category *"
                            onChange={categoryHandler}
                        >
                            {getCategoryMenuItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={5}>
                    <TextField label="Cost" required fullWidth value={product.cost || ''}
                         onChange={costHandler} type="number" inputProps={{
                            min: `${minCost}`,
                            max : `${maxCost}`,
                            step: '0.01'
                        }} helperText={`enter cost value in the range [${minCost} - ${maxCost}]`}/>
                </Grid>
                <Grid item xs={8} sm={5}>
                    <FormControl required sx={{width: "100%"}}>
                        <InputLabel id="unit-label">Unit</InputLabel>
                        <Select
                            labelId="unit-label"
                            value={product.unit}
                            label="Unit *"
                            onChange={unitHandler}
                        >
                            {getUnitMenuItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item container spacing={5} justifyContent={'center'} xs={12}>
                    <Grid item xs={4}>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type='reset'>Reset</Button>
                    </Grid>
                </Grid>
            </Grid>

        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
    </Box>
}