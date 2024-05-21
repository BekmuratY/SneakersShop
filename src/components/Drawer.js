
import {Routes, Route } from 'react-router-dom'
import React from 'react';
import axios from 'axios';

import Info from './Info';
import AppContext from '../context'; 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Drawer({ onClose, onRevome, items = [] }) {
  // Получение состояния корзины из контекста приложения
  const { cartItems, setCartItems } = React.useContext(AppContext);
  // Состояния для отображения информации о заказе
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  // Состояние для отображения загрузки
  const [isLoading, setIsLoading] = React.useState(false);
  // Расчет общей стоимости товаров в корзине
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  // Обработчик оформления заказа
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      // Отправка запроса на сервер для создания заказа
      const { data } = await axios.post('https://6e208e995a32c491.mokky.dev/orders', {
        items: cartItems,
      });
      // Обновление состояний для отображения информации о заказе
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      // Удаление товаров из корзины после оформления заказа с задержкой
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6e208e995a32c491.mokky.dev/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа');
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="Close"></img>
        </h2>
        {/* Если в корзине есть товары */}
        {items.length > 0 ? (
          <div className="items">
            {/* Отображение списка добавленных товаров */}
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price}$</b>
                </div>
                {/* Кнопка для удаления товара из корзины */}
                <img onClick={() => onRevome(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove"></img>
              </div>
            ))}
            {/* Информация о заказе */}
            <div className="cardTotalBlock mt-50">
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
              {/* Кнопка для оформления заказа */}
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ 
                <img src="/img/arrow.svg" alt="Arrow" /> 
              </button>
            </div>
          </div>
        ) : (
          // Если корзина пуста
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderComplete ? "/img/order.png" : "/img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
