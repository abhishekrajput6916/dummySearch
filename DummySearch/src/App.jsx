import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home1 from './components/Home1';
import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar />
       <Routes>
        <Route path='/' element={<Home1/>}/>
        <Route path='/products/:id' element={<ProductsPage/>}/>
       </Routes>
    </div>
  )
}

export default App
