import axios from "axios";
import Order from 'models/Order';
import * as apiData from './apiData'

export const fetchOrders = async () => {
    try {
        var response = await axios.get<Order[]>(`${apiData.baseUrl}/orders/getall`);
        return response.data;
    } catch (e) {
        console.error(e);
    }    
}

export const addOrder = async (order: Order) => {
    try {
        const toPost = {
            senderCityId: order.senderCity.id,
            senderAddress: order.senderAddress,
            recipientCityId: order.recipientCity.id,
            recipientAddress: order.recipientAddress,
            weight: order.weight,
            pickupDate: order.pickupDate,
        }
        console.log(toPost);
        var response = await axios.post(`${apiData.baseUrl}/orders/create`, toPost);       
        return response.status;
    } catch (e) {
        console.error(e);
    }    
}

export const addOrderUnsafe = async (order: any) => {
    try {
        var response = await axios.post(`${apiData.baseUrl}/orders/create`, order);       
        return response.status;
    } catch (e) {
        console.error(e);
    }    
}