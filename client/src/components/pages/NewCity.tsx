import React from 'react';
import City from 'models/City';
import { useNavigate } from 'react-router-dom';
import { addCity } from 'services/cityServices';
import { FormInputWithLabel } from 'components/FormInputWithLabel';
import { FormSubmit } from 'components/FormSubmit';
import 'styles/main.css';

const NewCity = () => {    
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.currentTarget;
    if(target.cityname.value !== '') {
      const newCity = {
        name: target.cityname.value,
      } as City;
      await addCity(newCity);
    }
    else {
      alert("Не все поля заполнены!");
    }
  }
  return(
    <div className='cont'>
      <h2>Добавить город</h2>
      <form onSubmit={onSubmit} className='formcont'>
        <div className='forminnercont'>
          <FormInputWithLabel labelText='Название'>
            <input id="cityname" type="text"/>
          </FormInputWithLabel>        
        </div>
        <FormSubmit submitText='Добавить'/>
      </form>
      <button className='btn' onClick={() => navigate('/orders')}>К списку заказов</button>
    </div>
  );
}

export default NewCity;