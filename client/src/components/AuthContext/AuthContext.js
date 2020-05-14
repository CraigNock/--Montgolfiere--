import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateCurrentUser, updateLocation } from '../../reducersActions/userActions';
import { setStatusWaiting, setStatusLoading, setStatusLogged } from '../../reducersActions/appActions';
import findNextLoc from '../MapMap/findNextLoc';

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
  const [currentUser, setCurrentUser] = useState({}); //replace with redux state? No. Keep separate, avoid misfire.
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut();
    setCurrentUser({});
  };

  const handleLastVector = async (lastVector) => {
    let activeDiff = Date.now() - lastVector.lastActive
    // console.log('type', typeof lastVector.lastElevation);
    // console.log('activeDiff', activeDiff, lastVector.lastElevation, lastVector.lastWindSum);
    activeDiff = (activeDiff < 3600000) ? activeDiff/3600000 : 1;
    const adjustedSpeed = 
      (lastVector.lastWindSum * lastVector.lastElevation) * activeDiff;
    // console.log('adjustedSpeed', adjustedSpeed);
    const start = await findNextLoc(
      lastVector.lastLocation[0],
      lastVector.lastLocation[1],
      lastVector.lastBearing,
      adjustedSpeed
    );
    // console.log('start', start);
    return start;
  }

//if someone signs in with google (user changes) then check if user exists on db, if not then add to db and set currentUser to that user data
  useEffect(() => {
    if (user) {
      fetch('/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log('json.data', json.data);
          setCurrentUser(json.data);
          dispatch(updateCurrentUser(json.data));
        //grabs last known vector and updates the starting location
          fetch(`/getLastVector/${json.data.userId}`)
            .then(vector => vector.json())
            .then(last =>{ 
              // console.log('last', last.data);
              return handleLastVector(last.data)
            })
            .then(start => {
              // console.log('start', start);
              if(start[0]) dispatch(updateLocation(start));
            })
            .then(()=>dispatch(setStatusLogged()))
            
        }).catch(err=> console.log('athfet err', err));
    }
// eslint-disable-next-line
  }, [user])

///useeffect current user grab user lastVector data

  return (
    <AuthContext.Provider 
      value={{ currentUser, signInWithGoogle, handleSignOut }}
    > 
      { children }
    </AuthContext.Provider> 
  ) 
}; 




export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AuthProvider);



