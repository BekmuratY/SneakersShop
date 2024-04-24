import React from "react"; 
import axios from "axios";
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from "./context";





function App(){
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(''); 
  const [cartOpened, setCartOpened ] = React.useState(false);
  const [isLoading, setIsLoading ] = React.useState(true);




  React.useEffect(() => { 
   async function fetchData(){
    
    try {
    const [cartResponse, favoritesResponse, itemsResponse] =  await Promise.all(
      [ axios.get('https://6e208e995a32c491.mokky.dev/cart'),
        axios.get('https://6e208e995a32c491.mokky.dev/favorite'),
        axios.get('https://6e208e995a32c491.mokky.dev/items')  
      ]);

    setIsLoading(false); 
    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
    setItems(itemsResponse.data); 
    } catch (error) {
      alert("Ошибка сервера!");
      console.error(error);

    }

   }
   

   fetchData();
  }, []); 
  
  

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem){
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id))); 
        await axios.delete(`https://6e208e995a32c491.mokky.dev/cart/${findItem.id}`); 
      } else {
        const {data} = await axios.post('https://6e208e995a32c491.mokky.dev/cart', obj); 
        setCartItems(prev => [...prev, data ]);

      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину!");
      console.error(error);
    }
    
  }

  const  onRemoveItem =  (id) =>  {
    try {
      axios.delete(`https://6e208e995a32c491.mokky.dev/cart/${id}`); 
      setCartItems(prev => prev.filter(item => item.id !== id ));
    } catch (error) {
      alert("Ошибка при удалении из корзины!");
      console.error(error);
    } 
  }
  
    const  onAddFavorite = async (obj) =>  {
      try {
        if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
          axios.delete(`https://6e208e995a32c491.mokky.dev/favorite/${obj.id}`); 
          setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
     
          } else {
            const {data} = await axios.post('https://6e208e995a32c491.mokky.dev/favorite', obj); 
            setFavorites(prev => [...prev, data ]); 
          }
      } catch (error) {
        alert("Не удалось добавить в фафориты")
      }
   }

   const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);  
  }


  const isItemAdded = (id) =>{
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return ( 
    <AppContext.Provider 
    value={{items, cartItems, favorites, isItemAdded, onAddFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
    

    {cartOpened ? <Drawer items = {cartItems} onClose = {() => setCartOpened(false) } onRevome = {onRemoveItem} /> : null}

    <Header onClickCart = {() => setCartOpened(true) }  />


    <Routes>
  <Route path="/" exact element={<Home 
       items={items} 
       cartItems = {cartItems}
       searchValue={searchValue} 
       setSearchValue={setSearchValue} 
       onChangeSearchInput={onChangeSearchInput}
       onAddFavorite={onAddFavorite}
       onAddToCart={onAddToCart}
       isLoading ={isLoading}
       />} />
</Routes>

<Routes>
  <Route path="/favorites" exact element={<Favorites/>} />
</Routes>

  </div>
    </AppContext.Provider>
  );
}
export default App;
