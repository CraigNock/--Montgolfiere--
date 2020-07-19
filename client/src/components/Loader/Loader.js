import React from 'react'; 
import styled from 'styled-components'; 

const Loader = () => { 

  return (
    <StyledDiv> 
      <div> Loading... </div>
    </StyledDiv> 
  ) 
}; 


export default Loader;


const StyledDiv = styled.div`
  background: slateblue;
  margin: 40vh auto;
`;