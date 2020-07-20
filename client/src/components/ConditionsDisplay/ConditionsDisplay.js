import React, {useState} from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { toggleModal, setModalValue 
} from '../../reducersActions/appActions';

import paper from '../../assets/paper.jpg';



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

  const dispatch = useDispatch();
  const { modalValue } = useSelector(state => state.app);

  const [toggle, setToggle] = useState(true);

  const handleHelp = () => {
    if(modalValue !== 'instructions') dispatch(setModalValue('instructions'));
    dispatch(toggleModal());
  };

  return ( time? 
    <StyledDiv style={{transform: toggle? 'translateX(0)' : 'translateX(100%)'}}>
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab> 
        <P1>Local Time:</P1> <P2>{time}</P2>
      <StyledSubDiv1>
        <P1>Temperature:</P1> <P2>{temperature.toFixed(1)}°C</P2>
        <P1>Feels Like:</P1> <P2>{apparentTemperature.toFixed(1)}°C</P2>
        <P1>Conditions:</P1> <P2>{summary}</P2>
      </StyledSubDiv1>
      <StyledSubDiv2>
        <P1>Rain Chance:</P1> <P2>{precipProbability}%</P2>
        <P1>Rainfall:</P1> <P2>{precipIntensity.toFixed(1)} mm/hr</P2>
        <P1>Humidity:</P1> <P2>{humidity.toFixed(1)}</P2>
        <P1>UV Index:</P1> <P2>{uvIndex}</P2>
      </StyledSubDiv2>
      <StyledButton onClick={ () => handleHelp() }>
        ?
      </StyledButton>
      {children}
    </StyledDiv> 
    : ''
  ) 
}; 


export default ConditionsDisplay;


const panelSlide = keyframes`
  from {
    transform: translateX(100%)
  }
  to {
    transform: translateX(0)
  }
`;


const StyledDiv = styled.div`
  animation: ${panelSlide} 1.5s ease-in-out;
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
  border: 3px solid #674c47;
  border-right: none;
  border-radius: 3rem 5px 5px 80%;
  padding: 1rem;
  
`;
const StyledSubDiv1 = styled.div`
  text-align: right;
  border-top: 2px solid gray;
  overflow: hidden;
`;
const StyledSubDiv2 = styled.div`
  text-align: right;
  font-size: .85rem;
  margin: .5rem 0;
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
  overflow: hidden;
`;
const P1 = styled.p`
  font-family: 'Rye', cursive;
  color: black;
  margin: .25rem 0;
`;
const P2 = styled(P1)`
  color: #36454f;
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 2rem;
  font-size: 1.2rem;
  margin: .5rem 0;
  border: 3px outset whitesmoke;
  border-radius: 10px;
  color: whitesmoke;
  background: gray;
  font-family: 'Rye', cursive;
  &:hover {
    cursor: pointer;
    color: black;
    background: whitesmoke;
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
`;