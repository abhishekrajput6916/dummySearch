import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Box, Button, SwipeableDrawer } from '@mui/material';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import useMediaQuery from '@mui/material/useMediaQuery';

function Home1() {
    const matches = useMediaQuery('(min-width:600px)');
    const [productList,setProductList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [drawer, setDrawer] = React.useState(false);
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
    const toggleDrawer = (event) => {
        setDrawer(event);
        // setState({ ...state, [anchor]: open });
      };
  return (
    <div className='container'>
        <div className="filters">
            {!matches?
            <>
            <Button onClick={()=>{toggleDrawer(true)}}>Filters</Button>
    <SwipeableDrawer
      open={drawer}
      onClose={()=>{toggleDrawer(false)}}
      onOpen={()=>{toggleDrawer(true)}}
      sx={{textAlign:'center'}}
    >
      <FilterBar handleCatagory={setProductList}/>
    </SwipeableDrawer></>:<FilterBar handleCatagory={setProductList}/>}
            </div>
    <Box className='home' sx={{mt:'1rem'}}>
        {!isLoading?productList.map(product=>{
            return <ProductCard product={product}/>
        }):<h1>Loading...</h1>}  
    </Box>
    </div>
  )
}

export default Home1