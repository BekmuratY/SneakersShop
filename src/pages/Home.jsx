import React from 'react';
import Card from '../components/Card';


function Home({
    items,
    cartItems ,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddFavorite,
    onAddToCart,
    isLoading,
}) {
    const renderItems = () => {
        const filteredItems = items.filter((item) => item && item.title && item.title.toLowerCase().includes(searchValue.toLowerCase()));
    
        return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
            <Card 
                key={index}
                title={item && item.title} // Добавляем дополнительную проверку
                price={item && item.price} // Добавляем дополнительную проверку
                imageUrl={item && item.imageUrl} // Добавляем дополнительную проверку
                onFavorite={(obj) => onAddFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                id={item && item.id} // Добавляем дополнительную проверку
                {...item}
                
                loading={isLoading}
            />
        ));
    }
    
    
    
    
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Каталог " }</h1>
                <div className="searsh-block d-flex">
                    <img src="/img/searsh.svg" alt="Search"></img>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."></input>
                </div>
            </div>


            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;
