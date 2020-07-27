import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateCurrentUser, updateLocation } from '../../reducersActions/userActions';
import { setStatusLogged } from '../../reducersActions/appActions';
import findNextLoc from '../MapMap/findNextLoc';

import { IP } from '../../constants';
import gentleman from '../../assets/gentleman.svg';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';


export const AuthContext = createContext(null);
  

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASEURL,
    projectId: process.env.REACT_APP_FB_PROJECTID,
    storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGINSENDERID,
    appId: process.env.REACT_APP_FB_APPID,
  };

//initializes firebase app
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firebaseAppAuth = firebaseApp.auth();

//sign in methods (can add others later)
  const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
  };


// {signInWithGoogle, signOut, user} are provided/imported with firebase
const AuthProvider = ({ children, signInWithGoogle, signOut, user }) => { 
  //Homepage renders on currentUser.email
  const [currentUser, setCurrentUser] = useState({});
  
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut();
    setCurrentUser({});
  };

  const handleLastVector = async (lastVector) => {
    if (!lastVector.lastActive) return false;
    let activeDiff = Date.now() - lastVector.lastActive
    activeDiff = (activeDiff < 3600000) ? activeDiff/3600000 : 1;
    const adjustedSpeed = 
      (lastVector.lastWindSum * lastVector.lastElevation) * activeDiff;
    const start = await findNextLoc(
      lastVector.lastLocation[0],
      lastVector.lastLocation[1],
      lastVector.lastBearing,
      adjustedSpeed
    );
    return start;
  }

//HANDLING FOR GUEST SIGNIN (one time use, currently cleared manually)
  const randy = (min, max) => { 
    let rand = Math.floor((Math.random()*(max - min)) + min);
    return rand;
  };
  const guestHandle = () => {
    let guestName = `Honoured Guest ${randy(1, 1001)}`;
    let guestEmail = `${guestName}@montgolfiere.com`;
    let guestphotoURL = `${gentleman}`;
    fetch(`${IP}/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: guestName,
        email: guestEmail,
        photoURL: guestphotoURL,
        guest: true,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setCurrentUser(json.data);
        dispatch(updateCurrentUser(json.data));
      })
      .then(()=>dispatch(setStatusLogged()))
      .catch(err=> console.log('guestfetch err', err));
  }


//if someone signs in with google (user changes) then check if user exists on db(createUser endpoint checks), if not then add to db and set currentUser to that user data
  useEffect(() => {
    if (user) {
      fetch(`${IP}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          guest: false,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setCurrentUser(json.data);
          dispatch(updateCurrentUser(json.data));
        //grabs last known vector and updates the starting location
          fetch(`${IP}/getLastVector/${json.data.userId}`)
            .then(vector => vector.json())
            .then(last =>{ 
              return handleLastVector(last.data)
            })
            .then(start => {
              if(start[0]) dispatch(updateLocation(start));
            })
            .then(()=>dispatch(setStatusLogged()))
            
        }).catch(err=> console.log('authfetch err', err));
    }
// eslint-disable-next-line
  }, [user])


  return (
    <AuthContext.Provider 
      value={{ currentUser, signInWithGoogle, handleSignOut, guestHandle }}
    > 
      { children }
    </AuthContext.Provider> 
  ) 
}; 


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AuthProvider);



