import produce from 'immer';


const initialState = {
  appStatus: 'awaiting signin',
  lens: true,
  viewRange: 1,
  modalToggle: true,
  modalValue: 'instructions',
  aboutToggle: false,
};
//status'= 'awaiting signin' , 'loading' , 'logged in'
//viewRange = 'global', 'radius', 'local'
//modalValue = 'profile', 'instructions', 'about'

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS_WAITING':
      return produce(state, draftState => {
        draftState.appStatus = 'awaiting signin';
      });
    case 'SET_STATUS_LOADING':
      return produce(state, draftState => {
        draftState.appStatus = 'loading';
      });
    case 'SET_STATUS_LOGGED':
      return produce(state, draftState => {
        draftState.appStatus = 'logged in';
      });
    case 'TOGGLE_LENS':
      return produce(state, draftState => {
        draftState.lens = !state.lens;
      });
    case 'SET_VIEW_RANGE':
      return produce(state, draftState => {
        draftState.viewRange = action.view;
      });
    case 'TOGGLE_MODAL':
      return produce(state, draftState => {
        draftState.modalToggle = !state.modalToggle;
      });
    case 'SET_MODAL_VALUE':
      return produce(state, draftState => {
        draftState.modalValue = action.modalValue;
      });
    default:
      return state ;
  }
};



export default appReducer;