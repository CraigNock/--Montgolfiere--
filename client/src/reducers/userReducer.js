import produce from 'immer';


const initialState = {
  profile: null,
  active: false,
  loggedIn: false,
};

////EXPECTED FORMAT////
// const newUserProfile = {
//   displayName: null,
//   email: null,
//   imageSrc: null,
//   guest: false,
//   id: null,
//   location: [],
//   elevation: 2,
//   direction: 0,    //or -45 or 45
//   balloonIcon: 18,
//   items: [],
//   upgrades: [],
//   treasureMaps: {},

//   startingLocation: {},
//   friends: [],
//   statistics: {},
//   collectables: [],
//   badges: [],
//   achievements: [],
// };


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER': 
      return produce(state, draftState => {
        draftState.profile = action.user;
        draftState.active = true;
        draftState.loggedIn = true;
      });
    case 'UPDATE_LOCATION': 
      return produce(state, draftState => {
        draftState.profile.location = action.newLocation;
      });
    case 'CHANGE_BALLOON': 
      return produce(state, draftState => {
        draftState.profile.balloonIcon = action.newBalloon;
      });
    case 'CHANGE_ELEVATION': 
      return produce(state, draftState => {
        draftState.profile.elevation = action.newElevation;
      });
    case 'CHANGE_DIRECTION': 
      return produce(state, draftState => {
        draftState.profile.direction = action.newDirection;
      });
    default:
      return state ;
  }
};



export default userReducer;