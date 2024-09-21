import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Order from 'models/Order';
import 'styles/main.css';

const OrderInfo = () => {    
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state as Order;
    return(
      <div className='cont'>
        <h2>Заказ №{order.id}</h2>
        <div className='infoblock'>
          <div>Полный адрес отправителя: г. {order.senderCity.name}, {order.senderAddress}</div>
          <div>Полный адрес получателя: г. {order.recipientCity.name}, {order.recipientAddress}</div>
          <div>Вес груза: {order.weight} г</div>
          <div>Дата забора груза: {new Date(order.pickupDate).toLocaleDateString()}</div>
        </div>
        
        <button className='btn' onClick={() => navigate('/orders')}>К списку заказов</button>
      </div>    
    );
}

export default OrderInfo;