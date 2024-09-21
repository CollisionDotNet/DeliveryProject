import React from 'react';
import City from 'models/City';
import { useNavigate } from 'react-router-dom';
import { fetchCities } from 'services/cityServices';
import { addOrderUnsafe } from 'services/orderServices';
import { FormInputWithLabel } from 'components/FormInputWithLabel';
import { FormSubmit } from 'components/FormSubmit';
import 'styles/main.css';

const NewOrder = () => {    
    const navigate = useNavigate();
    const [cities, setCities] = React.useState<City[]>([]); 
     
    React.useEffect(() => {
        const updateData = async () => {
            let response = await fetchCities();
            if(response !== undefined)
                setCities(response);
        };
        updateData();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const target = e.currentTarget;
        if(
            target.senderCity.value !== '' && target.senderAddress.value !== '' && target.recipientCity.value !== '' 
            && target.recipientAddress.value !== '' && target.weight.value !== '' && target.pickupDate.value !== '') {
            const newOrder = {
                senderCityId: target.senderCity.value,
                senderAddress: target.senderAddress.value,
                recipientCityId: target.recipientCity.value,
                recipientAddress: target.recipientAddress.value,
                weight: target.weight.value,
                pickupDate: target.pickupDate.value
            };
            await addOrderUnsafe(newOrder);
        }
        else {
            alert("Не все поля заполнены!");
        }
    }
    return(
        <div className='cont'>
            <h2>Добавить заказ</h2>
            <form onSubmit={onSubmit} className='formcont'>
                <div className='forminnercont'>
                    <FormInputWithLabel labelText='Город отправителя'>
                        <select id="senderCity">
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </FormInputWithLabel>

                    <FormInputWithLabel labelText='Адрес отправителя'>
                        <input id="senderAddress" type="text"/>
                    </FormInputWithLabel>

                    <FormInputWithLabel labelText='Город получателя'>
                        <select id="recipientCity">
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </FormInputWithLabel>

                    <FormInputWithLabel labelText='Адрес получателя'>
                        <input id="recipientAddress" type="text"/>
                    </FormInputWithLabel>

                    <FormInputWithLabel labelText='Вес груза (в граммах)'>
                        <input id="weight" type="number" step="any" min="0"/>
                    </FormInputWithLabel>

                    <FormInputWithLabel labelText='Дата забора груза'>
                    <input id="pickupDate" type="date"/>
                    </FormInputWithLabel>
                </div>
                <FormSubmit submitText='Добавить'/>                
            </form>
            <button className='btn' onClick={() => navigate('/orders')}>К списку заказов</button>
        </div>
    );
}

export default NewOrder;