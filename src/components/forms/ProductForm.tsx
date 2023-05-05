import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { ProductType } from "../../model/ProductType"
import { useState, useRef } from "react";

type Props = {
    submitFn: (product: ProductType) => string
}

const initialProduct: ProductType = {
    category: 'bread', image: '', cost: 20,
    title: 'breadx', unit: 'piece'
};

export const ProductForm: React.FC<Props> = ({ submitFn }) => {
    const [product, setProduct] = useState<ProductType>(initialProduct);
    const image = useRef<string>('');
    function onSubmitFn(event: any) {
        event.preventDefault(); //canceling default form submit
        const errorMessage = submitFn(product);
        if (!errorMessage) {
            document.querySelector("form")!.reset();
        }
        //TODO error handling
    }
    function imageHandler(event: any) {
        const urlImage = event.target.value;
        image.current = urlImage;
        setProduct({ ...product, image: urlImage });
    }
    return <Box>
        <form onSubmit={onSubmitFn}>
            <Grid container spacing={4} justifyContent={'center'}>
                <Grid item xs={8} md={7}>
                    <TextField label='URL image'
                        required fullWidth value={product.image}
                        onChange={imageHandler} />
                </Grid>
                <Grid item xs={5}>
                    {image.current && <Avatar src={image.current} sx={{
                        width: "20vw",
                        height: "20vw"
                    }} />}
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
    </Box>
}