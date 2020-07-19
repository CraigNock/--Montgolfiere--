import React, {useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'; 

import * as firebase from 'firebase';

import Loader from '../../components/Loader';
import MobileHeader from '../../components/MobileHeader';
import MobileModal from '../../components/MobileModal';
import MapMap from '../../components/MapMap';
import MobileMultiPanel from '../../components/MobileMultiPanel';

import { addChat, setStatusAskChat, setStatusNoChat, changeCurrentChat } from '../../reducersActions/chatActions';

import paper from '../../assets/paper.jpg';
import { IP } from '../../constants';

const MobilePage = () => { 

  const dispatch = useDispatch();
  const { appStatus } = useSelector((state) => state.app);
  const { profile } = useSelector(state => state.user);
  const { status, chats } = useSelector(state => state.chat);
  // console.log('appStatus', appStatus);

  const getConversation = async (snapshot) => {
    //get conversation first and make current or whatever then change status
    console.log('IP', IP);
    fetch(`${IP}/getConversation/${snapshot.chatId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(convo => {
        console.log('convo.data', convo.data);
        dispatch(changeCurrentChat(convo.data))
      })
      .catch(err => {console.log('getconv err', err);})
  };

  useEffect(()=>{
    if(appStatus==='logged in'){
      const listenForChats = async () => {
        try{
          firebase.database().ref('conversations').on('child_added', 
          (snapshot, prevChildKey)=>{
            if (snapshot.val().participants.includes(profile.userId)){
              console.log('snapshot', snapshot.val());
              getConversation(snapshot.val());
              dispatch(addChat(snapshot.val().chatId));
              dispatch(setStatusAskChat());
            }
          })
        } catch (err) {console.log('err', err);}
      };
      listenForChats();
    }
    return ()=>{
      // console.log('conversation added .off');
      // firebase.database().ref('conversations').off('child_added');
    }
// eslint-disable-next-line
  }, [appStatus]);

  useEffect(()=> {
    if(status !== 'noChat'){
      const listenForChatEnd = async () => {
        try{
          firebase.database().ref('conversations').on('child_removed', 
          (snapshot, prevChildKey)=>{
            if (snapshot.val().participants.includes(profile.userId)){
              // console.log('snapshot', snapshot.val());
              dispatch(setStatusNoChat());
              dispatch( changeCurrentChat(null) );
            }
          })
        } catch (err) {console.log('err', err);}
      };
      listenForChatEnd();
    }
    return () => {
      firebase.database().ref('conversations').off('child_removed', (snapshot) => {})
    }
  }, [status]);

  

  return (
    <StyledDiv> 
      {(appStatus==='logged in')?
      <>
        <MobileHeader />
        <MapMap/>
        <MobileMultiPanel/>
        <MobileModal/>
      </>
      : <Loader/>}
    </StyledDiv> 
  ) 
}; 


export default MobilePage;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;