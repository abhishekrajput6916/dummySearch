import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';

function Home1() {
    const [productList,setProductList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    async function getData() {
        setIsLoading(true);
        try {
            const response=await axios.get('https://dummyjson.com/products');
            console.log(response.data.products);
            setProductList(response.data.products) ;
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div className='container'>
        <div className="filters"><FilterBar handleCatagory={setProductList}/></div>
    <Box className='home' sx={{mt:'1rem'}}>
        {!isLoading?productList.map(product=>{
            return <ProductCard product={product}/>
        }):<h1>Loading...</h1>}  
    </Box>
    </div>
  )
}

export default Home1