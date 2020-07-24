import React, {useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'; 

import * as firebase from 'firebase';

import Header from '../../components/Header';
import MultiModal from '../../components/MultiModal';
import MapMap from '../../components/MapMap';
import ControlPanel from '../../components/ControlPanel';
import NearbyDisplay from '../../components/NearbyDisplay';
import ConditionsDisplay from '../../components/ConditionsDisplay';
import ChatInterface from '../../components/ChatInterface';
import Loader from '../../components/Loader';

import { addChat, setStatusAskChat, setStatusNoChat, changeCurrentChat } from '../../reducersActions/chatActions';

import paper from '../../assets/paper.jpg';
import { IP } from '../../constants';

const Homepage = () => { 
  const dispatch = useDispatch();
  const { appStatus } = useSelector((state) => state.app);
  const { profile } = useSelector(state => state.user);
  const { status, chats } = useSelector(state => state.chat);

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
      <Header />
      <MainContent>
        <LeftPanel>
          <ControlPanel>
            <LeftBackground/>
          </ControlPanel>
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
      : <Loader/>}
      
    </StyledDiv> 
  ) 
}; 


export default Homepage;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 1000px;
  min-height: 700px;
  @media (max-width: 440px) {
    min-width: 100vw;
    min-height: 100%;
  }

`;
const MainContent = styled.div`
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
  
`;
const LeftPanel = styled.div`
  position: relative;
  width: 16vw;
  height: 80vh;
  min-height: 500px;
  background: transparent;
  margin: 1rem 0;
`;
const LeftBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 15vw;
  min-width: 150px;
  max-width: 200px;
  height: 80vh;
  min-height: 500px;
  max-height: 600px;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  border: 3px solid #674c47;
  border-left: none;
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
  min-height: 500px;
  background: transparent;
  margin: 1rem 0;
`;
const RightBackground = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 15vw;
  min-width: 150px;
  max-width: 200px;
  height: 80vh;
  min-height: 500px;
  max-height: 600px;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  border: 3px solid #674c47;
  border-right: none;
  border-radius: 3rem 5px 5px 80%;
  opacity: 0.9;
  padding: 1rem;
  z-index: -1;
`;
const BottomPanel = styled.div`
  position: relative;
  height: 20vh;
  width: 100%;
  background: transparent;
  
`;
const BottomBackground = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  min-width: 700px;
  height: 100%;
  min-height: 150px;
  overflow: hidden;
  background-image: url(${paper});
  background-size: cover;
  border: 3px solid #674c47;
  border-bottom: none;
  border-radius: 80% 80% 5px 5px;
  opacity: 0.9;
  padding: 1rem;
  margin: 0 auto;
  z-index: -1;
`;
const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 600px;

`;
