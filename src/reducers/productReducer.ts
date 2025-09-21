export type ProductType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  desc: string;
  initialQuantity?: number;
};
const initProducts = [
  {
    id: 1,
    name: "Pizza Margherita",
    quantity: 5,
    price: 12,
    image:
      "https://daylambanh.edu.vn/wp-content/uploads/2024/04/cach-lam-banh-pizza.jpg",
    desc: "Pizza Ý truyền thống với phô mai mozzarella, cà chua và lá basil.",
    initialQuantity: 5,
  },
  {
    id: 2,
    name: "Sushi Combo",
    quantity: 20,
    price: 18,
    image:
      "https://satovietnhat.com.vn/Upload/images/sushi-mon-an-noi-tieng-nhat-ban-co-tu-khi-nao-4.jpg",
    desc: "Set sushi gồm cá hồi, cá ngừ, và tôm.",
    initialQuantity: 20,
  },
  {
    id: 3,
    name: "Phở Bò",
    quantity: 15,
    price: 6,
    image:
      "https://bizweb.dktcdn.net/100/489/006/articles/pho-bo-anh-bia.jpg?v=1698658470313",
    desc: "Món ăn truyền thống Việt Nam với nước dùng thơm ngon và thịt bò.",
    initialQuantity: 15,
  },
  {
    id: 4,
    name: "Hamburger Bò",
    quantity: 25,
    price: 8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ8gZ6y0bN3FpnYa0zuWnoeQcZPLRaPG06Ag&s",
    desc: "Hamburger với thịt bò nướng, rau tươi và phô mai cheddar.",
    initialQuantity: 25,
  },
];
type ActionType =
  | { type: "ADD_TO_CART"; payload: ProductType }
  | { type: "RESTORE_QUANTITY"; payload: { id: number; quantity: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { product: ProductType; amount: number };
    }
  | { type: "REDUCE_QUANTITY"; payload: { p: ProductType; amount: number } };

const productReducer = (
  state: ProductType[] = initProducts,
  action: ActionType
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, quantity: p.quantity - 1 } : p
      );
    case "RESTORE_QUANTITY":
      return state.map((p) =>
        p.id === action.payload.id
          ? { ...p, quantity: p.quantity + action.payload.quantity }
          : p
      );
    case "REDUCE_QUANTITY":
      return state.map((p) =>
        p.id === action.payload.p.id
          ? { ...p, quantity: p.initialQuantity! - action.payload.amount }
          : p
      );

    default:
      return state;
  }
};
export default productReducer;
