import React from "react";
import "../App.css";
import type { RootType } from "../store/store";
import {  useSelector } from "react-redux";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { CartFooter } from "./CartFooter";
export const Cart = () => {
  const { cart } = useSelector((state: RootType) => state);
  
  return (
    <div className="cart-box">
      <div className="cart-header">Your Cart</div>
      <div className="table-wrapper">
        <table>
          <TableHead />
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan={5}>Chưa có sản phảm nào trong giỏ</td>
              </tr>
            ) : (
              cart.map((item, index) => (
                <TableRow index={index + 1} item={item} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <CartFooter />
    </div>
  );
};
