
import {Routes, Route } from 'react-router-dom'
import React from 'react';
import axios from 'axios';

import Info from './Info';
import AppContext from '../context'; 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Drawer({onClose, onRevome, items = []   }){

    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [isOrderComplete, setIsOrderComplete]  = React.useState(false);
    const [orderId, setOrderId]  = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0 );

    

  


    const onClickOrder = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post('https://6e208e995a32c491.mokky.dev/orders', {
          items: cartItems,
        });
        setOrderId(data.id);
        setIsOrderComplete(true);
        setCartItems([]);
    
    
        for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await axios.delete('https://6e208e995a32c491.mokky.dev/cart/' + item.id);
          await delay(1000);
        }
    
      } catch (error) {
        alert('Ошибка при создании заказа ');
      }
      setIsLoading(false);
    };
    
    

    return (
        <div  className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">Корзина
        <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="Close"></img>
        </h2>

        {
          items.length > 0 ? 
          
          <div className="items">
          {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
         
         <div style={{backgroundImage: `url(${obj.imageUrl})`}} 
         className="cartItemImg"></div>
         <div className="mr-20 flex">
           <p className="mb-5">{obj.title}</p>
           <b>{obj.price}$</b>
         </div>
         <img onClick={() => onRevome(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove"></img>

       </div>
       
            ))}

<div className="cardTotalBlock mt-50 ">
      <ul>
        <li>
          <span>Итого: </span>
          <div></div>
          <b>{totalPrice}$ </b>
        </li>
        <li>
        <span>Налог 5%: </span>
          <div></div>
          <b>{(totalPrice) / 100 * 5}$</b>
        </li>

      </ul>
      

      <button  disabled={isLoading} onClick={onClickOrder} className="greenButton">
        Оформить заказ 
        <img src="/img/arrow.svg" alt="Arrow" /> 
        </button>

      </div>

          </div>
          
           : (
            <Info
            title = {isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description = {isOrderComplete ? `Ваш заказ #${orderId } скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image = {isOrderComplete ? "/img/order.png" : "/img/empty-cart.jpg"}
            />
               

           )
          


        }

        

      
        
      </div>
      </div>
    
    );
}

export default Drawer;