import React, { useState } from "react";
import styles from "../../components/Navbar.module.css";
import styles1 from "./Settings.module.css";
import heart from "../../Assets/images/heart.gif";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [showBasicInfo, setShowBasicInfo] = useState(false);
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const [showViewContent, setShowViewContent] = useState(false);
  const [showWhatyousee, setShowWhatyousee] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const handlehome = () => {
    navigate("/mainpage")
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
  const handlesupport = () => {};

  const togglebasicinfo = () => {
    setShowBasicInfo((prev) => !prev);
  };
  const toggleprofilephoto = () => {
    setShowProfilePhoto((prev) => !prev);
  };
  const toggleViewcontent = () => {
    setShowViewContent((prev) => !prev);
  };
  const toggleWhatyousee = () => {
    setShowWhatyousee((prev) => !prev);
  };
  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
  };
  return (
    <div className={styles1.maincont}>
      <nav className={styles.navmain}>
        <div className={styles.writtenlogo}>Shareverse</div>
        <div className={styles.navbarmain}>
          <div className={styles.navbarcontent}  onClick={handlehome}>
            <img
              src="https://img.icons8.com/windows/64/home.png"
              alt="home"
             
            />
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
        <div className={styles1.settings}>
          <nav>
            <div className={styles1.basicsettings}>
              <p onClick={togglebasicinfo}>Change basic info</p>
              
            </div>
            <div className={styles1.basicsettings}>
              <p onClick={toggleprofilephoto}>Change Profile Photo</p>
            </div>
            <div className={styles1.basicsettings}>
              <p className={styles1.basicsettings} onClick={toggleWhatyousee}>
                What you see
              </p>
            </div>
            <div className={styles1.basicsettings}>
              <p className={styles1.basicsettings} onClick={toggleViewcontent}>
                Who can view your content
              </p>
            </div>
            <div className={styles1.basicsettings}>
              <p className={styles1.basicsettings} onClick={toggleHelp}>
                Help
              </p>
            </div>
          </nav>
          <div className={styles1.contentinside}>
            {showBasicInfo ? (
                    <div className={styles1.contentinsidediv}>
                    <span>Change Username <input type="text" /></span>
                    
                    <span>Change Email<input type="text" /></span>
                    
                    <span>Change Password<input type="password" /></span>
                    
                    <button>Save</button>
                    </div>
                ) : (
                    <div> </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
