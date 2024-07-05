'use client'
import React, { useState } from 'react'
import AddToCart from './AddToCart'
import styles from './ProductCard.module.css'
import Link from 'next/link'
const ProductCard = () => {

  return (
    <div className={"carousel rounded-box p-10"}>
        <div className="carousel-item card w-96 bg-base-100 shadow-xl m-4">
            <figure className="px-10 pt-10">
                <img src="\assets\img\burger.jpg" alt="Food" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Food Classifier!</h2>
                <p>Identify Edible Delights 🍔</p>
                <div className="card-actions">
                    {/* <button className="btn btn-primary">Try Now</button> */}
                   <Link className='btn btn-primary' href={{ pathname: "/classifier", 
   query: { name: "Food"}}}>Try Now</Link>
                </div>
            </div>
        </div>
        <div className="carousel-item card w-96 bg-base-100 shadow-xl m-4">
            <figure className="px-10 pt-10">
                <img src="\assets/img/flower.jpg" alt="Flower" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Flower Classifier!</h2>
                <p>Recognize Nature's Blossoms 🌸</p>
                <div className="card-actions">
                <Link className='btn btn-primary' href={{ pathname: "/classifier", 
                        query: { name: "Flower"}}}>Try Now</Link>
                </div>
            </div>
        </div>
    </div>

  )
}

export default ProductCard