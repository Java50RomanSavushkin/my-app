import { Observable } from "rxjs";
import { ShoppingProductType } from "../model/ShoppingProductType";
import { collection, getFirestore, doc, getDoc, setDoc, deleteDoc, 
     DocumentReference, CollectionReference, query, where } from "firebase/firestore";
import { collectionData } from "rxfire/firestore";
import OrdersService from "./OrdersService";
import { firebaseApp } from "../config/firebase-config";
import { OrderType } from "../model/OrderType";
import { ShoppingDataType } from "../model/ShoppingDataType";
import { getRandomNumber } from "../util/random";
const N_ORDER_ID_SYMBOLS = 13;
function getOrderId(): string {
    return Array.from({ length: N_ORDER_ID_SYMBOLS }).map(() => getRandomNumber(0, 10))
        .join('');
}
export default class OrdersServiceFirebase implements OrdersService {
    

    db = getFirestore(firebaseApp);
    ordersCollection = collection(this.db, "orders");
    async addShoppingProduct(collectionName: string, id: string,
        shoppingProduct: ShoppingProductType): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await setDoc(docRef, shoppingProduct);
    }
    async addShoppingProductUnit(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.db, collectionName, id) as DocumentReference<ShoppingProductType>;
        const docSnapshot = await getDoc<ShoppingProductType>(docRef);
        const docData: ShoppingProductType | undefined = docSnapshot.data();
        let count = 0;
        if (docData) {
            count = docData.count;
        }
        await this.addShoppingProduct(collectionName, id, { id, count: count + 1 })
    }
    async removeShoppingProductUnit(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.db, collectionName, id) as DocumentReference<ShoppingProductType>;
        const docSnapshot = await getDoc<ShoppingProductType>(docRef);
        const docData: ShoppingProductType | undefined = docSnapshot.data();
        let count = 0;
        if (docData) {
            count = docData.count;
        }
        if (count < 2) {
            await this.removeShoppingProduct(collectionName, id);
        } else {
            await this.addShoppingProduct(collectionName, id, { id, count: count - 1 });
        }

    }
    async removeShoppingProduct(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await deleteDoc(docRef);

    }
    getShoppingCart(collectionName: string): Observable<ShoppingProductType[]> {
        const collectionRef: CollectionReference<ShoppingProductType> =
            collection(this.db, collectionName) as CollectionReference<ShoppingProductType>;
        return collectionData(collectionRef);
    }
    async createOrder(email: string, shopping: ShoppingDataType[]): Promise<void> {
        const order: OrderType = {
            id: getOrderId(), email,
            orderDate: new Date().toISOString().substring(0, 10),
            deliveryDate: '', shopping
        };
        for (let i = 0; i < shopping.length; i++) {
            await this.removeShoppingProduct(email, shopping[i].id!);
        }
        await setDoc(doc(this.ordersCollection, order.id), order);

    }
    getCustomerOrders(email: string): Observable<OrderType[]> {
        const customerCollection =
         query(this.ordersCollection, where("email", "==", email));
         return collectionData(customerCollection) as Observable<OrderType[]> ;
    }
    getAllOrders(): Observable<OrderType[]> {
        return collectionData(this.ordersCollection) as Observable<OrderType[]>
    }
    async updateOrder(order: OrderType): Promise<void> {
        console.log(order);
        await setDoc(doc(this.ordersCollection, order.id), order);
    }

}