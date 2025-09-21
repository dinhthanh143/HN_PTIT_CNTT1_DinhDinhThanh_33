import React, { useEffect, useState } from "react";
import type { ProductType } from "../reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import type { RootType } from "../store/store";
type Prop = {
  index: number;
  item: ProductType;
};
export const TableRow = ({ item, index }: Prop) => {
  const { products } = useSelector((state: RootType) => state);
  const dispatch = useDispatch();
  const handeDelete = (id: number, quantity: number) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
    dispatch({
      type: "RESTORE_QUANTITY",
      payload: { id: id, quantity: quantity },
    });
  };
  const handleUpdate = (product: ProductType) => {
    if (!amount) {
      return;
    }
    if (
      products.some((p) => p.id === product.id && p.initialQuantity! < amount)
    ) {
      dispatch({ type: "FAILED" });
      setTimeout(() => {
        dispatch({ type: "OFF" });
      }, 2000);
      return;
    }
    dispatch({
      type: "UPDATE_ITEM",
      payload: { product: product, amount: amount },
    });
    dispatch({
      type: "REDUCE_QUANTITY",
      payload: { p: product, amount: amount },
    });
    dispatch({ type: "UPDATED" });
    setTimeout(() => {
      dispatch({ type: "OFF" });
    }, 2000);
  };

  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    setAmount(null);
  }, [item]);
  return (
    <tr key={item.id}>
      <td>{index}</td>
      <td>{item.name}</td>
      <td>{item.price} USD</td>
      <td>
        <input
          type="number"
          value={amount === null ? item.quantity : amount < 1 ? 1 : amount}
          onChange={(e) => setAmount(Number(e.target.value))}></input>
      </td>
      <td>
        <button className="btn-update" onClick={() => handleUpdate(item)}>
          Update
        </button>
        <button
          className="btn-delete"
          onClick={() => handeDelete(item.id, item.quantity)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
