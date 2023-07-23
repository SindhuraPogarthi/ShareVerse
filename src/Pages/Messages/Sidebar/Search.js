import React from 'react'
import styles from './Serach.module.css'
import image from '../../../Assets/images/wllpaper2.webp'

export default function Search() {
  return (
    <div className={styles.serach}>
        <div className={styles.searchform}>
            <input type='text' placeholder='Find a user....'></input>
        </div>
        <div className={styles.userchat}>
            <img src={image} alt='myimage'></img>
            <div className={styles.userchatinfo}>
                <span>Elena</span>
            </div>

        </div>

    </div>
  )
}
