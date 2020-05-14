// APP ACTIONS

export const setStatusWaiting = () => (
  {
    type: 'SET_STATUS_WAITING',
  }
);
export const setStatusLoading = () => (
  {
    type: 'SET_STATUS_LOADING',
  }
);
export const setStatusLogged = () => (
  {
    type: 'SET_STATUS_LOGGED',
  }
);

//lens effect toggle
export const toggleLens = () => (
  {
    type: 'TOGGLE_LENS',
  }
);
//set marker rendering range (default inner+outer radius 'radius')
export const setViewRange = (newView) => (
  {
    type: 'SET_VIEW_RANGE',
    view: newView,
  }
);

//MODAL 
export const toggleModal = () => (
  {
    type: 'TOGGLE_MODAL',
  }
);
export const setModalValue = (newValue) => (
  {
    type: 'SET_MODAL_VALUE',
    modalValue: newValue,
  }
);