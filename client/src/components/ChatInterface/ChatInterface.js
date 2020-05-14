import React, {useState, useEffect, useRef} from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import * as firebase from 'firebase';
// import { auth } from "../../../services/firebase";
// import { db } from "../../../services/firebase";

import paper from '../../assets/paper.jpg';
import ChatMessage from './ChatMessage';

import { 
  addChat, 
  updateCurrentChat,
  changeCurrentChat, 
  setStatusAskChat, 
  setStatusNoChat, 
  setStatusInChat 
} from '../../reducersActions/chatActions';

const ChatInterface = () => { 
  const dispatch = useDispatch();
  const { userId, displayName } = useSelector(state => state.user.profile);
  const { status, currentChat, chats } = useSelector(state => state.chat);

  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false);
  const [jumpToNew, setJumpToNew] = useState(true);
// joins or declines chat invite, on yes: starts up listener for new messages
  const handleStartChat = async (yes) => {
    if (yes) {
      dispatch(setStatusInChat());
      setDisable(false);
      try{ //change content to conversation here and server
        firebase.database().ref('conversations/' + currentChat.chatId + '/conversation').on('child_added', 
        (snapshot, prevChildKey)=>{
          console.log('hsc snapshot', snapshot.val());
          dispatch( updateCurrentChat(snapshot.val()) );
          
        })
      } catch (err) {console.log('err', err)}
    } else {
      console.log('nope');
      dispatch(setStatusNoChat());
      endChat();
      return;
    }
  }
//function to end and remove a conversation/chat
  const endChat = () => {
    console.log('func endchat');
    firebase.database().ref('conversations/' + currentChat.chatId + '/conversation').off('child_added');
    fetch(`/removeConversation/${currentChat.chatId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(()=> {
      setDisable(false); 
      dispatch(setStatusNoChat());
      dispatch( changeCurrentChat(null) ); //
    }).catch(err => console.log('endchat err', err))
  };
// function to send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setDisable(true);
    console.log('send mesg');
    console.log('hsm currentChat', currentChat);
    fetch('/newChatMessage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: currentChat.chatId,
        userId: userId,
        displayName: displayName,
        timeStamp: Date.now(),
        content: content,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('nmsg res status', json.status);
        if(json.status===200) setContent('');
        setDisable(false);
      })
      .catch(err => {console.log('sendmsg err', err);})
  };

// function to prevent jumping to new message if user has scrolled up
  const jumpToggle = (e) => {
    if(e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight){
      console.log('jumptog');
      setJumpToNew(true);
    } else {
      setJumpToNew(false);
    }
  };
  const chatRef = useRef();
//useffect to assist jump to new message toggle
  useEffect(() => {
    if(!currentChat){
    }
    else if(status ==='inChat' && jumpToNew === true) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentChat]);

  return ( (status ==='inChat' && currentChat )?
    <StyledDiv> 
      <EndButton
        disabled={disable}
        onClick={()=>{
          setDisable(true);
          console.log('endchat');
          endChat();
        }}
      >
        Desist Correspondance
      </EndButton>
      <ChatWindow ref={chatRef} onScroll={(e)=> jumpToggle(e)}>
      {(currentChat.conversation)?currentChat.conversation.map(message => {
        return (
          <ChatMessage key={message.timeStamp} message={message} />
        )
      }) : ''}
      </ChatWindow>
      <FormDiv>
        <form onSubmit={(e)=> {
          // setDisable(true);
          handleSendMessage(e)
        }} >
          <StyledInput 
            onChange={(e)=> setContent(e.target.value)} 
            value={content} 
          />
          <StyledButton 
            type='submit'
            disabled={disable}
          >
            Send
          </StyledButton>
        </form>
          
      </FormDiv>
    </StyledDiv>

    : (status === 'askChat' && currentChat)? 
    <StyledDiv>
      <ChatWindow ref={chatRef} >
      {(currentChat.conversation)?currentChat.conversation.map(message => {
        return (
          <ChatMessage key={message.timeStamp +1} message={message} />
        )
      }) : ''} 
      </ChatWindow>
      <div>
        <StyledSpan>Conversation?</StyledSpan>
        <StyledButton
          disabled={disable}
          onClick={()=> {
            setDisable(true);
            handleStartChat(true);
          }}
        >
          Yes
        </StyledButton>
        <StyledButton
          disabled={disable}
          onClick={()=> {
            setDisable(true);
            handleStartChat(false);
          }}
        >
          No
        </StyledButton>
      </div>
    </StyledDiv>

    : <StyledDiv><div>Preparing...</div></StyledDiv>
  ) 
}; 


export default ChatInterface;


//message balloon reflect user balloon color?

const StyledDiv = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* max-width: 18vw; */
  /* min-width: fit-content; */
  width: 19vw;
  height: 75vh;
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border: 3px solid #674c47;
  border-right: none;
  border-radius: 15px 5px 5px 15px;
  opacity: 0.9;
  padding: .5rem .25rem .5rem .25rem;
  font-family: 'Lobster';
`;
const ChatWindow = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: flex-end; */
  
  background: rgba(0,0,0,.3);
  width: 100%;
  height: 100%;
  overflow-Y: scroll;
  overflow-X: hidden;
  border-radius: 5px;
  padding: .5rem 0;
  margin-top: .25rem;
  word-break: break-word;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 11px;
  };
  &::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
  };
  &::-webkit-scrollbar-thumb {
  background-color: var(#90A4AE) ;
  border-radius: 6px;
  border: 3px solid var(#CFD8DC);
  };
  
`;


const FormDiv = styled.div`
  max-width: 100%;
`;
const StyledInput = styled.input`
  max-width: 100%;
  margin: .25rem auto;
  font-family: 'Lobster';
`;
const StyledSpan = styled.p`
  width: 100%;
  text-align: center;
  font-family: 'Rye', cursive;
  font-size: .75rem;
  margin: 0 .5rem 0 0;
  color: black;
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  margin: 0 .1rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
  font-size: .75rem;
  &:disabled{
    filter: grayscale(100%);
  };
`;
const EndButton = styled(StyledButton)`
  width: 100%;
  border: 2px solid maroon;
`;