import City from './City';
interface Order {
    id: number;
    weight: number;
    pickupDate: Date;
    senderCity: City;
    senderAddress: string;
    recipientCity: City;
    recipientAddress: string;
}

export default Order;