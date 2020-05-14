import React, {useState, useEffect} from 'react'; 
import styled, {keyframes} from 'styled-components'; 

import { useDispatch, useSelector } from 'react-redux';

import paper from '../../assets/paper.jpg';

// import { GiSextant } from "react-icons/gi";

const NearbyDisplay = ({children}) => { 
  const { nearestCity } = useSelector(state => state.conditions);
  const { location } = useSelector((state) => state.user.profile);
  // console.log('nearestCity', nearestCity);
  const [toggle, setToggle] = useState(true);

  const [imageArray, setImageArray ] = useState([]);

  const distanceTo = (pointA, pointB) => {
    const φ1 = pointA[0] * Math.PI/180;
    const φ2 = pointB[0] * Math.PI/180;
    const Δλ = (pointB[1]-pointA[1]) * Math.PI/180;
    const R = 6371e3;
    const distance = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
    return distance;
  };

  useEffect(() => {
    // console.log('nearestCity', nearestCity);
    if(nearestCity !== 'Atlantis')
    fetch(`/api/retrieveImages/${nearestCity.tags.name}`)
      .then(data => data.json())
      .then(data => {
        // console.log('data', data.images);
        setImageArray(data.images);
      }).catch(err => console.log('cond err', err))
  }, [nearestCity]);

  return ( nearestCity.tags?
    <StyledDiv style={{transform: toggle? 'translateY(0)' : 'translateY(calc(100% - 2.5rem))'}}> 
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab>
      <ImageDiv>
        <StyledImg src={imageArray[0] || ''}/>
        <StyledImg src={imageArray[1] || ''}/>
      </ImageDiv>
      <CenterDiv>
        <p> 
          <span>Nearest City: </span>
          {nearestCity.tags.name}
        </p>
        <p> 
          <span>Distance: </span>
          {(distanceTo([nearestCity.lat, nearestCity.lon], location)/1000).toFixed()} km
        </p>
      </CenterDiv>
      <ImageDiv>
        <StyledImg src={imageArray[2] || ''}/>
        <StyledImg src={imageArray[3] || ''}/>
      </ImageDiv>

      {children}
    </StyledDiv> 

    : <StyledDiv>
        <Tab onClick={() => setToggle(!toggle)}>*</Tab>
        <CenterDiv>
        <p><span>Nearest City: </span>Atlantis</p>
        </CenterDiv>
        {children}
      </StyledDiv>
  ) 
}; 


export default NearbyDisplay;


const panelSlide = keyframes`
  from {
    transform: translateY(calc(100% - 2.5rem))
  }
  to {
    transform: translateY(0)
  }
`;


const StyledDiv = styled.div`
  animation: ${panelSlide} 2s ease-in-out;
  transition: transform 2000ms ease-in-out;

  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items:center;
  width: 100%;
  /* min-width: fit-content; */
  height: 100%;
  /* min-height: 60vh; */
  /* overflow: hidden; */
  /* background-image: url(${paper});
  background-size: cover;
  opacity: 0.9; */
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.33);
  border: 3px solid #674c47;
  border-bottom: none;
  /* border-radius: 5px 20% 20% 5px; */
  border-radius: 80% 80% 5px 5px;
  padding: 1rem;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    /* color: maroon; */
    margin: .25rem 0;
  }
  span{
    font-family: 'Rye', cursive;
    /* color: #36454f; */
    color: black;
  }
`;
const Tab = styled.div`
  position: absolute;
  top: -1.2rem;
  left: calc(50% - 2rem);
  width: 4rem;
  height: 1.2rem;
  opacity: .3;
  background: tan;
  box-sizing: border-box;
  border: 3px solid #674c47;
  border-radius: 50% 50% 0 0;
  text-align: center;
  color: gray;
  font-family: 'Rye', cursive;
  font-weight: bold;
  z-index: 5;
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;
const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    /* color: maroon; */
    margin: .25rem 0;
    
  }
  span{
    font-family: 'Rye', cursive;
    /* color: #36454f; */
    color: black;
  }
`;
const ImageDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`;
const StyledImg = styled.img`
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  border-radius: 50%;
  border: 3px ridge dimgray;
  margin: -.5rem 1rem 0 0;
  transition: all 2000ms ease-in-out;
  &:hover {
    transform: scale(2) translateY(-1.2rem);
    
  }
`;