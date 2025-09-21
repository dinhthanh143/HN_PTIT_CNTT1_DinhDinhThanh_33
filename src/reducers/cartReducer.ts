import type { ProductType } from "./productReducer";
type ActionType =
  | { type: "CART_RECEIVE"; payload: ProductType }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "UPDATE_ITEM"; payload: { product: ProductType; amount: number } };
const cartString = localStorage.getItem("cart");

const cart = cartString ? JSON.parse(cartString) : [];
const cartReducer = (state: ProductType[] = cart, action: ActionType) => {
  switch (action.type) {
    case "CART_RECEIVE":
      if (state.some((p) => p.id === action.payload.id)) {
        return state.map((p) =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "DELETE_ITEM": {
      const newState = state.filter((p) => p.id !== action.payload);
      if (newState.length === 0) {
        localStorage.removeItem("cart"); // xoá key luôn
      } else {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    }
    case "UPDATE_ITEM":
      return state.map((p) =>
        p.id === action.payload.product.id
          ? { ...p, quantity: action.payload.amount }
          : p
      );
    default:
      return state;
  }
};
export default cartReducer;
