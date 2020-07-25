import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

///// CONTROLS STEERING (only +- 45 degrees to bearing) /////

import { changeDirection } from '../../reducersActions/userActions';

import { GiShipWheel } from "react-icons/gi";
import { FiArrowUpLeft } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";

const CtrlSteer = () => { 
  const dispatch = useDispatch();
  const { direction } = useSelector( state => state.user.profile);
  const { windBearing } = useSelector( state => state.conditions.current);
  const [activeModifier, setActiveModifier] = useState(0);

// on mount set modified back to zero if previously left otherwise
  useEffect(()=> {
    if (windBearing + activeModifier !== direction) {
      handleDirection(0);
    }
  }, []);

  const handleDirection = async (val) => {
    setActiveModifier(val);
    dispatch(changeDirection(val));
  };

  return (<Wrap>
    <span>Direction</span>
    <StyledDiv> 
      <div>
      <UnderButton 
        disabled={(activeModifier === 0)}
        style={{borderColor: (activeModifier === 0)? '#00563f': 'goldenrod'}}
        onClick={()=> handleDirection(0)}
      >
        <FiArrowUp/>
      </UnderButton>
      <SubDiv>
        <StyledButton 
          disabled={(activeModifier === -45)}
          style={{borderColor: (activeModifier === -45)? '#00563f': 'goldenrod'}}
          onClick={()=> handleDirection(-45)}
        >
          <FiArrowUpLeft/>
        </StyledButton>
        <StyledButton
          disabled={(activeModifier === 45)}
          style={{borderColor: (activeModifier === 45)? '#00563f': 'goldenrod'}}
          onClick={()=> handleDirection(45)}
        >
        <FiArrowUpRight/>
        </StyledButton>
      </SubDiv>
      </div>
      <WheelDiv><GiShipWheel/></WheelDiv>
    </StyledDiv> 
  </Wrap>) 
}; 


export default CtrlSteer;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  span{
    font-family: 'Rye', cursive;
    color: black;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  padding-top: .75rem;
  @media(max-width: 440px) {
    flex-direction: row;
    width: fit-content;
    max-width: fit-content;
  }
`;
const SubDiv = styled.div`
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
  @media(max-width: 440px) {
    margin: -.5rem 0 0 0;
    width: fit-content;
  }
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  margin: 0 .25rem 0 0;
  border: 2px outset goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
  &:hover {
    cursor: pointer;
    color: black;
    background: whitesmoke;
  }
`;
const UnderButton = styled(StyledButton)`
  margin: 0 0 0 1.1rem;
  
`;