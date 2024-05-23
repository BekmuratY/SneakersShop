import React from "react"; 
import axios from "axios";
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from "./context";

function App() {
  // Состояния компонента
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(''); 
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Загрузка данных с сервера при монтировании компонента
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://6e208e995a32c491.mokky.dev/cart'),
          axios.get('https://6e208e995a32c491.mokky.dev/favorite'),
          axios.get('https://6e208e995a32c491.mokky.dev/items')
        ]);
        setIsLoading(false); 
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data); 
      } catch (error) {
        alert("Server error!");
        console.error(error);
      }
    }
    fetchData();
  }, []); 

  // Добавление товара в корзину
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => item.parentId === obj.id);
      if (findItem) {
        const { data: deletedItem } = await axios.delete(`https://6e208e995a32c491.mokky.dev/cart/${findItem.id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== deletedItem.id));
      } else {
        const { data: addedItem } = await axios.post('https://6e208e995a32c491.mokky.dev/cart', obj);
        setCartItems((prev) => [...prev, addedItem]);
      }
    } catch (error) {
      // Обработка ошибок
    }
  };

  // Удаление товара из корзины
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6e208e995a32c491.mokky.dev/cart/${id}`); 
      setCartItems(prev => prev.filter(item => item.id !== id ));
    } catch (error) {
      alert("Error when deleting from the trash!");
      console.error(error);
    } 
  }

  // Добавление товара в избранное
  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6e208e995a32c491.mokky.dev/favorite/${obj.id}`); 
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://6e208e995a32c491.mokky.dev/favorite', obj); 
        setFavorites(prev => [...prev, data ]); 
      }
    } catch (error) {
      alert("Couldn't add to favorites")
    }
  }

  // Обработчик изменения значения в поле поиска
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);  
  }

  // Проверка, добавлен ли товар в корзину
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return ( 
    <AppContext.Provider 
      value={{
        items, 
        cartItems, 
        favorites, 
        isItemAdded, 
        onAddFavorite, 
        setCartOpened, 
        setCartItems
      }}
    >
      <div className="wrapper clear">
        {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRevome={onRemoveItem} /> : null}
        <Header onClickCart={() => setCartOpened(true)}  />
        <Routes>
          <Route path="/" exact element={<Home 
            items={items} 
            cartItems={cartItems}
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            onChangeSearchInput={onChangeSearchInput}
            onAddFavorite={onAddFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />} />
        </Routes>
        <Routes>
          <Route path="/favorites" exact element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

