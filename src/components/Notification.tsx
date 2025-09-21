import React from 'react'
import "../App.css"
import { useSelector } from 'react-redux'
import type { RootType } from '../store/store'
export const Notification = () => {
  const {notification} = useSelector((state: RootType) => state)

  return (
<div className={notification.style} style={{display: notification.status? "block" :"none"}}>
  {notification.msg}
</div>  )
}
