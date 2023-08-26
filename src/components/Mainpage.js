import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
import Navbar from './Navbar';
import Demo from '../Pages/Feed/Demo';
import Friends from './Friends';
import { getAuth } from 'firebase/auth'
import { useEffect,useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'



export default function Mainpage() {
  const navigate=useNavigate();
  const [isCreateVisible, setIsCreateVisible] = useState(false);


  // const handlesignout=()=>{
  //   signOut(auth).then(()=>{
  //     navigate("/login")
  //   })
  // }
  const handlesubmit=()=>{
    navigate("/login")
  }
  const[user,setUser]=useState("")
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
        console.log(user);
        // ...
      } else {
        setUser("");
        console.log("User not logged in");
        // ...
      }
    });
  
    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <div>
      {user?(
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <Navbar toggleCreate={()=>setIsCreateVisible(!isCreateVisible)}/>
            <Demo isCreateVisible={isCreateVisible}/>
            <Friends user={user}/>
        </div>
      ):(
        <div>
          <button onClick={handlesubmit}>Please login first</button>
          <button onClick={console.log(user)}>Click</button>
        </div>
      )}
    </div>
    
  )
}
