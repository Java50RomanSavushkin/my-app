import OrdersService from "../service/OrdersService";
import OrdersServiceFirebase from "../service/OrdersServiceFirebase";

export const ordersService: OrdersService = new OrdersServiceFirebase();