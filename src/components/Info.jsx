import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  // Получение функции для открытия/закрытия корзины из контекста приложения
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      {/* Изображение или иконка для отображения информации */}
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      {/* Заголовок сообщения */}
      <h2>{title}</h2>
      {/* Описание сообщения */}
      <p className="opacity-6">{description}</p>
      {/* Кнопка для закрытия сообщения или возврата на предыдущую страницу */}
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="img/arrow.svg" alt="Arrow" />
        Go back
      </button>
    </div>
  );
}

export default Info;
