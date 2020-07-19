import React, {useState, useEffect} from 'react'; 
import styled, {keyframes} from 'styled-components'; 

import { useDispatch, useSelector } from 'react-redux';

import { GiAirBalloon } from "react-icons/gi";

import { toggleModal, setModalValue 
} from '../../reducersActions/appActions';
import { distanceTo } from '../../utils';
import NearImage from './NearImage';
// import paper from '../../assets/paper.jpg';
import { IP } from '../../constants';
// import { GiSextant } from "react-icons/gi";
import altitude from '../../assets/placeicons/altitude.svg';
import buildings from '../../assets/placeicons/buildings.svg';
import cities from '../../assets/placeicons/cities.svg';
import constructions from '../../assets/placeicons/constructions.svg';

const NearbyDisplay = ({children}) => { 
  const { nearestCity } = useSelector(state => state.conditions);
  const { location } = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const { modalValue } = useSelector(state => state.app);
  // console.log('nearestCity', nearestCity);
  const [toggle, setToggle] = useState(true);

  const [imageArray, setImageArray ] = useState([]);

  useEffect(() => {
    // console.log('nearestCity', nearestCity);
    if(nearestCity !== 'Atlantis')
    fetch(`${IP}/api/retrieveImages/${nearestCity.tags.name}`)
      .then(data => data.json())
      .then(data => {
        // console.log('data', data.images);
        setImageArray(data.images);
      }).catch(err => console.log('cond err', err))
  }, [nearestCity]);

  const handleProfile = () => {
    if(modalValue !== 'profile') dispatch(setModalValue('profile'));
    // setShowMenu(false);
    dispatch(toggleModal());
  };

  return ( nearestCity.tags?
    <StyledDiv style={{transform: toggle? 'translateY(0)' : 'translateY(calc(100% - 2.5rem))'}}> 
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab>
      <ImageDiv>
        <NearImage image={imageArray[0]} token={buildings} />
        <NearImage image={imageArray[1]} token={altitude} />
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
        <StyledButton onClick={ () => handleProfile() }>
          <GiAirBalloon/>
        </StyledButton>
      </CenterDiv>
      <ImageDiv>
        <NearImage image={imageArray[2]} token={cities} />
        <NearImage image={imageArray[3]} token={constructions} />
      </ImageDiv>

      {children}
    </StyledDiv> 

    : <StyledDiv>
        <Tab onClick={() => setToggle(!toggle)}>*</Tab>
        <CenterDiv>
        <p><span>Nearest City: </span>Atlantis</p>
        <StyledButton onClick={ () => handleProfile() }>
          <GiAirBalloon/>
        </StyledButton>
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
  /* margin: 0 100px; */
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items:center;
  width: 100%;
  min-width: 700px;
  /* max-width: 850px; */
  height: 100%;
  min-height: 150px;
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
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3rem;
  margin: .5rem 0;
  font-size: 2rem;
  border: 3px outset slategray;
  border-radius: 15px;
  color: whitesmoke;
  background: gray;
  font-family: 'Rye', cursive;
  &:hover {
    cursor: pointer;
    color: black;
    background: whitesmoke;
  }
`;
const ImageDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`;
// const StyledImg = styled.img`
//   height: 5rem;
//   width: 5rem;
//   object-fit: cover;
//   border-radius: 50%;
//   border: 3px ridge dimgray;
//   margin: -.5rem 1rem 0 0;
//   transition: all 1500ms ease-in-out;
//   &:hover {
//     transform: scale(2) translateY(-1.2rem);
    
//   }
// `;