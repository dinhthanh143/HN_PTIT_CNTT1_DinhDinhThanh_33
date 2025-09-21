import { combineReducers, createStore } from "redux";
import cartReducer from "../reducers/cartReducer";
import productReducer from "../reducers/productReducer";
import notify from "../reducers/notify";
const rootReducer = combineReducers({
    products : productReducer,
    cart : cartReducer,
    notification : notify
})
export type RootType = ReturnType<typeof rootReducer>
const store = createStore(rootReducer)
export default store