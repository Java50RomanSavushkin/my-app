import { Observable } from "rxjs";
import { ShoppingProductType } from "../model/ShoppingProductType";
import { ShoppingDataType } from "../model/ShoppingDataType";
import { OrderType } from "../model/OrderType";

export default interface OrdersService {
    addShoppingProduct(collectionName: string, id:string, shoppingProduct: ShoppingProductType):Promise<void>;
    addShoppingProductUnit(collectionName: string, id: string): Promise<void>;
    removeShoppingProduct(collectionName: string, id: string): Promise<void>;
    removeShoppingProductUnit(collectionName: string, id: string): Promise<void>;
    getShoppingCart(collectionName: string): Observable<ShoppingProductType[]>;
    createOrder(email: string, shopping: ShoppingDataType[]): Promise<void>;
    getCustomerOrders(email:string):Observable<OrderType[]>;
    getAllOrders():Observable<OrderType[]>;
    updateOrder(order: OrderType): Promise<void>;
}