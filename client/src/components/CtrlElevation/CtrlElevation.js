import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

///// CONTROLS TO CHANGE THE ELEVATION(affects speed) /////

import { MEDIA_GATE } from '../../constants';
import { changeElevation } from '../../reducersActions/userActions';

import { GoFlame } from "react-icons/go";
import { GiFlame } from "react-icons/gi";
import { GiFire } from "react-icons/gi";

const CtrlElevation = () => { 
  const dispatch = useDispatch();
  const { elevation } = useSelector( state => state.user.profile);

  const handleElevation = async (e) => {
    const value = Number(e.target.value);
    dispatch(changeElevation(value));
  };

  return (<div>
    <StyledSpan>Elevation</StyledSpan>
    <StyledDiv> 
      <ElevUl>
        <li style={(elevation===3)?{color: '#00563f', fontWeight: 'bold'} : {color:'slategray'}} >
          <label>
          <InvisRadio type='radio' name={'High'} value={3} 
          onChange={(e) => handleElevation(e)}
          checked={(elevation === 3)} />High
          </label>
        </li>
        <li style={(elevation===2)?{color: '#00563f', fontWeight: 'bold'} : {color:'slategray'}} >
          <label>
          <InvisRadio type='radio' name={'Med'} value={2} 
          onChange={(e) => handleElevation(e)}
          checked={(elevation === 2)} />Med
          </label>
        </li>
        <li style={(elevation===1)?{color: '#00563f', fontWeight: 'bold'} : {color:'slategray'}} >
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
          }}/>
      </FlameoHotman>
    </StyledDiv> 
  </div>) 
}; 


export default CtrlElevation;

const StyledSpan = styled.span`
  font-family: 'Rye', cursive;
  color: black;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: none;
  margin-bottom: .5rem;
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
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    margin: .25rem 0 0;
  }
`;
const InvisRadio = styled.input`
  visibility: hidden;
  margin-left: -1rem;
`;
const FlameoHotman = styled.div`
  position: relative;
  margin: 0 0 0 1.25rem ;
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
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    height: 2rem;
    width: 1.75rem;
    margin: 0 0 .5rem 1.25rem ;
  }
`;