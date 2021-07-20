import React from 'react'

import './Product.css';

const product = ({name,image,price}) => {
    return (
        <div className='container'>
            <b className='container_text'>{name}</b>
            <p className='container_text'>${price}</p>
            <img className='container_image' src ={image}></img>
        </div>
    )
}

export default product;
