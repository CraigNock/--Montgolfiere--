import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

///// SELECTOR TABS FOR PANEL SWITCHING IN MOBILE /////

import { MEDIA_GATE } from '../../constants';
import { setSelectedPanel } from '../../reducersActions/appActions';

import { GiJoystick } from "react-icons/gi";
import { GiSextant } from "react-icons/gi";
import { FaCloud } from "react-icons/fa";

const PanelSelectors = () => { 
  const dispatch = useDispatch();
  const { selectedPanel } = useSelector( state => state.app);
  
  const changePanel = (newPanel) => {
    if(selectedPanel !== newPanel) {
      dispatch(setSelectedPanel(newPanel))
    };
  }

  return (
    <> 
      <SelectorTab1
        style={{background:(selectedPanel === 'controls')? 'darkgoldenrod' : 'tan' }}
        onClick={() => changePanel('controls')}
      >
        <GiJoystick/>
      </SelectorTab1>

      <SelectorTab2
        style={{background:(selectedPanel === 'nearby')? 'darkgoldenrod' : 'tan' }}
        onClick={() => changePanel('nearby')}
      >
        <GiSextant/>
      </SelectorTab2>

      <SelectorTab3
        style={{background:(selectedPanel === 'conditions')? 'darkgoldenrod' : 'tan' }}
        onClick={() => changePanel('conditions')}
      >
        <FaCloud/>
      </SelectorTab3>
    </> 
  ) 
}; 


export default PanelSelectors;


const SelectorTab1 = styled.div`
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  top: -2.5rem;
  left: calc(50% - 10rem);
  width: 6rem;
  height: 2.5rem;
  opacity: .8;
  background: tan;
  box-sizing: border-box;
  border: 3px solid #674c47;
  border-bottom: none;
  border-radius: 50% 50% 0 0;
  text-align: center;
  color: whitesmoke;
  font-size: 2rem;
  font-family: 'Rye', cursive;
  /* font-weight: bold; */
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: flex;
  }
`;
const SelectorTab2 = styled(SelectorTab1)`
  left: calc(50% - 3rem);
`;
const SelectorTab3 = styled(SelectorTab1)`
  left: calc(50% + 4rem);
`;