import React from 'react';
import {useState, useEffect} from 'react';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

import { db } from './firebase.config';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
 // const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            console.log('I am in useEffect and going to fetch the products')
            const items = await axios.get('https://fakestoreapi.com/products/');
            //console.log(items)
            console.log(items.data)
            setProducts(items.data);
        } catch (error) {
            console.error('Sorry got error while fetching the products: ', error);
        }
    };

    fetchProducts();
    // Retrive cartItems from local storage on each refresh
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('i am stored cart after refresh')
  console.log(storedCart);
    setCartItems(storedCart);
}, []);

// When ever cart item changes the cart will be updated and store in local storage.
useEffect(() =>{
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
 // const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
 // console.log('i am stored cart')
 // console.log(storedCart);
}, [cartItems]);

  const addToCart = (item) => { 
    console.log('i am adding item = ')
    console.log(item)
    setCartItems([...cartItems, item])
    console.log(cartItems)
  }
  return (
    <>        
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/products' element={<Products addToCart = {addToCart} />} /> */}
        <Route path='/products' element={<Products addToCart = {addToCart} products = {products} />} />
        <Route path='/cart' element={<ShoppingCart cartItems = {cartItems} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

       {/* <h1>Welcome to my Store</h1>
      <ShoppingCart cartItems = {cartItems} />
      <Products addToCart = {addToCart} /> */}
    </>
  );
}

export default App;
