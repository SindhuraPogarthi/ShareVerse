import React from 'react'
import styles from './Navbar.module.css'
import heart from '../Assets/images/heart.gif'


export default function Navbar() {
  return (
    <div>
        <nav className={styles.navmain}>
            <div className={styles.writtenlogo}>
                    Shareverse
            </div>
            <div className={styles.navbarmain}>
                <div className={styles.navbarcontent}>
                <img src="https://img.icons8.com/windows/64/home.png" alt="home"/>
                    <span>Home</span>
                </div>
                <div className={styles.navbarcontent}>
                <img src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1"/>
                    <span>Search</span>
                </div>
                <div className={styles.navbarcontent}>
                    <img src="https://img.icons8.com/ios/50/messages-mac.png" alt="messages-mac"/>
                    <span>Messages</span>
                </div>
                <div className={styles.navbarcontent}>
                <img src="https://img.icons8.com/material-outlined/48/filled-appointment-reminders.png" alt="filled-appointment-reminders"/>                    <span>Notifications</span>
                </div>
                <div className={styles.navbarcontent}>
                    <img src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1"/>
                    <span>Create</span>
                </div>
                <div className={styles.navbarcontent}>
                    <img src="https://img.icons8.com/ios/50/settings--v1.png" alt="settings--v1"/>                    <span>Settings</span>
                </div>
                <div className={styles.navbarcontent}>
                    <img src={heart} alt='support us' style={{mixBlendMode:'multiply'}}></img>
                    <span>Support Us</span>
                </div>
                
            </div>
        </nav>
    </div>
  )
}
