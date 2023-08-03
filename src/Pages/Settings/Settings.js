import React, { useEffect, useState } from "react";
import styles from "../../components/Navbar.module.css";
import styles1 from "./Settings.module.css";
import heart from "../../Assets/images/heart.gif";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import pencil from '../../Assets/images/pencil.png'

export default function Settings() {
  const navigate = useNavigate();
  // const [showBasicInfo, setShowBasicInfo] = useState(false);
  // const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  // const [showViewContent, setShowViewContent] = useState(false);
  // const [showWhatyousee, setShowWhatyousee] = useState(false);
  // const [showHelp, setShowHelp] = useState(false);
  const [myuser, setMyUser] = useState(null);
  const [username,setUsername] = useState(false)
  const [email,setEmail] = useState(false)
  const [Password,setPassword] = useState(false)
  const [confirmPassword,setConfirmPassword] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setMyUser(user);
      console.log(myuser);
    });
    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);
  const handlehome = () => {
    navigate("/mainpage");
  };
  const handlesearch = () => {

  };
  const handlemessages = () => {
    navigate("/messages");
  };
  const handlenotifi = () => {

  };
  const handlecreate = () => {

  };
  const handlesettings = () => {
    navigate("/settings");
  };
  const handlesupport = () => {

  };

  const handleusername=()=>{
      setUsername((prev)=>!(prev))
  }
  const handleemail=()=>{
      setEmail((prev)=>!(prev))
  }
  const handlepassword=()=>{
      setPassword((prev)=>!(prev))
  }
  const handleconfirmpasword=()=>{
      setConfirmPassword((prev)=>!(prev))
  }
  const handlesendverfi=()=>{

  }
  

  return (
    <div className={styles1.maincont}>
      <nav className={styles.navmain}>
        <div className={styles.writtenlogo}>Shareverse</div>
        <div className={styles.navbarmain}>
          <div className={styles.navbarcontent} onClick={handlehome}>
            <img src="https://img.icons8.com/windows/64/home.png" alt="home" />
            <span>Home</span>
          </div>
          <div className={styles.navbarcontent} onClick={handlesearch}>
            <img
              src="https://img.icons8.com/ios-filled/50/search--v1.png"
              alt="search--v1"
            />
            <span>Search</span>
          </div>
          <div className={styles.navbarcontent} onClick={handlemessages}>
            <img
              src="https://img.icons8.com/ios/50/messages-mac.png"
              alt="messages-mac"
            />
            <span>Messages</span>
          </div>
          <div className={styles.navbarcontent} onClick={handlenotifi}>
            <img
              src="https://img.icons8.com/material-outlined/48/filled-appointment-reminders.png"
              alt="filled-appointment-reminders"
            />
            <span>Notifications</span>
          </div>
          <div className={styles.navbarcontent} onClick={handlecreate}>
            <img
              src="https://img.icons8.com/ios/50/add--v1.png"
              alt="add--v1"
            />
            <span>Create</span>
          </div>
          <div className={styles.navbarcontent} onClick={handlesettings}>
            <img
              src="https://img.icons8.com/ios/50/settings--v1.png"
              alt="settings--v1"
            />
            <span>Settings</span>
          </div>
          <div className={styles.navbarcontent} onClick={handlesupport}>
            <img
              src={heart}
              alt="support us"
              style={{ mixBlendMode: "multiply" }}
            ></img>
            <span>Support Us</span>
          </div>
        </div>
      </nav>

      <div className={styles1.settingsmain}>
        <h1>Settings</h1>

        {myuser && (
          <div className={styles1.settings}>
            <div className={styles1.photochange}>
              <img className={styles1.userphoto} src={myuser.photoURL} alt=""></img>
              <img src={pencil}height='30' width='30' alt="external-circle-gradak-writing-gradak-royyan-wijaya"className={styles1.pencil}       /> 
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handleusername}>Change Username</span>
              {username && 
              
                <input type="text" ></input>
              }
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handleemail}>Change Email</span>
              {email && 
              
                <input type="text" ></input>
              }
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handlepassword}>Change Password</span>
              {Password && 
              
                <input type="password" ></input>
              }
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handleconfirmpasword}>Confirm Password</span>
              {confirmPassword && 
              
                <input type="password" ></input>
              }
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handlesendverfi}>Send verification Email</span> 
            </div>


            <button>Save!</button>
          
          
          </div>
        )}
      </div>
    </div>
  );
}
