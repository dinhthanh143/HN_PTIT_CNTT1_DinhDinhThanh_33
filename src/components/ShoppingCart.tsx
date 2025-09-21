import React from 'react'
import "../App.css"
import { ProductList } from './ProductList'
import { Notification } from './Notification'
import { Cart } from './Cart'
export const ShoppingCart = () => {
  return (
    <div style={{width:"80%"}}>
        <h2>Shopping cart</h2>
        <hr />
        <div className='container'>
        <ProductList/>
        <Cart/>
        <Notification/>
        </div>
    </div>
  )
}
