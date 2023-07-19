import React, { useState } from 'react'
import styles from './Signup.module.css'
import user from '../images/user.png'
import lock from '../images/lock.png'
import email from '../images/email.png'
import google from '../images/google.png'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { auth, provider } from '../../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
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
                        if (err.message === "auth/email-already-in-use") {
                            throw new Error("Email already exists");
                          } else if (err.message === "auth/network-request-failed") {
                            throw new Error("Check internet connectivity");
                          } else if (err.message === "auth/invalid-email") {
                            throw new Error("Enter a valid email");
                          } else if (err.message === "auth/weak-password") {
                            throw new Error("Password should contain at least 6 characters");
                          } else {
                            throw new Error(err.message);
                          }
                      }),
                    
             {
               loading: 'Saving...',
               success: <b>Successfully Signed up!</b>,
               error: err=> <b>{err}</b>
               
             }
           );
           navigate('/login')
        
    }

    const handlegoogle=()=>{
        toast.promise(
            signInWithPopup(auth,provider)
            .then((result)=>{
                const credential=GoogleAuthProvider.credentialFromResult(result);
                const token=credential.accessToken;
                const user=result.user
                console.log(user)
                console.log(token)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            }),
             {
               loading: 'Saving...',
               success: <b>Successfully Signed up!</b>,
               error: err=> <b>{err}</b>
               
             }
           );
           navigate('/mainpage')

        
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
            <div className={styles.google} onClick={handlegoogle}>
                <img src={google} alt='google'></img>
                <span>Login in with google</span>
            </div>
            <div className={styles.signinbtmsignup}>
                <span>Already have an account?</span>
                <span onClick={() => navigate('/login')} className={styles.signupbtm}>Login</span>
                
            </div>

        </div>
            <Toaster/>
        
    </div>
  )
}
