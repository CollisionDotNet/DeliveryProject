import React from 'react';
import Order from 'models/Order';
import { useNavigate } from 'react-router-dom';
import OrderTableRow from 'components/OrderTableRow';
import { fetchOrders } from 'services/orderServices';
import 'styles/tableStyles.css';
import 'styles/main.css';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = React.useState<Order[]>([]); 
     
    React.useEffect(() => {
        const updateData = async () => {
            let response = await fetchOrders();
            if(response !== undefined)
              setOrders(response);
        };
        updateData();
    }, []);
   
    return(
      <div className='cont'>
        <h2>Список заказов</h2>
        <table className="tabouterbord">
            <thead>
              <tr>
                <th className="tabcell">Номер заказа</th>
                <th className="tabcell">Город отправителя</th>
                <th className="tabcell">Адрес отправителя</th>
                <th className="tabcell">Город получателя</th>
                <th className="tabcell">Адрес получателя</th>
                <th className="tabcell">Вес груза (г.)</th>
                <th className="tabcell">Дата забора груза</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => <OrderTableRow key={order.id} {...order}></OrderTableRow>)}
            </tbody>    
        </table>
        <button className='btn' onClick={() => navigate('/orders/new')}>Добавить заказ</button>
        <button className='btn' onClick={() => navigate('/cities/new')}>Добавить город</button>
      </div>    
    );
}

export default Orders;