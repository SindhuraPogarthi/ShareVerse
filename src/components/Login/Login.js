import React, { useState } from 'react'
import styles from './Login.module.css'
import user from '../images/user.png'
import lock from '../images/lock.png'
import google from '../images/google.png'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { toast,Toaster } from 'react-hot-toast'

export default function Login() {
    const navigate=useNavigate()

    const[values,setValues]=useState({
        email:"",
        password:"",
    })
   
    const handlelogin=()=>{
        if(!values.email || !values.password){
            toast.error("All fields are mandatory")
            return;
        }
        
        toast.promise(
            signInWithEmailAndPassword(auth,values.email,values.password)
            .then((res)=>{
                const user=res.user;
                console.log(user)
                navigate('/mainpage')
                
            }).catch((err) => {
                    throw err.message
              }),
            
     {
       loading: 'Saving...',
       success: <b>Successfully Signed up!</b>,
       error: err=> <b>{err}</b>
       
     }
   );
   
    }
  return (
    <div className={styles.container}>
        <div className={styles.signinouter}>
            <h1>Log in</h1>
            <div className={styles.signinusername}>
                <input type='text' placeholder='Email'
                onChange={(e)=>setValues((prev)=>({...prev,email:e.target.value}))}></input>
                <img src={user} alt='username'></img>
            </div>
            <div className={styles.signinpassword}>
                <input type='password' placeholder='Password'
                onChange={(e)=>setValues((prev)=>({...prev,password:e.target.value}))}></input>
                <img src={lock} alt='username'></img>
            </div>
            <div className={styles.additionalline}>
                <input type='checkbox' className={styles.checkbox}></input>
                <span>Remember me</span>
            </div>
            <motion.button
                whileHover={{scale:1.1}}
                whileTap={{scale:0.4}}
                onClick={handlelogin}
            >Login</motion.button>
            <div className={styles.google}>
                <img src={google} alt='google'></img>
                <span>Login in with google</span>
            </div>
            <div className={styles.signinbtmsignup}>
                <span>Already have an account?</span>
                <span onClick={()=>navigate('/')} className={styles.signupbtm}>Sign Up</span>
            </div>

        </div>
        <Toaster/>
    </div>
  )
}
