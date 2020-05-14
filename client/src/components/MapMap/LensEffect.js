import React from 'react'; 
import styled from 'styled-components'; 

import { useSelector } from 'react-redux';

import raindrops from '../../assets/raindrops.png';

const LensEffect = () => { 
  const { icon } = useSelector( state => state.conditions.current );
  const { lens } = useSelector( state => state.app );
  return ( lens?
    <GlassDiv>
      <RainDiv style={{ 
        display: (icon === 'rain' || icon === 'sleet')? 'block' : 'none'
        }}>
      </RainDiv>
    </GlassDiv>
    : <></>
  ) 
}; 


export default LensEffect;


const GlassDiv = styled.div`
  position: absolute;
  pointer-events: none; 
  z-index: 30000;
  height: 60vh;
  width: 60vw;
  background-color: rgba(0,0,0,0.1); 
  border-radius: 25%;
  box-shadow: inset 0 50px rgba(255,255,255,0.2), 
              inset 0 -15px 30px rgba(0,0,0,0.4),
                    0 5px 10px rgba(0,0,0,0.5);
  overflow: hidden;
`;
const RainDiv = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  background-image: url(${raindrops});
  background-size: 30%;
  opacity: 0.8;
`;