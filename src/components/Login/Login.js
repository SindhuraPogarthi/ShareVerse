import React from 'react'
import styles from './Login.module.css'
import user from '../images/user.png'
import lock from '../images/lock.png'

export default function Login() {
    
  return (
    <div className={styles.container}>
        <div className={styles.signinouter}>
            <h1>Sign In</h1>
            <div className={styles.signinusername}>
                <input type='text' placeholder='Username'></input>
                <img src={user} alt='username'></img>
            </div>
            <div className={styles.signinpassword}>
                <input type='text' placeholder='Password'></input>
                <img src={lock} alt='username'></img>
            </div>
            <div className={styles.additionalline}>
                <input type='checkbox' className={styles.checkbox}></input>
                <span>Remember me</span>
            </div>
            <button>Login</button>
            <div className={styles.signinbtmsignup}>
                <span>Forgot Password</span>
                <span>Sign Up</span>
            </div>

        </div>
        
    </div>
  )
}
