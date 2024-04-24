import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppContext from '../context';

function Header(props){

    const {cartItems} = React.useContext(AppContext);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0 );

    return (
        <header className="d-flex justify-between align-center	p-40	">
           <Link to = "/">
      <div className="d-flex align-center	">
     
      <img width={40} height={40} src="/img/icon2.svg" alt="Cart" />
      <div className="headerInfo" >
        <h3 className="text-uppercase">Sneakers Shop</h3>
        <p className="opacity-5">Начните свое путешествие с комфортом</p>
      </div>
      
      </div>
      </Link>
      <ul className="d-flex">
        <li onClick = {props.onClickCart} className="mr-30 cu-p">
        <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
        <span>{totalPrice} $</span>
        </li>

        <li className="mr-20 cu-p">
           

         
         <Link to = "/favorites">
         <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
         </Link>
         
        <span>Закладки</span>
        </li>

        <li className="mr-30 cu-p" >
        <img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
        <span>Пользователь</span>
        </li>

      </ul>
     </header>
    );
}
export default Header;