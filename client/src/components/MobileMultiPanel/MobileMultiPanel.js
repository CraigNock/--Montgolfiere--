import React from 'react'; 
import styled from 'styled-components'; 

import FixedInfo from './FixedInfo';

import paper from '../../assets/paper.jpg';

const MobileMultiPanel = () => { 

  return (
    <StyledDiv> 
      <FixedInfo/>
      <div> MobileMultiPanel </div>
    </StyledDiv> 
  ) 
}; 


export default MobileMultiPanel;


const StyledDiv = styled.div`
  width: 100%;
  background-image: url(${paper});
  background-size: cover;
  border-top: 3px solid #674c47;
`;