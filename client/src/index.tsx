import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Orders from './components/pages/Orders';
import OrderInfo from './components/pages/OrderInfo';
import NewCity from './components/pages/NewCity';
import NewOrder from './components/pages/NewOrder';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Orders/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/orders/:id' element={<OrderInfo/>}/>
          <Route path='/orders/new' element={<NewOrder/>}/> 
          <Route path='/cities/new' element={<NewCity/>}/> 
        </Routes>
    </BrowserRouter>
);