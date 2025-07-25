import { TestUserModel } from "../models/test.user.model";

export class UserService {

    static retrieveUsers(): TestUserModel[] {
        if(!localStorage.getItem('users')){
            const arr: TestUserModel[] = [
                    {
                        email: 'user@example.com',
                        password: 'user123',
                    }
                ]

            localStorage.setItem('users',JSON.stringify(arr))
        }

        return JSON.parse(localStorage.getItem('users')!)
    }

    static login(email: string, password: string): boolean{

        for( let user of this.retrieveUsers()){
            if(user.email  === email && user.password === password){
                localStorage.setItem('active', user.email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): TestUserModel | null {
        if ( !localStorage.getItem('active'))
            return null

        for( let user of this.retrieveUsers()){
            if(user.email  === localStorage.getItem('active')){
                return user
            }
        }

        return null
    }

    


}