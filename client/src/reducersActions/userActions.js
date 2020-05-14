// USER ACTIONS


export const updateCurrentUser = (userObj) => (
  {
    type: 'UPDATE_CURRENT_USER',
    user: userObj,
  }
);
export const updateLocation = (newLocation) => (
  {
    type: 'UPDATE_LOCATION',
    newLocation,
  }
);
export const changeBalloon = (newBalloon) => (
  {
    type: 'CHANGE_BALLOON',
    newBalloon,
  }
);
export const changeElevation = (newElevation) => (
  {
    type: 'CHANGE_ELEVATION',
    newElevation,
  }
);
export const changeDirection = (newDirection) => (
  {
    type: 'CHANGE_DIRECTION',
    newDirection,
  }
);

