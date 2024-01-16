import React from 'react'
import {useNavigate} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from './UserContext';
import {useContext} from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase.config';


const NavBar = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault()
    setUser(null)
    console.log(user)
    await signOut(auth)
    navigate('/')
  }
  return (
    <>
    {
      // Method-01
    // user !==null ? ('Then this option is displayed when user in not null') : ('Then this option is displayed if the usser is null')
    
    //Method-02
    // user ? ('Then this option is displayed when user in not null') : ('Then this option is displayed if the usser is null')
    
    //Method-03
    //user && 'Then this option is displayed when user in not null'
    //!user && 'Then this option is displayed if the usser is null'

    user ? (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/cart">Shopping Cart</Nav.Link>
            <Nav.Link href="" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    ):(
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )

    }
        {/* <nav>
            <Link to="/">Home</Link>{' '}
            <Link to="/about">About</Link>{' '}
            <Link to="/contact">Contact</Link>{' '}
            <Link to="/products">Products</Link>{' '}
            <Link to="/cart">Shopping Cart</Link>{' '}
            <Link to="/login">Login</Link>{' '}
            <Link to="/logout">Logout</Link>{' '}
        </nav> */}
         
    </>
  )
}

export default NavBar;
