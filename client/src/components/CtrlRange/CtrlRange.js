import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

///// CONTROLS TO SET VIEW RANGE(affects range other user balloons are visible) /////

import { MEDIA_GATE } from '../../constants';
import { setViewRange } from '../../reducersActions/appActions';

import { GiGlobe } from "react-icons/gi";
import { GiSpyglass } from "react-icons/gi";
import { IoIosBasket } from "react-icons/io";

const CtrlRange = () => { 
  const dispatch = useDispatch();
  const { viewRange } = useSelector( state => state.app );

  const handleViewRange = async (e) => {
    const value = Number(e.target.value);
    dispatch(setViewRange(value));
  };

  return (<div>
    <StyledSpan>View Range</StyledSpan>
    <StyledDiv> 
      <ViewRange>
        <li style={(viewRange === 3)?{color: '#00563f', fontWeight: 'bold'} : {color:'slategray'}}>
          <label>
          <InvisRadio type='radio' name={'global'} value={3} 
          onChange={(e) => handleViewRange(e)}
          checked={(viewRange === 3)} />Global
          </label>
        </li>
        <li style={(viewRange === 2)?{color: '#00563f', fontWeight: 'bold'} : {color:'slategray'}}>
          <label>
          <InvisRadio type='radio' name={'radius'} value={2} 
          onChange={(e) => handleViewRange(e)}
          checked={(viewRange === 2)} />Abroad
          </label>
        </li>
        <li style={(viewRange === 1)?{color: '#00563f', fontWeight: 'bold'} : {color:'slategray'}}>
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
    </StyledDiv> 
  </div>) 
}; 


export default CtrlRange;

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
const InvisRadio = styled.input`
  visibility: hidden;
  margin-left: -1rem;
`;
const ViewRange = styled.ul`
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
      cursor: pointer;
      color: black;
    }
  };
  li {
    /* border-radius: 5px; */
  }
`;
const ViewCircle = styled.div`
  position: relative;
  margin: 0 0 .25rem 1rem ;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: fit-content;
  padding: .35rem;
  border-radius: 50%;
  color: #36454f;
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.53), 
  0 0 10px 2px rgba(0,0,0,0.33) inset;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    font-size: 1.5rem;
  }
`;