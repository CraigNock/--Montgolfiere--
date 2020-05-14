'use strict';

//RENAME TO DATABASE HANDLERS

const {startingLocations} = require('./data.js');

const randy = (min, max) => { 
    let rand = Math.floor((Math.random()*(max - min)) + min);
    return rand;
  };

const admin = require('firebase-admin');

require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: process.env.FB_DATABASE_URL,
});

const db = admin.database();


//reusable db query function
const queryDatabase = async (key) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    'value',
    (snapshot) => {data = snapshot.val();},
    (err) => { console.log(err);}
  );
  return data;
};

////////////////////////////////////
//// USER/PROFILE ENDPOINTS ////////
////////////////////////////////////

//checks the db for the signed in user profile, returns false if doesn't exist yet. Maps through subdata to find match for email input
//type:GET
const getUserProfile = async (email) => { 
  const data = (await queryDatabase('userProfiles')) || {};
  //note: data includes db generated key for profile
  // console.log('getuserprofile data ', data); 
  const dataValue = Object.keys(data)
    .map((item) => data[item])
    .find((obj) => obj.email === email);
  // console.log('dataValue', dataValue);
  return dataValue || false;
};

//checks if user profile already exists: if yes sends the google user data, if no adds the new user profile data to the db in the 'userProfiles' collection
//type:POST
//receives:google user data
const createUserProfile = async (req, res) => {
  console.log('createUserProfile');
  const returningUser = (await getUserProfile(req.body.email));
  // console.log('returningUser ',returningUser);

  if (returningUser) {
    //dispatch currentuserupdate logged in and active?
    res.status(200).json({ 
        status: 200, 
        data: returningUser, 
        newUser: false,
        message: 'returning user' ,
      });
    return;
  } else {
    const userProfilesRef = db.ref('userProfiles');
    const start = startingLocations[randy(0, 10)];
    // const start = startingLocations[0];
    //pre creates a key in desired node, 
    //can then include this key value in data placed in that location
    const userId = await userProfilesRef.push().key; 

    const newProfile = {
      displayName: req.body.displayName,
      email: req.body.email,
      imageSrc: req.body.photoURL,
      userId: userId,
      location: start.coords,
      elevation: 1,
      direction: 0,
      balloonIcon: 18,
      items: [],
      upgrades: [],
      treasureMaps: {},
    
      startingLocation: start,
      startDate: Date.now(),
      friends: [],
      statistics: {},
      collectables: [],
      badges: [],
      achievements: [],
    };
  //ADDS AN INITIAL lastVector ENTRY
    await db.ref('lastVectors/' + userId).set(
      {
        lastActive: Date.now(),
        lastLocation: start.coords,
        lastBearing: 90,
        lastWindSum: 0,
        lastElevation: 0,
        userId: userId,
      }
    );
  //ADDS AN INITIAL global location ENTRY
    await db.ref('allLocations/' + userId).set(
      {
        location: start.coords,
        bearing: 90,
        displayName: req.body.displayName,
        userId: userId,
        timeStamp: Date.now(),
      }
    );
  
    db.ref('userProfiles/' + userId).set(newProfile)
      .then(() => {
        res.status(200).json({
          status: 200,
          data: newProfile,
          newUser: true,
          message: 'new user',
        });
      });
  }
};

// type: CALLED IN NEWVECTOR
const changeProfileLocation = async (userId, newLocation) => {
  try {
    await db.ref('userProfiles/' + userId + '/location').set(newLocation);
    // res.status(204).json({status:204}); //fixed with json (.status doesnt actually send, needs a .send or .json)
    } catch (err) {console.log('err', err);}
};
const changeProfileDirection = async (userId, newDirection) => {
  try {
    await db.ref('userProfiles/' + userId + '/direction').set(newDirection);
    // res.status(204).json({status:204}); //fixed with json (.status doesnt actually send, needs a .send or .json)
    } catch (err) {console.log('err', err);}
};

// type: PUT
const changeBalloonIcon = async (req, res) => {
  try {
    await db.ref('userProfiles/' + req.body.userId + '/balloonIcon').set(req.body.newBalloon);
    // res.status(204).json({status:204}); //fixed with json (.status doesnt actually send, needs a .send or .json)
    } catch (err) {console.log('err', err);}
};

/////////////////////////////////////////////
//LAST VECTOR 
/////////////////////////////////////////////

