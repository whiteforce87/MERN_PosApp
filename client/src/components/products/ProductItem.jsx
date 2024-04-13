import React from 'react'
import { addProduct } from '../../redux/cartSlice'
import {  useDispatch } from 'react-redux'
import { message } from 'antd';

function ProductItems({item}) {

  const dispatch = useDispatch();

  const handleClick = () =>{
    dispatch(addProduct({...item,quantity:1}))
    message.success("Ürün sepete eklendi")

  }
  return (
    
        <div className="product-item border hover:shadow-lg cursor-pointer transition-all  select-none" onClick={handleClick}>
          <div className="prouct-image">
            <img
              src={item.img}
              alt=""
              className="h-28 object-cover w-full border-b"
            />
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item.title}</span>
            <span>{item.price}₺</span>
          </div>
        </div>
     
  )
}

export default ProductItems