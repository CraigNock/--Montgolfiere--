
// CHAT ACTIONS

//status
export const setStatusNoChat = () => (
  {
    type: 'SET_STATUS_NOCHAT',
  }
);
export const setStatusAskChat = () => (
  {
    type: 'SET_STATUS_ASKCHAT',
  }
);
export const setStatusLoading = () => (
  {
    type: 'SET_STATUS_LOADING',
  }
);
export const setStatusInChat = () => (
  {
    type: 'SET_STATUS_INCHAT',
  }
);

//chats
export const changeCurrentChat = (chat) => (
  {
    type: 'CHANGE_CURRENT_CHAT',
    chat: chat,
  }
);
export const updateCurrentChat = (newMessage) => (
  {
    type: 'UPDATE_CURRENT_CHAT',
    message: newMessage,
  }
);
export const addChat = (newChatId) => (
  {
    type: 'ADD_CHAT',
    newChatId: newChatId,
  }
);