// type: GET
const getLastVector = async (req, res) => {
  // console.log('getLastVector');
  const { userId } = req.params
  const data = (await queryDatabase('lastVectors/' + userId)) || {};
  res.status(200).json({
    status: 200,
    data: data || false,
  }) 
};

// type: POST
// example lastVector= {
//   email: blah@blah,
//   lastActive: 43423,
//   lastLocation: [44, 44],
//   lastDirection: 45,
//   lastBearing: 230,
//   lastWindSum: 20,
//   lastElevation: 2,
// }

// type: PUT
const newLastVector = async (req, res) => {
  // console.log('newLastVector', req.body);
  try {
  await db.ref('lastVectors/' + req.body.userId).set(req.body);
  await changeProfileLocation(req.body.userId, req.body.lastLocation);
  await changeProfileDirection(req.body.userId, req.body.lastDirection);
  res.status(204).json({status:204}); //fixed with json (.status doesnt actually send, needs a .send or .json)
  } catch (err) {console.log('err', err);}
};


//////////////////////////////////////
// GET ALL NEARBY BALLOON LOCATIONS // 
//////////////////////////////////////
// eg {
//   location: start.coords,
//   bearing: 90,
//   displayName: req.body.displayName,
//   userId: userId,
//   timeStamp: 2342343
// }
// updates global balloon position (called within sync function) //
const updateGlobalPosition = async (newPossie) => {
  try {
    await db.ref('allLocations/' + newPossie.userId).set(newPossie); 
    } catch (err) {console.log('err', err);}
};

// used to filter for balloons within vision radius of user balloon (.1 radius)//
const pointInCircle = (center, radius, point) => {
  const centerY = center[0];
  const centerX = center[1];
  const y = point[0];
  const x = point[1] ; // long 180 vs lat 90??
  const squareDist = (centerX - x) ** 2 + (centerY - y) ** 2
    return ( squareDist < (radius ** 2) )
};
// type: POST
const syncAllBalloons = async (req, res) => {
  await updateGlobalPosition(req.body);

  const allObj = (await queryDatabase('allLocations')) || {};
  // console.log('allBalloons data ', allObj); 
  const allArray = Object.keys(allObj)
    .map((item) => allObj[item])
    .filter((obj) => ( obj.userId !== req.body.userId ) );
    // .filter((obj) => ( pointInCircle(req.body.location , 1, obj.location) ) );
  // console.log('allArray', allArray);

  res.status(200).json({
    status: 200,
    data: allArray,
  })
};



/////////////////////////
/// CHAT INTERACTIONS ///
/////////////////////////

const startConversation = async (req, res) => {
  console.log('create convo');
  const chatId = await db.ref('/conversations').push().key;
  const newChat = {
    chatId: chatId,
    participants: [req.body.userId, req.body.guestId],
    conversation: [
      // {
      // chatId: chatId,
      // userId: req.body.userId,
      // timeStamp: Date.now(),
      // content: 'Chat?',
    // }
  ],
  };
  db.ref('conversations/' + chatId).set(newChat)
      .then(() => {
        res.status(200).json({
          status: 200,
          chatId: chatId,
        });
      });
};

const getConversation = async (req, res) => {
  console.log('get convo');
  const { chatId } = req.params;
  const data = (await queryDatabase('conversations/' + chatId)) || {};
  console.log('get conv data', data);
  if(data.conversation) data.conversation = Object.values(data.conversation);
  res.status(200).json({
    status:200,
    data,
  })
};

const sendNewMessage = async (req, res) => {
  console.log('sendmsg req.body', req.body);
  try {
    await db.ref('conversations/' + req.body.chatId + '/conversation').push(req.body);
    res.status(200).json({
      status: 200,
    })
  } catch (err) {console.log('smsg err', err);}
};

const removeConversation = async (req, res) => {
  console.log('remove convo');
  const { chatId } = req.params;
  try {
    await db.ref('conversations/' + chatId).set(null);
    res.status(200).json({
      status: 200,
    })
  } catch (err) {console.log('smsg err', err);}

};


//db chat structure
// { chatId : {
//     chatId: chatId,
//     participants: [ 
//       {userId1, displayName1}, 
//       {userId2, displayName2},
//     ],
//     conversation: [
//       {}, 
//       {}, 
//       etc
//     ],
//   },
// }


module.exports = {
  getUserProfile,
  createUserProfile,
  changeProfileLocation,
  changeBalloonIcon,
  getLastVector,
  newLastVector,
  syncAllBalloons,
  startConversation,
  sendNewMessage,
  getConversation,
  removeConversation,
};



