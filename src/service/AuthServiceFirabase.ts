import { LoginData } from "../model/LoginData";
import AuthService from "./AuthService";
import { firebaseApp } from "../config/firebase-config";
import {getAuth, signInWithEmailAndPassword, signOut, signInWithPopup,
     GoogleAuthProvider} from "firebase/auth";
export default class AuthServiceFirebase implements AuthService {
    auth = getAuth(firebaseApp);
    async login(loginData: LoginData): Promise<string> {
        return loginData.email == "GOOGLE" ? this.signInGoogle() :
         this.signPassword(loginData)
    }
    private async signPassword(loginData: LoginData): Promise<string> {
        await signInWithEmailAndPassword(this.auth, loginData.email, loginData.password);
        return loginData.email;
    }
    private async signInGoogle():  Promise<string> {
        const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        return credential.user.email as string;
    }
    async logout(): Promise<void> {
        await signOut(this.auth);
    }
    
}