import React, {useEffect, useState} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'; 

import * as firebase from 'firebase';

import Header from '../../components/Header';
import MultiModal from '../../components/MultiModal';
// import AlertBar from '../../components/AlertBar';
import HUD from '../../components/HUD';
import MapMap from '../../components/MapMap';
import NearbyDisplay from '../../components/NearbyDisplay';
// import ImageModal from '../../components/ImageModal';
import ConditionsDisplay from '../../components/ConditionsDisplay';
import ChatInterface from '../../components/ChatInterface';

// import TradeInterface from '../../components/TradeInterface';

import { addChat, setStatusAskChat, setStatusNoChat, changeCurrentChat } from '../../reducersActions/chatActions';

import paper from '../../assets/paper.jpg';


const Homepage = () => { 
  const dispatch = useDispatch();
  const { appStatus } = useSelector((state) => state.app);
  const { profile } = useSelector(state => state.user);
  const { status, chats } = useSelector(state => state.chat);
  // console.log('appStatus', appStatus);

  const getConversation = async (snapshot) => {
    //get conversation first and make current or whatever then change status
    fetch(`/getConversation/${snapshot.chatId}`, {
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
      <Header />
      {(appStatus==='logged in')? 
      <>
      <MainContent>
        <LeftPanel>
          
          <HUD><LeftBackground/></HUD>
        </LeftPanel>
        <CenterDiv>
          <MapMap />
          <BottomPanel>
            <NearbyDisplay><BottomBackground/></NearbyDisplay>
          </BottomPanel>
        </CenterDiv>
        <RightPanel>
          {(status !== 'noChat')? <ChatInterface/> 
          : <ConditionsDisplay><RightBackground/></ConditionsDisplay>}
        </RightPanel>
      </MainContent>
      <MultiModal/>
      </>
      : ''}
      
      
    </StyledDiv> 
  ) 
}; 


export default Homepage;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: 100%; */

`;
const MainContent = styled.div`
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
  overflow: hidden;
  height: 100vh;
`;
const LeftPanel = styled.div`
  position: relative;
  width: 16vw;
  min-width: fit-content;
  height: 80vh;
  min-height: 60vh;
  background: transparent;
  margin: 1rem 0;
  /* border: 1px solid goldenrod; */
`;
const LeftBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 80vh;
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  /* box-shadow: 0 0 10px 3px rgba(0,0,0,0.43); */
  /* border: 3px solid #674c47; */
  border-left: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 5px 3rem 80% 5px;
  opacity: 0.9;
  padding: 1rem;
  z-index: -1;
`;
const RightPanel = styled.div`
  position: relative;
  width: 16vw;
  min-width: fit-content;
  height: 80vh;
  min-height: 60vh;
  background: transparent;
  margin: 1rem 0;
  /* border: 1px solid goldenrod; */
`;
const RightBackground = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 15vw;
  height: 80vh;
  min-height: 60vh;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  /* box-shadow: 0 0 10px 3px rgba(0,0,0,0.43); */
  /* border: 3px solid #674c47; */
  border-right: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 3rem 5px 5px 80%;
  opacity: 0.9;
  padding: 1rem;
  z-index: -1;
`;
const BottomPanel = styled.div`
  position: relative;
  /* bottom: 0;
  left: 16vw; */
  height: 25vh;
  width: 80vw;
  /* right: 0%; */
  margin: 0 auto;
  background: transparent;
  /* border: 1px solid goldenrod; */
  /* z-index: 200; */
`;
const BottomBackground = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items:center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  /* box-shadow: 0 0 20px 5px rgba(0,0,0,0.33); */
  /* border: 3px solid #674c47; */
  border-bottom: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 80% 80% 5px 5px;
  opacity: 0.9;
  padding: 1rem;
  z-index: -1;
`;
const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
