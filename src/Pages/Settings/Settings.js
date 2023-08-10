import React, { useEffect, useState } from "react";
import styles from "../../components/Navbar.module.css";
import styles1 from "./Settings.module.css";
import heart from "../../Assets/images/heart.gif";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import pencil from "../../Assets/images/pencil.png";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  // const [showBasicInfo, setShowBasicInfo] = useState(false);
  // const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  // const [showViewContent, setShowViewContent] = useState(false);
  // const [showWhatyousee, setShowWhatyousee] = useState(false);
  // const [showHelp, setShowHelp] = useState(false);
  const [img, setImg] = useState(null);
  const [myuser, setMyUser] = useState(null);
  const [username, setUsername] = useState({
    state:false,
    name:""
  });
  const [email, setEmail] = useState({
    state:false,
    myemail:""
  });
  const [Password, setPassword] = useState({
    state:false,
    mypassword:""
  });
  const [confirmPassword, setConfirmPassword] = useState({
    state:false,
    confirmpassword:""
  });


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setMyUser(user);
      console.log(myuser);
    },[]);
    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  });

  
  const handlehome = () => {
    navigate("/mainpage");
  };
  const handlesearch = () => {};
  const handlemessages = () => {
    navigate("/messages");
  };
  const handlenotifi = () => {};
  const handlecreate = () => {};
  const handlesettings = () => {
    navigate("/settings");
  };
  const handlesupport = () => {};

  const handleusername = () => {
    setUsername((prev) => !prev);
  };
  const handleemail = () => {
    setEmail((prev) => !prev);
  };
  const handlepassword = () => {
    setPassword((prev) => !prev);
  };
  const handleconfirmpasword = () => {
    setConfirmPassword((prev) => !prev);
  };
  const handlesendverfi = () => {};

  const usernameinput=(e)=>{
    setUsername((prev)=>({...prev,name:e.target.value}))
    console.log(username)

  }
  const emailinput=(e)=>{
    setUsername((prev)=>({...prev,myemail:e.target.value}))
  }
  const passwordinput=(e)=>{
    setUsername((prev)=>({...prev,mypassword:e.target.value}))
  }
  const confirmpasswordinput=(e)=>{
    setUsername((prev)=>({...prev,confirmpassword:e.target.value}))
  }


  const handleEdit = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, myuser.displayName);
        // console.log(myuser.displayName)

        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
            reject("Couldn't upload image");
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
               await updateProfile(myuser, {
                  photoURL: downloadURL,
                },)
                setMyUser((prevUser) => ({
                  ...prevUser,
                  photoURL: downloadURL, // Update the photoURL in the myuser state
                }));
               
                if(username.name){
                  await updateProfile(myuser, {
                    displayName: username.name,
                  },)
                  setMyUser((prevUser) => ({
                    ...prevUser,
                    displayName: username.name, // Update the photoURL in the myuser state
                  }));
                }
                if(email.myemail){
                  await updateProfile(myuser, {
                    displayName: email.myemail,
                  },)
                  setMyUser((prevUser) => ({
                    ...prevUser,
                    displayName: email.myemail, // Update the photoURL in the myuser state
                  }));
                }
              resolve("Sent");
            } catch (error) {
              console.log(error);
              reject("Couldn't save the message. Please try again later.");
            }
          }
        );
      }),
      {
        loading: "Updating...",
        success:"Updated",
        error: (errMsg) => {
          toast.error(errMsg);
        },
      }  
    );
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
              <img
                className={styles1.userphoto}
                src={myuser.photoURL}
                alt=""
              ></img>

              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log("Selected file:", e.target.files[0]);
                  setImg(e.target.files[0]);
                }}
              />
              <label htmlFor="file">
                <img
                  src={pencil}
                  height="30"
                  width="30"
                  alt="external-circle-gradak-writing-gradak-royyan-wijaya"
                  className={styles1.pencil}
                  onChange={(e) => {
                    console.log("Selected file:", e.target.files[0]);
                    setImg(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handleusername}>Change Username</span>
              {username && <input type="text" value={username.name} onChange={usernameinput}></input>}
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handleemail}>Change Email</span>
              {email && <input type="text" value={email.myemail} onChange={emailinput}></input>}
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handlepassword}>Change Password</span>
              {Password && <input type="password" value={Password.mypassword} onChange={passwordinput}></input>}
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handleconfirmpasword}>Confirm Password</span>
              {confirmPassword && <input type="password" value={confirmPassword.confirmpassword} onChange={confirmpasswordinput}></input>}
            </div>
            <div className={styles1.generalsettings}>
              <span onClick={handlesendverfi}>Send verification Email</span>
            </div>

            <button onClick={handleEdit}>Save!</button>
          </div>
        )}
      <Toaster/>
      </div>
    </div>
  );
}
