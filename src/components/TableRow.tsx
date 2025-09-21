import React, { useEffect, useState } from "react";
import type { ProductType } from "../reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import type { RootType } from "../store/store";
import Swal from "sweetalert2";
type Prop = {
  index: number;
  item: ProductType;
};
export const TableRow = ({ item, index }: Prop) => {
  const { products, cart } = useSelector((state: RootType) => state);
  const dispatch = useDispatch();
  const handeDelete = (id: number, quantity: number) => {
    Swal.fire({
      title: "Ban co chac muon xoa san pham nay khoi gio?",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Huỷ`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_ITEM", payload: id });
        dispatch({
          type: "RESTORE_QUANTITY",
          payload: { id: id, quantity: quantity },
        });
        Swal.fire("Xoá thành công!", "", "success");
      }
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
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
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
