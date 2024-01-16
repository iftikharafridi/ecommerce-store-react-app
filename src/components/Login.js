import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase.config";
import UserContext from "./UserContext";
import React, {useContext, useEffect} from 'react'

function Login({setEmail, setPassword, loginErrorMessage, setLoginErrorMessage}) {
  const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
      console.log(user)
    },[user])

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('I am in in handleLogin Function')
        const email = e.target.email.value;
        const password = e.target.password.value;

        // signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        //     console.log(userCredential.user)
        //     setUser(userCredential.user)
        //    // console.log(user)
        //     navigate('/products')
        // }).catch((error) => {
        //     console.error(error)
        // })
        try {
           const userCredential = await signInWithEmailAndPassword(auth, email, password)
           console.log(userCredential.user)
           setUser(userCredential.user)
           navigate('/products')
        } catch(error){
          console.error(error)
          setLoginErrorMessage(error.code)
        }


    }

    const handleGoogleLogin = async (e) => {
      e.preventDefault();
      console.log('I am in in handGoogleLogin Function')
      
      // signInWithPopup(auth, googleProvider).then((userCredential) => {
      //     console.log(userCredential.user)
      //     setUser(userCredential.user)
      //     //console.log(user)
      //     navigate('/products')
      // }).catch((error) => {
      //    // console.error(error)
      // })

      try {
        const userCredential = await signInWithPopup(auth, googleProvider)
        console.log(userCredential.user)
        setUser(userCredential.user)
        navigate('/products')
     } catch(error){
       console.error(error)
       setLoginErrorMessage(error.code)
     }


  }
  return (
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}  />
        </Form.Group>
         {loginErrorMessage && <p style={{color: 'red'}}>{loginErrorMessage}</p> }
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/Register">No Account? Register Please</Link>
      <Button variant="primary" onClick={handleGoogleLogin}>Google Login</Button>
    </>
  );
}

export default Login;
