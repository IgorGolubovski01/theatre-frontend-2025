import { TicketModel } from "./ticket.model"

export interface OrderModel{
    orderId: number
    orderDate: Date
    tickets:{
        ticketId: number
        projectionId: number
    }[]
    projectionName?: string
}