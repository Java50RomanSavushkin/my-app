import { CategoryType } from "../model/CategoryType";
import { ProductType } from "../model/ProductType";
import ProductsService from "./ProductsService";
import productsConfig from "../config/products-config.json"
import { firebaseApp } from "../config/firebase-config";
import {collectionData} from "rxfire/firestore";
import {getFirestore, collection, getDocs, getDoc, deleteDoc, setDoc, getCountFromServer, doc}
 from "firebase/firestore";
import { getRandomNumber } from "../util/random";
import { Observable } from "rxjs";
export const PRODUCTS_COLLECTION = "products";
export const CATEGORIES_COLLECTION = "categories";
export class ProductsServiceFirebase implements ProductsService {
    getCategories(): Observable<CategoryType[]> {
        return collectionData(this.categoriesCollection) as Observable<CategoryType[]>
    }
    productsCollection = collection(getFirestore(firebaseApp), PRODUCTS_COLLECTION);
    categoriesCollection = collection(getFirestore(firebaseApp), CATEGORIES_COLLECTION);
    async addProduct(product: ProductType): Promise<void> {
       if(!product.id) {
            product.id = getRandomNumber(100000, 999999).toString();
       } 
        await setDoc(doc(this.productsCollection, product.id), product);
    }
    
    async addCategory(category: CategoryType): Promise<void> {
        await setDoc(doc(this.categoriesCollection, category.name), category);
    }
    async removeProduct(id: string): Promise<void> {
        await deleteDoc(doc(this.productsCollection, id))
    }
    async removeCategory(category: string): Promise<void> {
        await deleteDoc(doc(this.categoriesCollection, category))
    }
    async isCategoryExist(category: string): Promise<boolean> {
        return (await getDoc(doc(this.categoriesCollection, category))).exists()
    }
    async setProducts(): Promise<number> {
        const collectionData = (await getCountFromServer(this.productsCollection)).data();
        let count: number = collectionData.count;
        console.log(`Collection ${PRODUCTS_COLLECTION} contains ${count} products`)
        if (count == 0) {
            const products: ProductType[] = productsConfig.map(pc => {
                const category = pc.name.split("-")[0];
                return {category,cost: pc.cost,image: "images/" + pc.name + ".jpg",
                title: pc.name,unit: pc.unit};
            })
            for (let i = 0; i < products.length; i++) {
                const categoryExists: boolean =
                 await this.isCategoryExist(products[i].category);
                 if(!categoryExists) {
                   await this.addCategory({name:products[i].category});
                 }
                 await this.addProduct(products[i]);
                 count++;
            }
            console.log(`created ${count} products`)
        }
        return count;
    }
    getProducts(): Observable<ProductType[]> {
        return collectionData(this.productsCollection) as Observable<ProductType[]>
    }

}