import React, { useRef, useEffect, useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { changeElevation, changeDirection 
} from '../../reducersActions/userActions';
import { toggleLens, setViewRange 
} from '../../reducersActions/appActions';

import { GoFlame } from "react-icons/go";
import { GiFlame } from "react-icons/gi";
import { GiFire } from "react-icons/gi";
import { GiGlobe } from "react-icons/gi";
// import { GoTelescope } from "react-icons/go";
// import { GiSextant } from "react-icons/gi";
import { GiShipWheel } from "react-icons/gi";
import { GiSpyglass } from "react-icons/gi";
import { IoIosBasket } from "react-icons/io";
import { FiArrowUpLeft } from "react-icons/fi"
import { FiArrowUpRight } from "react-icons/fi"
import { FiArrowUp } from "react-icons/fi"

// GiHandheldFan GiSail GiSpyglass GiEmptyHourglass IoIosCog
//GiKite  GiBurningEmbers GiFireZone GiPulleyHook GiOldLantern
//GiLibertyWing GiLever GiPadlock AiFillVideoCamera GiMagnifyingGlass
//GiPaperWindmill GiAnchor GiBatWing GiHourglass FaTelegramPlane
//GiSextant  GiSpeedometer GiSteampunkGoggles GiWindsock GiWindTurbine

import paper from '../../assets/paper.jpg';


const HUD = ({children}) => { 
  const dispatch = useDispatch();

  const { lens, viewRange } = useSelector( state => state.app );
  const { elevation, direction } = useSelector( state => state.user.profile);
  const { windSum, windBearing } = useSelector( state => state.conditions.current);
  
  const [toggle, setToggle] = useState(true);
  const [path, setPath] = useState(0);

  const handleElevation = async (e) => {
    const value = Number(e.target.value);
    // console.log('value', value);
    dispatch(changeElevation(value));
  };
  const handleViewRange = async (e) => {
    const value = Number(e.target.value);
    // console.log('value', value);
    dispatch(setViewRange(value));
  };
  const handleDirection = async (val) => {
    setPath(val);
    dispatch(changeDirection(val));
  };

  return (
    <StyledDiv style={{transform: toggle? 'translateX(0)' : 'translateX(-100%)'}}> 
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab>
      <InfoDiv>
        <p>
          <span>Bearing: </span>
          {(windBearing + direction)>360? 
          (windBearing + direction -360) 
          : (windBearing + direction)}°
        </p>
        <p>
          <span>Velocity: </span>
          {parseInt(windSum * elevation)}
        </p>
        
      </InfoDiv>
      <ControlsDiv>
        <span>Elevation</span>
        <FlexDiv>
          <ElevUl>
            <li style={{color: (elevation===3)? '#00563f' : 'slategray'}} >
              <label>
              <InvisRadio type='radio' name={'High'} value={3} 
              onChange={(e) => handleElevation(e)}
              checked={(elevation === 3)} />High
              </label>
            </li>
            <li style={{color: (elevation===2)? '#00563f' : 'slategray'}} >
              <label>
              <InvisRadio type='radio' name={'Med'} value={2} 
              onChange={(e) => handleElevation(e)}
              checked={(elevation === 2)} />Med
              </label>
            </li>
            <li style={{color: (elevation===1)? '#00563f' : 'slategray'}} >
              <label>
              <InvisRadio type='radio' name={'Low'} value={1}
              onChange={(e) => handleElevation(e)} 
              checked={(elevation === 1)} />Low
              </label>
            </li>
            </ElevUl>
            <FlameoHotman>
              <GiFlame 
              style={{
                display: (elevation > 2)? 'block' : 'none',
                position: 'absolute', 
                color: '#ff6700',
                fontSize: '3rem',
                marginTop: '-.25rem'
                }}/>
              <GiFire style={{
                display: (elevation > 1)? 'block' : 'none',
                position: 'absolute', 
                color: '#f4c430', 
                fontSize: '2.25rem',
                marginTop: '.25rem' 
                }}/>
              <GoFlame style={{
                position: 'absolute', 
                color: '#4169e1', 
                fontSize: '1.5rem',
                marginTop: '.6rem' 
                }}  />
            </FlameoHotman>

        </FlexDiv>
        
        <span>View range</span>
        <FlexDiv>
          <ViewRange>
            <li style={{color: (viewRange === 3)? '#00563f' : 'slategray'}}>
              <label>
              <InvisRadio type='radio' name={'global'} value={3} 
              onChange={(e) => handleViewRange(e)}
              checked={(viewRange === 3)} />
              Global
              </label>
            </li>
            <li style={{color: (viewRange === 2)? '#00563f' : 'slategray'}}>
              <label>
              <InvisRadio type='radio' name={'radius'} value={2} 
              onChange={(e) => handleViewRange(e)}
              checked={(viewRange === 2)} />Radius
              </label>
            </li>
            <li style={{color: (viewRange === 1)? '#00563f' : 'slategray'}}>
              <label>
              <InvisRadio type='radio' name={'local'} value={1}
              onChange={(e) => handleViewRange(e)} 
              checked={(viewRange === 1)} />Local
              </label>
            </li>
          </ViewRange>
          <ViewCircle>

            <GiGlobe style={{
                display: (viewRange === 3)? 'block' : 'none',
            }}
            />
            <GiSpyglass style={{
                display: (viewRange === 2)? 'block' : 'none',
            }}
            />
            <IoIosBasket style={{
                display: (viewRange === 1)? 'block' : 'none',
            }}
            />
            
          </ViewCircle>
        </FlexDiv>

        <LensSwitch>
          <span>Lens:</span>
          <StyledButton onClick={ () => dispatch(toggleLens()) }>
            { lens? 'ON' : 'OFF'}
          </StyledButton>
        </LensSwitch>

        <Sail>
          <UnderButton 
            disabled={(path === 0)}
            style={{borderColor: (path === 0)? '#00563f': 'goldenrod'}}
            onClick={()=> handleDirection(0)}
          >
            <FiArrowUp/>
          </UnderButton>
          <SubSail>
            <SailButton 
              disabled={(path === -45)}
              style={{borderColor: (path === -45)? '#00563f': 'goldenrod'}}
              onClick={()=> handleDirection(-45)}
            >
              <FiArrowUpLeft/>
            </SailButton>
            <SailButton
              disabled={(path === 45)}
              style={{borderColor: (path === 45)? '#00563f': 'goldenrod'}}
              onClick={()=> handleDirection(45)}
            >
            <FiArrowUpRight/>
            </SailButton>
          </SubSail>
          
          <WheelDiv><GiShipWheel/></WheelDiv>
        </Sail>

      </ControlsDiv>
      {children}
    </StyledDiv> 
  ) 
}; 

export default HUD;


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
  /* justify-content: center; */
  width: 15vw;
  /* min-width: fit-content; */
  height: 80vh;
  min-height: 60vh;
  /* overflow: hidden; */
  /* background-image: url(${paper}); */
  /* background-size: cover; */
  /* opacity: 0.9; */
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.43);
  border: 3px solid #674c47;
  border-left: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 5px 3rem 80% 5px;
  padding: 1rem;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    /* color: maroon; */
    margin: .25rem 0;
    
  }
  span{
    font-family: 'Rye', cursive;
    /* color: #36454f; */
    color: black;
  }
