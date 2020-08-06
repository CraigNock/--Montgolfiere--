import React from 'react'; 
import styled from 'styled-components'; 

const Loader = () => { 

  return (
    <StyledDiv> 
      <p>Loading...</p>
    </StyledDiv> 
  ) 
}; 


export default Loader;


const StyledDiv = styled.div`
  background: gray;
  padding: 2rem;
  margin: 40% auto;
  border: 3px solid goldenrod;
  border-radius: 20px;
  p{
    font-family: 'Fredericka the Great', cursive;
  }
`;