import React, { useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useSelector } from 'react-redux';

///// PANEL TO DISPLAY CONTROLS /////

import PanelSelectors from '../PanelSelectors';
import SpeedDirDisplay from '../SpeedDirDisplay';
import CtrlElevation from '../CtrlElevation';
import CtrlRange from '../CtrlRange/CtrlRange';
import CtrlLens from '../CtrlLens/CtrlLens';
import CtrlSteer from '../CtrlSteer/CtrlSteer';


const ControlPanel = ({children}) => { 
  const { selectedPanel } = useSelector( state => state.app);
  //toggles panel slide in/out
  const [toggle, setToggle] = useState(true);
  
  return (<>
    <StyledDiv show={toggle && (selectedPanel === 'controls' || selectedPanel === 'all')}> 
      <PanelSelectors/>
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab>
      <TopDiv>
        <SpeedDirDisplay/>
        <CtrlLens/>
      </TopDiv>
      <ControlsDiv>
        <CtrlRange/>
        <CtrlElevation/>
        <CtrlSteer/>
      </ControlsDiv>
      {children}
    </StyledDiv> 
  </>) 
}; 

export default ControlPanel;


const panelSlideLeft = keyframes`
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(0)
  }
`;


const StyledDiv = styled.div`
  ${props => `transform:${props.show? 'translateX(0)' : 'translateX(-100%)'}` };
  ${props => `z-index:${props.show? '2' : '1'}` };
  animation: ${props =>props.show? panelSlideLeft : 'none'} 1.5s ease-in-out;
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
  border-radius: 5px 3rem 80% 5px;
  padding: 1rem .75rem;
  @media(max-width: 440px) {
    ${props => `transform:${props.show? 'translateY(0)' : 'translateY(calc(100% + 3rem))'}` };
    bottom: 0;
    width: 100vw;
    min-width: 100vw;
    height: 100%;
    min-height: fit-content;
    /* justify-content: center; */
    padding: .5rem;
    box-shadow: 0 0 20px 5px rgba(0,0,0,0.33);
    border-radius: 80% 80% 5px 5px;
  };
`;
const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media(max-width: 440px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;
    margin-bottom: .25rem;
  }
`;
const ControlsDiv = styled.div`
  padding: .5rem 0;
  border-top: 2px solid gray;
  @media(max-width: 440px) {
    display: flex;
    justify-content: space-evenly;
    padding: .25rem 0;
  }
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
  /* z-index: -1; */
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
  @media(max-width: 440px) {
    display: none;

    opacity: .8;
    width: 6rem;
    height: 2.5rem;
    left: calc(50% - 10rem);
    top: -2.5rem;
    border-bottom: none;
    border-radius: 50% 50% 0 0;
  }
`;


