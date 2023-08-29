import { createContext, useReducer } from "react";
import { type ProductsEntity } from "../types";

type CartContextType = {
  cart: ProductsEntity[];
  addToCart: (product: ProductsEntity) => void;
  removeFromCart: (product: ProductsEntity) => void;
  clearCart: () => void;
};

const updateLocalStorage = (state:any) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = (JSON.parse(window.localStorage.getItem("cart"))) || [];

const reducer = (state: ProductsEntity[], action: any) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const productInCart = state.findIndex(
        (item: any) => item.id === action.payload.id
      );

      if (productInCart >= 0) {
        const newCart = structuredClone(state);
        newCart[productInCart].quantity += 1;
        return newCart;
      }
      const newState = [...state, { ...action.payload, quantity: 1 }];
      updateLocalStorage(newState);
      return newState;
    }
    case "REMOVE_FROM_CART": {
      const newState = state.filter((item) => item.id !== action.payload.id);
      updateLocalStorage(newState);
      return newState;
    }
    case "CLEAR_CART": {
      updateLocalStorage(initialState);
      return initialState;
    }
  }
};

//1. Crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (product) => {},
  clearCart: () => {},
});

//2. Crear Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: any) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product: any) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
    });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