`;
const InvisRadio = styled.input`
  visibility: hidden;
  margin-left: -1rem;
  
`;
const FlexDiv = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  flex-wrap: none;
  margin-bottom: .5rem;
`;
const InfoDiv = styled.div`
  margin: 0 0 .25rem;
  
`;
const ControlsDiv = styled.div`
  padding: .5rem 0;
  border-top: 2px solid gray;
  label{
    cursor: pointer;
  }
`;
const ElevUl = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: .25rem 0 1rem;
  padding: 0;
  font-family: 'Rye', cursive;
  label {
    font-family: 'Rye', cursive;
  }
  /* color: #36454f; */
  color: black;
  
`;
const FlameoHotman = styled.div`
  position: relative;
  margin: 0 0 0 1.5rem ;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  height: 4rem;
  width: 3.5rem;
  background: rgba(0,0,0,0.13);
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.53), 
  0 0 10px 2px rgba(0,0,0,0.33)inset;
  border-radius: 50% 50%;
  filter: grayscale(40%);
`;
const ViewRange = styled(ElevUl)`
`;
const ViewCircle = styled.div`
  position: relative;
  margin: 0 0 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: fit-content;
  padding: .35rem;
  border-radius: 50%;
  color: #36454f;
  /* color: #dbd7d2; */
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.53), 
  0 0 10px 2px rgba(0,0,0,0.33) inset;
  
`;
const LensSwitch = styled.div`
  margin: .5rem 0 .75rem;
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  margin: 0 .5rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
`;
const Sail = styled.div`
  /* filter: grayscale(100%); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* margin-left: -2.5rem; */
  width: 70%;
  border-top: 2px solid gray;
  padding-top: .75rem;
`;
const SubSail = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  margin-bottom: .25rem;
  
`;
const WheelDiv = styled.div`
  width: 100%;
  margin-left: .4rem;
  font-size: 3.5rem;
  color: #2b0b13;
  
`;
const SailButton = styled(StyledButton)`
  width: 2rem;
  margin: 0 .25rem 0 0;
  /* border: 2px solid silver; */
`;
const UnderButton = styled(SailButton)`
  margin: 0 0 0 1.1rem;
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


