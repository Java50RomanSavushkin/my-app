import { LoginData } from "../model/LoginData";

export default interface AuthService {
    login(login: LoginData):Promise<string>;
    logout(): Promise<void>;
}