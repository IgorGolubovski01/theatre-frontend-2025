import axios from "axios";
import { UserModel } from "../models/user.model";
import { RegisterModel } from "../models/register.model";


const client = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export class UserService {


    static async register(user: UserModel | RegisterModel) {
        return client.post('/register', user)
    }

    static async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await client.post('/login', { email, password });
            const user = response.data;
            localStorage.setItem('active', JSON.stringify(user));
            return true;
        } catch (error: any) {
            return false;
        }
    }


    static retrieveUsers(): UserModel[] {
        return JSON.parse(localStorage.getItem('users')!)
    }

    static getActiveUser(): UserModel | null {
        const active = localStorage.getItem('active')
        if (!active) return null

        try {
            const user: UserModel = JSON.parse(active)
            if (user && user.id && user.username && user.email) {
                return user
            }
            return null
        } catch {
            return null
        }
    }




}