import React from 'react';
import {useState, useEffect} from 'react';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

import { db, auth, googleProvider } from './firebase.config';
import { signInWithPopup, signOut } from 'firebase/auth';
import {collection, doc, addDoc, getDocs, deleteDoc, query, where, updateDoc} from 'firebase/firestore'
import Register from './components/Register';

function App() {
  const [products, setProducts] = useState([]);
  // const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [cartItems, setCartItems] = useState([]);
  
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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

   const getCartFromFireSotre = async () => {
        const collectionRef = collection(db, "cart");
        const querySanpShot = await getDocs(collectionRef)
        //console.log(querySanpShot)
       const listOfAllItems =  querySanpShot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      // console.log(listOfAllItems)
       setCartItems(listOfAllItems)
   };

  useEffect(() => {

    fetchProducts();
    getCartFromFireSotre();
    // Retrive cartItems from local storage on each refresh
   // const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
   // console.log('i am stored cart after refresh')
   // console.log(storedCart);
   // setCartItems(storedCart);
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

  const addToFireStoreCart = async (item) => {
    // Here I need my logic how to add items to Firestore database
        console.log(item)
    try {
         item.qty = 1;
         item.pId = item.id;
        const collectionRef = collection(db, 'cart');
        
        const querySanpShot = await getDocs(collectionRef)

        if(querySanpShot.size > 0) {

          const myQuery = query(collectionRef, where('pId', '==', item.id))
          const docsSnap = await getDocs (myQuery)
          const docSnap = docsSnap.docs[0];
          
          //if(docSnap.exists) // Idealy we should use this one, but sometime it works and sometime it doesn't so I am useing the blow instead of exist
          if(docsSnap.size > 0) {
              // As the item already exist so we simply update the quantity
              const id = docSnap.id;
              const documentRef = doc(collectionRef, id)
              await updateDoc (documentRef, {
                qty: docSnap.data().qty + 1
              })

          } else {
            const docRef = await addDoc(collectionRef, item)
            console.log("Item added successfuly to the cart with ID: ", docRef.id)
          }



        } else {

          const docRef = await addDoc(collectionRef, item)
          console.log("Item added successfuly to the cart with ID: ", docRef.id)
        }

    } catch (error) {
       console.error("Sorry item is not added to cart: ", error)
    }
  }

  const dropFromFireStore = async (id) => {
    try {
      console.log("I am in dropFromFireStore function")
      console.log(id)
      const collectionRef = collection(db, 'cart')
      const documentRef = doc(collectionRef, id)
      await deleteDoc(documentRef)
       console.log("Item droped from cart successfully")
       getCartFromFireSotre();
     // await deleteDoc(doc(db, 'cart', id))

    } catch (error) {
      console.error("Sorry the item can't be droped: ", error)
    }
  }

  return (
    <>        
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/products' element={<Products addToCart = {addToCart} />} /> */}
        <Route path='/products' element={<Products addToCart = {addToCart} addToFireStoreCart = {addToFireStoreCart} products = {products} />} />
        <Route path='/cart' element={<ShoppingCart cartItems = {cartItems} dropFromFireStore={dropFromFireStore} />} />
        <Route path='/login' element={<Login setEmail={setEmail} setPassword={setPassword} />} />
        <Route path='/Register' element={<Register setEmail ={setEmail} setPassword = {setPassword} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

       {/* <h1>Welcome to my Store</h1>
      <ShoppingCart cartItems = {cartItems} />
      <Products addToCart = {addToCart} /> */}
    </>
  );
}

export default App;
