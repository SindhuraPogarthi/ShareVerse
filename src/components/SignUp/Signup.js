import React, { useState } from 'react'
import styles from './Signup.module.css'
import user from '../images/user.png'
import lock from '../images/lock.png'
import email from '../images/email.png'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const[values,setValues]=useState({
        name:"",
        email:"",
        password:"",
    })
    const navigate=useNavigate();
   
    const handlesignup=()=>{
        if(!values.name || !values.email || !values.password){
            toast.error("All fields are mandatory")
            return;
        }
        
        toast.promise(
                    createUserWithEmailAndPassword(auth,values.email,values.password)
                    .then((res) => {
                        const user=res.user;
                        console.log(user)
                        updateProfile(user,{
                            displayName:values.name
                        })
                    }).catch((err) => {
                        if(err.message === "Firebase: Error (auth/email-already-in-use).")
                            throw "Email already exists";

                        else if(err.message === "Firebase: Error (auth/network-request-failed).")
                            throw "Check internet connectivity"
                        else if(err.message === "Firebase: Error (auth/invalid-email).")
                            throw "Enter a valid email"
                        else if(err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
                            throw "Password should contain atleast 6 characters"

                        else
                            throw err.message
                      }),
                    
             {
               loading: 'Saving...',
               success: <b>Successfully Signed up!</b>,
               error: err=> <b>{err}</b>
               
             }
           );
           navigate('/login')
        
    }
    
  return (
    <div className={styles.container}>
        <div className={styles.signinouter}>
            <h1>Sign Up</h1>
            <div className={styles.signinusername}>
                <input type='text' placeholder='Username' 
                onChange={(e)=>{setValues((prev)=>({...prev,name:e.target.value}))}}></input>
                <img src={user} alt='username'></img>
            </div>
            <div className={styles.signinemail}>
                <input type='email' placeholder='Email Address'
                onChange={(e)=>{setValues((prev)=>({...prev,email:e.target.value}))}}></input>
                <img src={email} alt='username'></img>
            </div>
            <div className={styles.signinpassword}>
                <input type='password' placeholder='Password'
                onChange={(e)=>{setValues((prev)=>({...prev,password:e.target.value}))}}></input>
                <img src={lock} alt='username'></img>
            </div>
            <div className={styles.additionalline}>
                <input type='checkbox' className={styles.checkbox}></input>
                <span>Remember me</span>
            </div>
            <motion.button
                whileHover={{scale:1.1}}
                whileTap={{scale:0.4}}
                onClick={handlesignup}
            >Sign Up</motion.button>
            <div className={styles.signinbtmsignup}>
                <span>Already have an account?</span>
                <span onClick={() => navigate('/login')} className={styles.signupbtm}>Login</span>
                
            </div>

        </div>
            <Toaster/>
        
    </div>
  )
}
