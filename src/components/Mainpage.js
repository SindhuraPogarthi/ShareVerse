import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Navbar from './Navbar';
import Demo from '../Pages/Feed/Demo';
import Friends from './Friends';

export default function Mainpage(props) {
  const navigate=useNavigate();

  const handlesignout=()=>{
    signOut(auth).then(()=>{
      navigate("/login")
    })
  }
  const handlesubmit=()=>{
    navigate("/login")
  }
  return (
    <div>
      {props.user?(
        <div style={{display:"flex",justifyContent:"space-between"}}>
             {/* <h1>Welcome {props.user}</h1> */}
            {/* <button onClick={handlesignout}>Sign Out</button> */} 
            <Navbar/>
            <Demo/>
            <Friends user={props.user}/>
        </div>
      ):(
        <div>
          <button onClick={handlesubmit}>Please login first</button>
        </div>
      )}
    </div>
    
  )
}
