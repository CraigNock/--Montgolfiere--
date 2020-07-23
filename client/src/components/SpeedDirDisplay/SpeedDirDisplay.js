import React from 'react'; 
import styled from 'styled-components'; 
import { useSelector } from 'react-redux';

///// DISPLAYS THE SPEED("Velocity") & BEARING OF BALLOON /////

const SpeedDirDisplay = () => { 
  const { elevation, direction } = useSelector( state => state.user.profile);
  const { windSum, windBearing } = useSelector( state => state.conditions.current);

  return (
    <StyledDiv> 
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
    </StyledDiv> 
  ) 
}; 


export default SpeedDirDisplay;


const StyledDiv = styled.div`
  margin: 0 0 .25rem;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    margin: .25rem 0;
  }
  span{
    font-family: 'Rye', cursive;
    color: black;
  }
`;