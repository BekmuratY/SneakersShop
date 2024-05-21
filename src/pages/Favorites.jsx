import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
    // Получение списка избранных товаров и функции добавления/удаления из избранного из контекста приложения
    const { favorites, onAddFavorite } = React.useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {/* Отображение списка избранных товаров в виде карточек */}
                {favorites.map((item, index) => (
                    <Card 
                        key={index}
                        title={item.title}
                        price={item.price} 
                        imageUrl={item.imageUrl}
                        id={item.id}
                        favorited={true}
                        onFavorite={onAddFavorite}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
