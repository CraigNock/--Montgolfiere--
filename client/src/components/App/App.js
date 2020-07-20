import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import {format} from 'date-fns';

import GlobalStyles from '../../GlobalStyles';
import WelcomeSignin from '../WelcomeSignin';
import Homepage from '../../pages/Homepage';
import MobilePage from '../../pages/MobilePage';
import Clouds from '../../components/Clouds';


import { AuthContext } from '../AuthContext/AuthContext';


const App = () => {
  const { currentUser } = React.useContext(AuthContext);

  const { sunTimes } = useSelector( state => state.conditions);

  const sunrise = `linear-gradient(180deg, rgba(9,0,85,1) 0%, rgba(0,63,181,1) 50%, rgba(255,252,171,1) 100%)`;
  const day = `linear-gradient(180deg, rgba(0,122,235,1) 0%, rgba(157,207,255,1) 83%)`;
  const sunset = `linear-gradient(180deg, rgba(0,21,87,1) 0%, rgba(255,164,126,1) 100%)`;
  const night = `linear-gradient(180deg, rgba(0,3,34,1) 0%, rgba(0,18,54,1) 83%)`;

  const [timeOfDay, setTimeOfDay] = useState(day);
    
  useEffect(()=>{
    // console.log('sunTimes', sunTimes);
    if(sunTimes){
      if( sunTimes[0] > sunTimes[1]+1 && sunTimes[0] < sunTimes[2]-1 ){
        if(timeOfDay !== day)setTimeOfDay(day);
      } else if ( sunTimes[0] < sunTimes[1]-1 || sunTimes[0] > sunTimes[2]+1 ){
        if(timeOfDay !== night)setTimeOfDay(night);
      } else if ( sunTimes[0] >= sunTimes[1]-1 && sunTimes[0] <= sunTimes[1]+1 ){
        if(timeOfDay !== sunrise)setTimeOfDay(sunrise);
      } else if ( sunTimes[0] >= sunTimes[2]-1 && sunTimes[0] <= sunTimes[2]+1 ){
        if(timeOfDay !== sunset)setTimeOfDay(sunset);
      }
    };
// eslint-disable-next-line
  }, [sunTimes])
  
  //////MOBILE RESPONSIVE////
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  

  // const isPortraitTablet = window.innerWidth < 800;
  // or prevent flipping on mobile, portraitTablet
  // const isLandscapeMobile = window.innerWidth < 900 && window.innerHeight < 500;

  const handleResize = () => {
    if(window.innerWidth < 440 && isMobile !== true) {
      setIsMobile(true);
    } else if(window.innerWidth > 439 && isMobile !== false) {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return window.removeEventListener('resize', handleResize);
  }, [])



//***currently darkness filter causes background rerender clipping, disabled with string condition rather than actual variable 'night'
  return ( 
      <Wrapper style={{filter: (timeOfDay === 'night')? 'brightness(75%)' : 'none'}}>
        <GlobalStyles />
        <CloudBackground style={{background: `${timeOfDay}`}}>
          {isMobile? '' : <Clouds/>}
        </CloudBackground>
        {currentUser && currentUser.email? (
          isMobile? <MobilePage /> : <Homepage /> 
        ) : (
          <WelcomeSignin />
        )}
      </Wrapper>
  );

};


const Wrapper = styled.div`
  overflow: hidden;
  /* filter: brightness(75%); */
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 700px;

  @media(max-width: 800px) {
    min-width: 100vw;
    min-height: 100vh;
  }
`;
const CloudBackground = styled.div`
  position: absolute;
  width:100vw;
  height:100vh;
  min-width: 1000px;
  min-height: 700px;
  z-index: -100;
  overflow: hidden;
  
  @media(max-width: 800px) {
    min-width: 100vw;
    min-height: 100vh;
  }
`;



export default App;
