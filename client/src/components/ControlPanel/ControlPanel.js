import React, { useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 

///// PANEL TO DISPLAY CONTROLS /////

import SpeedDirDisplay from '../SpeedDirDisplay';
import CtrlElevation from '../CtrlElevation';
import CtrlRange from '../CtrlRange/CtrlRange';
import CtrlLens from '../CtrlLens/CtrlLens';
import CtrlSteer from '../CtrlSteer/CtrlSteer';


const ControlPanel = ({children}) => { 
  //toggles panel slide in/out
  const [toggle, setToggle] = useState(true);
  
  return (
    <StyledDiv style={{transform: toggle? 'translateX(0)' : 'translateX(-100%)'}}> 
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab>
      <SpeedDirDisplay/>
      <ControlsDiv>
        <span>Elevation</span>
        <CtrlElevation/>
        
        <span>View range</span>
        <CtrlRange/>

        <CtrlLens/>

        <CtrlSteer/>
      </ControlsDiv>
      {children}
    </StyledDiv> 
  ) 
}; 

export default ControlPanel;


const panelSlide = keyframes`
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(0)
  }
`;


const StyledDiv = styled.div`
  animation: ${panelSlide} 1.5s ease-in-out;
  transition: transform 1500ms ease-in-out;
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
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border-left: none;
  border-radius: 5px 3rem 80% 5px;
  padding: 1rem;
  span{
    font-family: 'Rye', cursive;
    color: black;
  }
`;
const ControlsDiv = styled.div`
  padding: .5rem 0;
  border-top: 2px solid gray;
`;
const Tab = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -1.2rem;
  top: 4rem;
  width: 1.2rem;
  height: 4rem;
  opacity: .3;
  background: tan;
  box-sizing: border-box;
  border: 3px solid #674c47;
  border-radius: 0 50% 50% 0;
  text-align: center;
  color: gray;
  font-family: 'Rye', cursive;
  font-weight: bold;
  z-index: -1;
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;


