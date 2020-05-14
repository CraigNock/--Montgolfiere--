import React, { useRef, useEffect, useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";

// import useInterval from '../../hooks/use-interval-hook';
// import pointInCircle from './pointInCircle';
import markerFilter from './markerfilter';

import { addChat, setStatusAskChat, changeCurrentChat } from '../../reducersActions/chatActions';

import balloon from '../../assets/balloon.svg';
import balloon2 from '../../assets/Balloon Icons/hot-air-balloon (6).svg';
import balloon3 from '../../assets/Balloon Icons/hot-air-balloon (20).svg';

const ballooon = new Icon({
  iconUrl: balloon,
  iconSize: [20, 20]
});
const ballooon22 = new Icon({
  iconUrl: balloon2,
  iconSize: [25, 25]
});
const ballooon33 = new Icon({
  iconUrl: balloon3,
  iconSize: [25, 25]
});

//this component will display markers for balloons at different ranges (togglable) may need to limit at higher user count
const OtherBalloons = ({balloons}) => { 
  const dispatch = useDispatch();
  const { status, currentChat } = useSelector(state => state.chat);
  const { location, userId, displayName } = useSelector((state) => state.user.profile);
  const { viewRange } = useSelector((state) => state.app);

  // if(balloons.length > 0) console.log('balloons', balloons);
  const [disable, setDisable] = useState(false);
//to match popups
  const [activeBalloon, setActiveBalloon] = useState(null);
  const [farBalloons, setFarBalloons] = useState([]); //outside radius
  const [nearOuterBalloons, setNearOuterBalloons] = useState([]); //outer-radius
  const [nearInnerBalloons, setNearInnerBalloons] = useState([]); //inner-radius

  const filterRanges = async (rangeMin, rangeMax, array) => {
    const nearInner = [];
    const nearOuter = [];
    const far = [];
    //the .5 determines the timeCutoff hour 
    const timeCutoff = (Date.now()) - .5 * 60 * 60 * 1000;
    
    await array.forEach(async (item) => {
      // console.log('item.timeStamp , timeCutoff', item.timeStamp , timeCutoff);
      const label = (item.timeStamp > timeCutoff && item.elevation < 3)? 
        await markerFilter(location, rangeMin, rangeMax, item.location) 
        : '';
        // console.log('item, label', item, label);
      switch (label) {
        case 'far':
          far.push(item);
          break;
        case 'outer':
          nearOuter.push(item);
          break;
        case 'inner':
          nearInner.push(item);
          break;
        default:
          break;
      }
    //   console.log('far, nearOuter, nearInner',far,nearOuter,nearInner);
    });
    setNearInnerBalloons(nearInner);
    setNearOuterBalloons(nearOuter);
    setFarBalloons(far);
  }

  useEffect(()=> {
    if(balloons && balloons.length > 0)filterRanges(5000, 100000, balloons);
  }, [location])
  
  useEffect(()=> {
    if(status === 'noChat') setDisable(false);
  }, [status])

  const handleRequestChat = async (e) => {
    e.preventDefault();
    setDisable(true);
    fetch('/startConversation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        // displayName: displayName,
        guestId: activeBalloon.userId,
        // guestName: activeBalloon.displayName,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        dispatch(changeCurrentChat({
          chatId: json.chatId,
          conversation: [
            // {
              // chatId: json.chatId,
              // userId: userId,
              // timeStamp: Date.now(),
              // content: 'Chat?',
            // }
          ],
        }));
        dispatch(addChat(json.chatId)); //status change to ask?
      })
  };
  

  return (
    <>
      {( nearInnerBalloons.map((balloon) => {
          return (
            <Marker
            key={balloon.userId}
            position={balloon.location} 
            icon={ballooon22}
            >
            </Marker>
          )
        }))}
      {( (viewRange > 1)? nearOuterBalloons.map((balloon) => {
        return (
          <Marker
          key={balloon.userId}
          position={balloon.location} 
          icon={ballooon33}
          style={{filter: 'grayscale(100%)'}}
          onClick={()=> {
            setActiveBalloon(balloon)
          }}
          >
          </Marker>
        )
      }) : '' )}
      
      {( (viewRange > 2)? farBalloons.map((balloon) => {
        return (
          <Marker
          key={balloon.userId}
          position={balloon.location} 
          icon={ballooon33}
          onClick={()=> {
            setActiveBalloon(balloon)
          }}
          >
          </Marker>
        )
      }) : '' )}
      {activeBalloon && (
        <Popup
          position={activeBalloon.location}
          onClose={() => setActiveBalloon(null)}
        >
          <PopContent>
            <p>
              <StyledButton
                disabled={disable}
                onClick={(e)=> handleRequestChat(e)}
              >
                Chat
              </StyledButton>
            </p>
            <p>{activeBalloon.displayName}</p>
            <p>Bearing: {activeBalloon.bearing}</p>
          </PopContent>
        </Popup>
      )}
    </>
  ) 
}; 


export default OtherBalloons;


const StyledDiv = styled.div`

`;

const PopContent = styled.div`

  p{
    margin: .25rem 0 0 0;
    font-family: 'Rye', cursive;
  }
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  font-size: .75rem;
  margin: 0 ;
  border: 2px solid goldenrod;
  border-radius: 8px;
  color: white;
  background: gray;
  &:disabled{
    filter: grayscale(100%);
  };
`;