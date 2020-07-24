import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch } from 'react-redux';

import { toggleModal } 
from '../../reducersActions/appActions';

///// SIMPLE CLOSE BUTTON FOR MODAL /////

const CloseModal = () => { 
  const dispatch = useDispatch();

  return (
    <StyledDiv
      onClick={()=>{
        dispatch(toggleModal());
      }}
    > 
      <div>X</div>
    </StyledDiv> 
  ) 
}; 


export default CloseModal;


const StyledDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: .5rem;
  right: .5rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: maroon;
  border: 2px solid maroon;
  color: whitesmoke;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  overflow: hidden;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  div {
    font-size: 1.5rem;
  }
`;