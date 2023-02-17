import { currencyFormat } from "@/utils/currencyFormat";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import styles from "./styles.module.scss";
import { cartActions, favoriteActions } from "@/store/actions";
import { AppCtx } from "@/store/context";
import { useContext } from "react";

const CoinsItem = ({ data }) => {
  const {
    state: { favorite },
    dispatch,
  } = useContext(AppCtx);

  const { image, name, symbol, current_price, price_change_percentage_24h } = data;

  const addToCartHandler = () => {
    dispatch({
      type: cartActions.ADD_TO_CART,
      payload: data,
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.icon_wrapper}>
        <img src={image} alt={name} />
        <div className={styles.coin_name}>
          <p className={styles.name}>{name}</p>
          <p className={styles.symbol}>{symbol}</p>
        </div>
      </div>
      <div className={styles.price}>
        <div>
          <p>{currencyFormat(current_price)}</p>
        </div>
        <div>
          <p
            className={`${styles.price_change} ${
              price_change_percentage_24h < 0 ? styles.price_down : styles.price_up
            }`}
          >
            {price_change_percentage_24h < 0 ? <FiTrendingDown /> : <FiTrendingUp />}
            <span> </span>
            {price_change_percentage_24h}
          </p>
        </div>
      </div>
      <div className={styles.button_wrapper}>
        <button onClick={() => addToCartHandler()}>TRADE</button>

        {/* FAVORITE BUTTON -> DISPATCH + CONDITIONAL RENDERING */}
        {favorite.find((fav) => fav.id === data.id) ? (
          <i>
            <AiFillStar
              onClick={() => dispatch({ type: favoriteActions.REMOVE_FAVORITE, payload: data })}
            />
          </i>
        ) : (
          <i>
            <AiOutlineStar
              onClick={() => dispatch({ type: favoriteActions.ADD_FAVORITE, payload: data })}
            />
          </i>
        )}
      </div>
    </div>
  );
};

export default CoinsItem;
