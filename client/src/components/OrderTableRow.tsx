import Order from 'models/Order';
import { useNavigate } from 'react-router-dom';

const OrderTableRow = (order: Order) => {
    const navigate = useNavigate();
    const onRowClick = (order: Order) => {
        navigate(
            `/orders/${order.id}`, 
            { state: order }
        );
    }
    return(
        <tr key={order.id} className='tabrow' onClick={() => onRowClick(order)}>
            <td className='tabcell'>{order.id}</td>
            <td className='tabcell'>{order.senderCity.name}</td>
            <td className='tabcell'>{order.senderAddress}</td>
            <td className='tabcell'>{order.recipientCity.name}</td>
            <td className='tabcell'>{order.recipientAddress}</td>
            <td className='tabcell'>{order.weight}</td>
            <td className='tabcell'>{new Date(order.pickupDate).toLocaleDateString()}</td>
        </tr>
    );
} 

export default OrderTableRow;