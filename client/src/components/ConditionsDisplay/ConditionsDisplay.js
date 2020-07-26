import React, {useState} from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useSelector } from 'react-redux';

///// DISPLAYS CONDITIONS AT BALLOON /////

import { MEDIA_GATE } from '../../constants';
import PanelSelectors from '../PanelSelectors';

const ConditionsDisplay = ({children}) => { 
  const { 
    time,
    summary,
    // icon,
    // nearestStormDistance,
    // nearestStormBearing,
    precipIntensity,
    precipProbability,
    temperature,
    apparentTemperature,
    // dewPoint,
    humidity,
    // pressure,
    // windSpeed,
    // windGust,
    // windBearing,
    // cloudCover,
    uvIndex,
    // visibility,
    // ozone,
  } = useSelector( state => state.conditions.current);

  const { selectedPanel } = useSelector( state => state.app);
  const [toggle, setToggle] = useState(true);

  return ( time? 
    <StyledDiv show={toggle && (selectedPanel === 'conditions' || selectedPanel === 'all')}>
      <PanelSelectors/>
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab> 
      <Time>
        <P1>Local Time: <S1>{time}</S1></P1>
      </Time>
      <Weather>
        <StyledSubDiv1>
          <P1>Temperature: <S1>{temperature.toFixed(1)}°C</S1></P1>
          <P1>Feels Like: <S1>{apparentTemperature.toFixed(1)}°C</S1></P1>
          <P1>Conditions:</P1> <S1>{summary}</S1> 
        </StyledSubDiv1>
        <StyledSubDiv2>
          <P1>Rain Chance: <S1>{precipProbability}%</S1></P1>
          <P1>Rainfall: <S1>{precipIntensity.toFixed(1)} mm/hr</S1></P1>
          <P1>Humidity: <S1>{humidity.toFixed(1)}</S1></P1>
          <P1>UV Index: <S1>{uvIndex}</S1></P1>
        </StyledSubDiv2>
      </Weather>
      {children}
    </StyledDiv> 
    : ''
  ) 
}; 


export default ConditionsDisplay;


const panelSlideRight = keyframes`
  from {
    transform: translateX(100%)
  }
  to {
    transform: translateX(0)
  }
`;


const StyledDiv = styled.div`
  ${props => `transform:${props.show? 'translateX(0)' : 'translateX(100%)'}` };
  ${props => `z-index:${props.show? '2' : '1'}` };
  animation: ${props =>props.show? panelSlideRight : 'none'} 1.5s ease-in-out;
  transition: transform 1500ms ease-in-out;
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
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border-right: none;
  border-radius: 3rem 5px 5px 80%;
  padding: 1rem;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    ${props => `transform:${props.show? 'translateY(0)' : 'translateY(calc(100% + 3rem))'}` };
    /* flex-direction: row; */
    align-items: center;
    /* justify-content: space-evenly; */
    bottom: 0;
    width: 100vw;
    min-width: 100vw;
    height: 100%;
    min-height: fit-content;
    padding: 1rem;
    box-shadow: 0 0 20px 5px rgba(0,0,0,0.33);
    border-radius: 80% 80% 5px 5px;
  }
`;
const Time = styled.div`
  text-align: right;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    width: 100%;
    text-align: left;
    margin-bottom: .25rem;
  }
`;
const Weather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
  }
`;
const StyledSubDiv1 = styled.div`
  text-align: right;
  border-top: 2px solid gray;
  overflow: hidden;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    text-align: left;
    padding-top: .5rem;
    width: 100%;
  }
`;
const StyledSubDiv2 = styled(StyledSubDiv1)`
  margin: .5rem 0;
  font-size: .85rem;
  border-bottom: 2px solid gray;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    margin: 0;
    font-size: 1rem;
    border-bottom: none;
  }
`;
const P1 = styled.p`
  color: black;
  font-family: 'Rye', cursive;
  margin: .25rem 0;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    margin: 0;
  }
`;
const S1 = styled.span`
  display: block;
  color: #36454f;
  font-family: 'Rye', cursive;
  margin: .25rem 0;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: inline-block;
    margin: 0;
  }
`;
const Tab = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -1.2rem;
  top: 4rem;
  width: 1.2rem;
  height: 4rem;
  opacity: .3;
  background: tan;
  box-sizing: border-box;
  border: 3px solid #674c47;
  border-radius: 50% 0 0 50%;
  text-align: center;
  color: gray;
  font-family: 'Rye', cursive;
  font-weight: bold;
  z-index: -1;
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: none;
  }
`;