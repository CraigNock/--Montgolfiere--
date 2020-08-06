import produce from 'immer';

const initialState = {
  status: 'noChat',
  currentChat: null, //the chat array { chatId : mx54htz, conversation: [{}, {}, {}] }
  chats: [],

};

//status toggle chat window 'inChat' 'chatloading' 'noChat' 'askChat'

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS_NOCHAT':
      return produce(state, draftState => {
        draftState.status = 'noChat';
      });
    case 'SET_STATUS_ASKCHAT':
      return produce(state, draftState => {
        draftState.status = 'askChat';
      });
    case 'SET_STATUS_CHATLOADING':
      return produce(state, draftState => {
        draftState.status = 'loading';
      });
    case 'SET_STATUS_INCHAT':
      return produce(state, draftState => {
        draftState.status = 'inChat';
      });
    case 'CHANGE_CURRENT_CHAT':
      console.log('action.chat', action.chat);
      return produce(state, draftState => {
        draftState.currentChat = action.chat;
      });
      case 'UPDATE_CURRENT_CHAT':
      return produce(state, draftState => {
        if(!state.currentChat.conversation) draftState.currentChat.conversation = [];
        draftState.currentChat.conversation.push(action.message);
      });
    case 'ADD_CHAT':
      return produce(state, draftState => {
        draftState.chats.push(action.newChatId);
      });
    default:
      return state ;
  }
};



export default chatReducer;