import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

const About = () => {
  const [users, setUsers] = useState([])
      
  const addUserNew = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        regid: "12345",
        name: "xyz1",
        prog: "Computer Scienc"
      });
      console.log("Student is successfully added with the ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

  }

  const getAllUsers = async () => {
    console.log("Get All Users")
    const querySnapshot = await getDocs(collection(db, "test"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
    const listOfAllUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id, ...doc.data()
    }));
    setUsers(listOfAllUsers);
   
  }

  const deleteAllUsers = async () => {

  }

  const updateAnyUser = async () => {
    
  }
  useEffect(() => {  
    //addUserNew();
   // getAllUsers();
  }, []);
  
  return (
    <div>
      Hi I am Iftikhar Afridi

      {console.log(users)}
      <button onClick={addUserNew}>Add new user</button> {' '}
      <button onClick={getAllUsers}>Gett All user</button>
    </div>
  )
}

export default About;