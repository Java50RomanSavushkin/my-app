import ProductsService from "../service/ProductsService";
import { ProductsServiceFirebase } from "../service/ProductsServiceFirebase";

export const productsService: ProductsService = new ProductsServiceFirebase();