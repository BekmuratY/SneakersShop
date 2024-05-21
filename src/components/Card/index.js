import React from "react"; 
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

function Card(
  {
    id,
    onFavorite,
    onPlus, 
    title, 
    imageUrl, 
    price, 
    favorited = false, 
    loading = false
  }
) {
  // Получение функции для проверки, добавлен ли товар в корзину из контекста приложения
  const { isItemAdded } = React.useContext(AppContext);
  // Состояние, отвечающее за состояние "избранного" для текущего товара
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  // Объект товара
  const itemObj = { id, parentId: id, title, imageUrl, price };

  // Обработчик добавления товара в корзину
  const onClickPlus = () => {
    onPlus(itemObj);  
  }

  // Обработчик добавления товара в избранное
  const onClickFavorite = () => {
    onFavorite(itemObj);
    setIsFavorite(!isFavorite); 
  };

  return (
    <div className={styles.card}>
      {/* Заглушка для карточки во время загрузки */}
      {loading ? (
        <ContentLoader 
          speed={2}
          width={150}
          height={260}
          viewBox="0 0 150 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Содержимое заглушки */}
        </ContentLoader>
      ) : (
        // Рендер карточки товара
        <>
          {/* Кнопка "Добавить в избранное" */}
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="Unliked"></img>
          </div>
          {/* Изображение товара */}
          <img width={133} height={112} src={imageUrl} alt="Sneakers"></img>
          {/* Заголовок товара */}
          <h5>{title}</h5>
          {/* Информация о цене товара */}
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price: </span>
              <b>{price} $</b>
            </div>
            {/* Кнопка "Добавить в корзину" */}
            <div>
              <img className={styles.plus} onClick={onClickPlus} 
                src={isItemAdded(id) ? "img/btn-cheked.svg" : "img/btn-plus.svg"} alt="Plus">
              </img>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
