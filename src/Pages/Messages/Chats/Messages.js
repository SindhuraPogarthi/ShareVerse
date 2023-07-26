import React from 'react'
import styles from './Messages.module.css'




export default function Messages({message}) {
    
    console.log(message)
  return (
    <div className={styles.cont}>
        <div className={`${styles.wholeinfo} ${styles.owner}`}>
            <div className={styles.messageinfo}>
                <img src='https://www.shutterstock.com/shutterstock/photos/2071252046/display_1500/stock-photo-portrait-of-cheerful-male-international-indian-student-with-backpack-learning-accessories-standing-2071252046.jpg' alt='myimg'></img>
                <span>Just now</span>
            </div>
            <div className={styles.messagecontent}>
                <p>Hello</p>
                <img height='200' width='200'src='https://www.shutterstock.com/shutterstock/photos/2071252046/display_1500/stock-photo-portrait-of-cheerful-male-international-indian-student-with-backpack-learning-accessories-standing-2071252046.jpg' alt='myimg'></img>
            </div>
        </div>
        </div>
  )
}
