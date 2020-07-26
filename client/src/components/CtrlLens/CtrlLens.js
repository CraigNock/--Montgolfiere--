import React from 'react'; 
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

///// TOGGLES LENS EFFECT OVER MAP /////

import { MEDIA_GATE } from '../../constants';
import { toggleLens } from '../../reducersActions/appActions';

const CtrlLens = () => { 
  const dispatch = useDispatch();
  const { lens } = useSelector( state => state.app );

  return (
    <StyledDiv> 
      <span>Lens:</span>
      <StyledButton onClick={ () => dispatch(toggleLens()) }>
        { lens? 'ON' : 'OFF'}
      </StyledButton>
    </StyledDiv> 
  ) 
}; 


export default CtrlLens;


const StyledDiv = styled.div`
  margin: .5rem 0 .75rem;
  span{
    font-family: 'Rye', cursive;
    color: black;
  };
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: inline-block;
    margin: 0;
  };
`;
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  margin: 0 .5rem;
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