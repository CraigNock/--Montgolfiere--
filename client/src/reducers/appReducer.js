import produce from 'immer';


const initialState = {
  appStatus: 'awaiting signin',
  lens: true,
  viewRange: 1,
  modalToggle: false,
  modalValue: 'profile',
  aboutToggle: false,
};
//status'= 'awaiting signin' , 'loading' , 'logged in'
//viewRange = 'global', 'radius', 'local'

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS_WAITING':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.appStatus = 'awaiting signin';
      });
    case 'SET_STATUS_LOADING':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.appStatus = 'loading';
      });
    case 'SET_STATUS_LOGGED':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.appStatus = 'logged in';
      });
    case 'TOGGLE_LENS':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.lens = !state.lens;
      });
    case 'SET_VIEW_RANGE':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.viewRange = action.view;
      });
    case 'TOGGLE_MODAL':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.modalToggle = !state.modalToggle;
      });
    case 'SET_MODAL_VALUE':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.modalValue = action.modalValue;
      });
    default:
      return state ;
  }
};



export default appReducer;