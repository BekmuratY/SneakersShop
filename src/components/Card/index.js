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
){
  const {isItemAdded } = React.useContext(AppContext);
  const [isFavorite , SetIsFavorite] = React.useState(favorited);
  const itemObj = {id, parentId: id,  title, imageUrl, price};





  const onClickPlus = () =>{
    onPlus(itemObj);  
  }

    const onClickFavorite = () => {
      onFavorite(itemObj);
      SetIsFavorite(!isFavorite); 
    };

    return (
      
        <div className={styles.card} >

      {
        loading ? <ContentLoader 
        speed={2}
        width={150}
        height={260}
        viewBox="0 0 150 260"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
       
      >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="95" /> 
        <rect x="0" y="110" rx="5" ry="5" width="150" height="15" /> 
        <rect x="0" y="140" rx="5" ry="5" width="100" height="15" /> 
        <rect x="110" y="171" rx="10" ry="10" width="35" height="35" /> 
        <rect x="1" y="180" rx="10" ry="10" width="80" height="25" />
      </ContentLoader> :
      <>
      <div className="styles.favorite" onClick = {onClickFavorite}>
      <img src={isFavorite ? "img/heart-liked.svg": "img/heart-unliked.svg" } alt="Unliked"></img>
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers"></img>
      <h5>
      {title}
      </h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Price: </span>
          <b>{price}  $</b>
        </div>

          <div>
          <img className= {styles.plus} onClick = {onClickPlus} 
           src={isItemAdded(id) ? "img/btn-cheked.svg": "img/btn-plus.svg" } alt="Plus">
           </img>
          </div>
      </div>
      </>
    
      }        

      
    </div>
    
    );
}
export default Card;