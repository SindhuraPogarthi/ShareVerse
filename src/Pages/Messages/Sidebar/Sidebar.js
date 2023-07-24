import React from 'react'
import styles from './Sidebar.module.css'
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
// import Chats from './Chats';



    
  
export default function Sidebar() {
    const navigate=useNavigate()
    const user = auth.currentUser;
    console.log(user)
    if (!user) {
        return null;
    }

    const {displayName,photoURL} = user;
    const userUrl="https://img.icons8.com/ios-filled/50/user-male-circle.png" ;

    const handlelogout=()=>{
        signOut(auth).then(()=>{
            navigate('/login')
        })

    }
   
  return (
    <div className={styles.cont}>
        <nav className={styles.navbar}>
            <div className={styles.userdetails}>
                <img src={photoURL ? photoURL : userUrl} alt='user' className={styles.images}></img>
                <span style={{marginLeft:"10px"}}>{displayName}</span>
            </div>
            <button className={styles.logout} onClick={handlelogout}>
                Log out
            </button>
        </nav>
        <div className={styles.serach}>
            <Search/>
        </div>
        
    </div>
  )
}
