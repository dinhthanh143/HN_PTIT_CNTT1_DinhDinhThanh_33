import type { ProductType } from "./productReducer";
type ActionType =
  | { type: "CART_RECEIVE"; payload: ProductType }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "UPDATE_ITEM"; payload: { product: ProductType; amount: number } };

const cartReducer = (state: ProductType[] = [], action: ActionType) => {
  switch (action.type) {
    case "CART_RECEIVE":
      if (state.some((p) => p.id === action.payload.id)) {
        return state.map((p) =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "DELETE_ITEM":
      return state.filter((p) => p.id !== action.payload);
    case "UPDATE_ITEM":
      return state.map((p) =>
        p.id === action.payload.product.id
          ? { ...p, quantity:  action.payload.amount }
          : p
      );
    default:
      return state;
  }
};
export default cartReducer;
