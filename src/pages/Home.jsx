import React, { useState } from 'react';
import Card from '../components/Card';

function Home({
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddFavorite,
    onAddToCart,
    isLoading,
}) {
    // Обработчик изменения сортировки
    const [sortBy, setSortBy] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortChange = (type) => {
        if (type === sortBy) {
            setSortOrder(order => (order === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(type);
            setSortOrder('asc');
        }
    };
    // Функция для рендеринга товаров
    const renderItems = () => {
        const filteredItems = items.filter((item) => item && item.title && item.title.toLowerCase().includes(searchValue.toLowerCase()));

        const sortedItems = filteredItems.slice().sort((a, b) => {
            if (sortBy === 'price') {
                return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (sortBy === 'title') {
                return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
        });

        return (isLoading ? [...Array(12)] : sortedItems).map((item, index) => (
            <Card 
                key={index}
                title={item && item.title}
                price={item && item.price}
                imageUrl={item && item.imageUrl}
                onFavorite={(obj) => onAddFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                id={item && item.id}
                {...item}
                loading={isLoading}
            />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-20">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Каталог"}</h1>
                <div className="searsh-block d-flex">
                    <img src="/img/searsh.svg" alt="Search"></img>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."></input>
                </div> 
            </div>
            <div className= "mb-20">
                    <button className = "sorting" onClick={() => handleSortChange('price')}>Сортировать по цене</button>
                    <button className = "sorting" onClick={() => handleSortChange('title')}>Сортировать по алфавиту</button> 
                </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;
