import React from "react";
import type { ProductType } from "../reducers/productReducer";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootType } from "../store/store";
export const ProductList = () => {
  const { products } = useSelector((state: RootType) => state);
  const dispatch = useDispatch();
  const handleAdd = (product: ProductType) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    dispatch({ type: "CART_RECEIVE", payload: product });
    dispatch({ type: "ADDED" });
    setTimeout(() => {
      dispatch({ type: "OFF" });
    }, 2000);
  };
  return (
    <div className="listContainer">
      <h4
        style={{
          color: "white",
          backgroundColor: "rgb(52, 122, 182)",
          margin: "0px",
          padding: "8px",
        }}>
        Product List
      </h4>
      {products.map((p) => (
        <div className="itemCard">
          <div>
            <img
              style={{ width: "150px", height: "100%" }}
              src={p.image}
              alt=""
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              width: "150%",
            }}>
            <span style={{ fontSize: "18px" }}>{p.name}</span>
            <span>{p.desc}</span>
          </div>
          <div
            className="itemInfo2"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "50%",
            }}>
            <span
              style={{
                border: "1px solid gray",
                padding: "15",
                visibility: p.quantity === 0 ? "hidden" : "visible",
              }}>
              {p.quantity}
            </span>
            <button
              disabled={p.quantity === 0}
              onClick={() => handleAdd(p)}
              style={{
                color: "white",
                backgroundColor: p.quantity === 0 ? "gray" : "#fe6347",
              }}>
              {p.price} USD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
