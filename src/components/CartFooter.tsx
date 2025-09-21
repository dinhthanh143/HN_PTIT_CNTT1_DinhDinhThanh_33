import React, { useMemo } from 'react'
import type { RootType } from "../store/store";

import "../App.css"
import { useSelector } from 'react-redux';
export const CartFooter = () => {
    const { cart } = useSelector((state: RootType) => state);
  const countTotal = useMemo(() => {
    return cart.reduce((acc, curr) => acc+ curr.price * curr.quantity, 0);
  }, [cart]);
  return (
    <div className="cart-footer">
        There are <strong>{cart.length}</strong> items in your shopping cart.
        <span className="total-price">{countTotal} USD</span>
      </div>
  )
}
