import React from 'react'
import styles from './Login.module.css'
import instafont from '../images/instafont.png'
import apple from '../images/appstore.png'
import google from '../images/googleplaystore.png'
import fb from '../images/fb.png'
import sideimg from '../images/sideimage.png'

export default function Login() {
  return (
    <div className={styles.container}>
        <div className={styles.myimages}>
           <img src={sideimg} alt='sideimg' className={styles.sideimage}></img>
        </div>
        <div className={styles.maincont}>

            <div className={styles.logincont1}>
                <img src={instafont} alt='instafont' className={styles.instafonttitle}></img>
                <input type='text' placeholder='Phone number, username or email address'></input>
                <input type='password' placeholder='Password'></input>
                <button>Log In</button>
                <div className={styles.orline}>
                    <div style={{width:"100%",paddingRight:'20px'}}>
                        <hr/>
                    </div>
                    <div>
                        <span>OR</span>
                    </div>
                    <div style={{width:'100%',paddingLeft:'20px'}}>
                        <hr/>
                    </div>
                </div>
                <div className={styles.facebook}>
                    <img src={fb} alt='facebook' style={{height:'32px',width:'32px'}}></img>
                    <span>Log in with Facebook</span></div>
                    <div style={{fontSize:'small',padding:'10px'}}>Forgotten your password?</div>
                </div>


            <div className={styles.logincont2}>Don't have an account?<span> Sign Up</span></div>
            <div className={styles.logincont3}>
                <div>Get the app.</div>
                <div className={styles.googleapple}>
                    <img src={apple} alt='appleimg'></img>
                    <img src={google} alt='googleimg'></img>
                </div>
               
                
            </div>
        </div>
    </div>
  )
}
