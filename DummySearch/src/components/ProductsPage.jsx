import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';

function ProductsPage() {
    const product=useLocation().state;
    const [productList,setProductList]=useState([]);
    const [isLoading,setisLoading]=useState(false);
    async function getData(){
        setisLoading(true);
        try {
            const response=await axios.get(`https://dummyjson.com/products/search?q=${product.title}`)
            setProductList(response.data.products);
            console.log(response.data.products);
        } catch (error) {
            console.log(error);            
        }finally{
            setisLoading(false);
        }
    }
    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
        getData();
    },[product])
  return (
    <div className="products-page">
        <div className='product-list'>{!isLoading?productList.map(product=>{
        return <ProductCard product={product}/>
    }):<h1>Loading...</h1>}</div>
    </div>
  )
}

export default ProductsPage