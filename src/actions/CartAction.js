import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR_ITEMS, COMMUNE_LIST_REQUEST, COMMUNE_LIST_SUCCESS, COMMUNE_LIST_FAIL } from "../constants/CartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`process.env.REACT_APP_SERVER_URL/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.thumbnail[0],
        price: data.price,
        countInStock: data.quantity,
        qty
      }
    });

    // Update localStorage and dispatch storage event
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    // Update localStorage and dispatch storage event
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const clearCartItems = () => (dispatch) => {
  try {
    dispatch({
      type: CART_CLEAR_ITEMS,
    });

    // Clear localStorage and dispatch storage event
    localStorage.removeItem('cartItems');
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error clearing cart items:', error);
  }
};

export const listCommunesAndFees = (wilaya_code, fee_type) => async (dispatch) => {
  try {
    dispatch({ type: COMMUNE_LIST_REQUEST });

    const { data } = await axios.get(`process.env.REACT_APP_SERVER_URL/api/wilayas/${wilaya_code}/${fee_type}`);

    dispatch({
      type: COMMUNE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMUNE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
