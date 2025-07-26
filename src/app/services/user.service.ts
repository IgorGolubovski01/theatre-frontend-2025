import { TestUserModel } from "../models/test.user.model";
import axios from "axios";
import { UserModel } from "../models/user.model";


const client = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export class UserService {

    static async register(user: UserModel) {
        return client.post('/register', user)
    }

    static async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await client.post('/login', { email, password })
            localStorage.setItem('active', JSON.stringify({email}))
            return true
        } catch (error) {
            return false;
        }
    }

    static retrieveUsers(): UserModel[] {
        return JSON.parse(localStorage.getItem('users')!)
    }

    static getActiveUser(): UserModel | null {
        const active = localStorage.getItem('active')
        
        if(!active) return null

        try{
            return JSON.parse(active)
        }catch {
            return null
        }
    }




}