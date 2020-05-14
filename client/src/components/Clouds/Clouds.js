import React from 'react'; 
import styled from 'styled-components'; 
import { useSelector } from 'react-redux';
import Cloud from './Cloud';

// const randy = (min, max) => { 
//   let rand = Math.floor((Math.random()*(max - min)) + min);
//   return rand;
// };


const Clouds = () => { 
  const { current } = useSelector( state => state.conditions);
  const uniqueSpeeds = [];

  const cloudy = (current.icon && 
    (current.icon === 'cloudy' 
    || current.icon === 'partly-cloudy-day'
    || current.icon === 'partly-cloudy-night'
    || current.icon === 'thunderstorm'
    ))? true : false;

  const randSpeeds = (min, max) => { 
    let rand = Math.floor((Math.random()*(max - min)) + min);
    while (uniqueSpeeds.length < 14) {
      if (!uniqueSpeeds.includes(rand*2)) {
        uniqueSpeeds.push(rand*2);
      } else {
        rand = Math.floor((Math.random()*(max - min)) + min);
      }
    }
  };
  randSpeeds(8, 24);



  return (
    <Container>
      <StyledDiv> 
        <CloudTrack><Cloud scale={.75} speed={uniqueSpeeds[0]} /></CloudTrack>
        <CloudTrack><Cloud scale={.6} speed={uniqueSpeeds[1]} /></CloudTrack>
        <CloudTrack><Cloud scale={1} speed={uniqueSpeeds[2]} /></CloudTrack>
        <CloudTrack><Cloud scale={.5} speed={uniqueSpeeds[3]} /></CloudTrack>
        <CloudTrack><Cloud scale={1.5} speed={uniqueSpeeds[4]} /></CloudTrack>
        <CloudTrack><Cloud scale={1} speed={uniqueSpeeds[5]} /></CloudTrack>
        <CloudTrack><Cloud scale={.8} speed={uniqueSpeeds[6]} /></CloudTrack>
      </StyledDiv> 
      {(true)?
      <StyledDiv2> 
        <CloudTrack><Cloud scale={.8} speed={uniqueSpeeds[7]} /></CloudTrack>
        <CloudTrack><Cloud scale={1} speed={uniqueSpeeds[8]} /></CloudTrack>
        <CloudTrack><Cloud scale={1.5} speed={uniqueSpeeds[9]} /></CloudTrack>
        <CloudTrack><Cloud scale={.5} speed={uniqueSpeeds[10]} /></CloudTrack>
        <CloudTrack><Cloud scale={1} speed={uniqueSpeeds[11]} /></CloudTrack>
        <CloudTrack><Cloud scale={.6} speed={uniqueSpeeds[12]} /></CloudTrack>
        <CloudTrack><Cloud scale={.75} speed={uniqueSpeeds[13]} /></CloudTrack>
      </StyledDiv2> 
      : ''}
  </Container> 
  ) 
}; 


export default Clouds;



const Container = styled.div`
  overflow: hidden;
  
`;

const StyledDiv = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: -1;
`;
const CloudTrack = styled.div`
  height: fit-content;
  overflow: hidden;
  /* background: skyblue; */
  width: 100%;
  margin: 0%;
`;
const StyledDiv2 = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: -2;
`;