import React from 'react'; 
import styled from 'styled-components'; 

const Loader = () => { 

  return (
    <StyledDiv> 
      Loading...
    </StyledDiv> 
  ) 
}; 


export default Loader;


const StyledDiv = styled.div`
  font-family: 'Fredericka the Great', cursive;
  background: gray;
  padding: 2rem;
  margin: 40% auto;
  border: 3px solid goldenrod;
  border-radius: 20px;
`;