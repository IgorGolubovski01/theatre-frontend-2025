import axios from "axios";
import { AddToCartModel } from "../models/addToCart.model";

const client = axios.create({
    baseURL: 'http://localhost:8080/cart',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export class CartService {


    static async addToCart(addToCart: AddToCartModel) {
        return client.post('/addToCart', addToCart)
    }




}