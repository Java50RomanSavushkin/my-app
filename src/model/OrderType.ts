import { ShoppingDataType } from "./ShoppingDataType";

export type OrderType = {
    id: string;
    email: string;
    orderDate: string;
    deliveryDate: string;
    shopping: ShoppingDataType[];
}