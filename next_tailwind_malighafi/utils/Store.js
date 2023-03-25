import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existItem) {
        return {
          ...state,
          cart: {
            cartItems: state.cart.cartItems.map((item) =>
              item.id === existItem.id ? newItem : item
            ),
          },
        };
      } else {
        return {
          ...state,
          cart: { cartItems: [...state.cart.cartItems, newItem] },
        };
      }
    }

    case 'CART_REMOVE_ITEM': {
      return {
        ...state,
        cart: {
          cartItems: state.cart.cartItems.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
