import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function FilterBar({handleCatagory}) {
    const [isLoading,setIsLoading]=useState(false);
    const [allCatagories,setAllCatagories]=useState([]);
    const [view,setView]=useState('')
    function handleFilterChange(event, nextView){
    setView(nextView);
    console.log(nextView);
    changeCatagory(nextView);
    }
    async function changeCatagory(catagory) {
        // setIsLoading(true);
        try {
            const response=await axios.get(`https://dummyjson.com/products/category/${catagory}`);
            console.log(response.data.products);
            handleCatagory(response.data.products) ;
        } catch (error) {
            console.log(error);
        }
    }
    async function getAllCatagories() {
        setIsLoading(true);
        try {
            const response=await axios.get(`https://dummyjson.com/products/category-list`);
            console.log(response.data);
            setAllCatagories(response.data) ;
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getAllCatagories();
    },[]);
  return (
    <div className="filter-bar">
      <Box className="filter-root" sx={{ width: 250 }}>
        <div className="filter-header">
          <Typography variant="h6">Filters</Typography>
          <Button
            className="filter-resetButton"
            onClick={() => {
              console.log("reset");
            }}
          >
            Reset All
          </Button>
        </div>
        <div className="filter-section">
          <Typography variant="h5">Catagories</Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleFilterChange}
            sx={{mt:2}}
          >
            {!isLoading ? allCatagories.map((catagory)=>{
                return <ToggleButton value={catagory} aria-label={catagory}>
                {catagory}
              </ToggleButton>
            }):<h1>loading...</h1>}
          </ToggleButtonGroup>
        </div>
        {/* <div className="filter-section">
          <Typography variant="subtitle1">Price</Typography>
          <Slider
            // value={priceRange}
            // onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={1000}
            max={11759}
            className="filter-slider"
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">₹</Typography>
            <Typography variant="body2">₹</Typography>
          </Box>
          <Button className="filter-applyButton" onClick={()=>{}}>
            Apply Filters
          </Button>
        </div> */}
      </Box>
    </div>
  );
}

export default FilterBar;
