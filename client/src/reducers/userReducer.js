import produce from 'immer';


const initialState = {
  profile: null,
  active: false,
  loggedIn: false,
};

// const newUserProfile = {
//   displayName: null,
//   email: null,
//   imageSrc: null,
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
      // console.log('actionuser', action);
      // console.log('stateuser', state);
      return produce(state, draftState => {
        draftState.profile = action.user;
        draftState.active = true;
        draftState.loggedIn = true;
      });
    case 'UPDATE_LOCATION': 
      // console.log('state.profile', state.profile);
      // console.log('action.newLocation', action.newLocation);
      return produce(state, draftState => {
        draftState.profile.location = action.newLocation;
      });
    case 'CHANGE_BALLOON': 
      // console.log('state.profile', state.profile);
      // console.log('action.newElevation', action.newElevation);
      return produce(state, draftState => {
        draftState.profile.balloonIcon = action.newBalloon;
      });
    case 'CHANGE_ELEVATION': 
      // console.log('state.profile', state.profile);
      // console.log('action.newElevation', action.newElevation);
      return produce(state, draftState => {
        draftState.profile.elevation = action.newElevation;
      });
    case 'CHANGE_DIRECTION': 
      // console.log('state.profile', state.profile);
      // console.log('action.newElevation', action.newElevation);
      return produce(state, draftState => {
        draftState.profile.direction = action.newDirection;
      });
    default:
      return state ;
  }
};



export default userReducer;