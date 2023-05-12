import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { ProductType } from "../../model/ProductType"
import { ReactNode, useMemo } from "react";
import { Add, Remove } from "@mui/icons-material";
import { ShoppingProductType } from "../../model/ShoppingProductType";
import { ordersService } from "../../config/orders-service-config";
import { useNavigate } from "react-router-dom";

export const ProductsClient: React.FC = () => {
    const navigate = useNavigate();
    const products = useSelector<any, ProductType[]>
        (state => state.productsState.products);
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const shopping = useSelector<any,ShoppingProductType[]>
    (state => state.shoppingState.shopping);
    const counts = useMemo(() => getCounts(), [products, shopping])
    function getCounts(): number[] {
        console.log(shopping);
        return products.map(p => getCountProduct(p))
    }
    function getCountProduct(product: ProductType): number {
        const shoppingProduct: ShoppingProductType|undefined = 
        shopping.find(s => s.id == product.id);
        let count: number = 0;
        if (shoppingProduct) {
            count = shoppingProduct.count;
        }
        return count;
    }
    function getProductCards(): ReactNode {
        return products.map((p, index) => <Grid item xs={8} sm={5} md={3} key={index}>
            <Card>
                <CardMedia sx={{ height: 140 }} image={p.image} />
                <CardContent sx={{
                    textAlign: "center",
                    backgroundColor: "aliceblue"
                }}>
                    <Typography gutterBottom sx={{ fontSize: "1.3em" }} >
                        {p.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "1.2em" }}>
                        {p.unit}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "1.1em" }}>
                        {p.cost} <img src="images/israeli-shekel-icon.svg" width="5%" />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container spacing={0} justifyContent="center" >
                        <Grid item xs={4}><Button size="large" onClick={async () =>
                             {
                                if (authUser == '') {
                                    navigate("/login");
                                } else {
                                    ordersService.addShoppingProductUnit(authUser, p.id!);
                                }
                                
                                }}><Add/></Button></Grid>
                        <Grid item xs={4}><Typography sx={{fontSize: "1.2em",display: "flex",width: "100%",height:"100%",alignItems: "center", justifyContent: "center"}}>{counts[index]}</Typography></Grid>
                        <Grid item xs={4}><Button size="large" onClick={async () =>
                             ordersService.removeShoppingProductUnit(authUser, p.id!)} disabled={counts[index] == 0} ><Remove></Remove></Button></Grid>
                    </Grid>
                    
                    
                    
                </CardActions>
            </Card>
        </Grid>)
    }

    return <Grid container spacing={6} justifyContent="center">
        {getProductCards()}
    </Grid>
}