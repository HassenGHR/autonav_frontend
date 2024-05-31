import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  COMMUNE_LIST_REQUEST, 
  COMMUNE_LIST_SUCCESS, 
  COMMUNE_LIST_FAIL ,

} from "../constants/CartConstants";

export const cartReducer = (
  state = { cartItems: []},
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

      case CART_CLEAR_ITEMS:
        return {
          ...state,
          cartItems :[]
        };

  
    default:
      return state;
  }
};

export const communeListReducer = (state = { communes: [], fee: null }, action) => {
  switch (action.type) {
    case COMMUNE_LIST_REQUEST:
      return { loading: true, communes: [], fee: null };
    case COMMUNE_LIST_SUCCESS:
      return { loading: false, communes: action.payload.communeNames, fee: action.payload.fee };
    case COMMUNE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
