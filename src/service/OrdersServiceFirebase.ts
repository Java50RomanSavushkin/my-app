import { Observable } from "rxjs";
import { ShoppingProductType } from "../model/ShoppingProductType";
import { collection, getFirestore, doc, getDoc, setDoc, deleteDoc, DocumentData, DocumentReference, CollectionReference } from "firebase/firestore";
import { collectionData } from "rxfire/firestore";
import OrdersService from "./OrdersService";
import { firebaseApp } from "../config/firebase-config";

export default class OrdersServiceFirebase implements OrdersService {
    db = getFirestore(firebaseApp);
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
}