import React, {useState, useEffect} from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useSelector } from 'react-redux';

///// DISPLAYS THE NEAREST CITY'S NAME, DISTANCE AND IMAGES ///// 

import PanelSelectors from '../PanelSelectors';
import NearImage from '../NearImage';
import NearCity from '../NearCity';
import { IP, MEDIA_GATE } from '../../constants';

import altitude from '../../assets/placeicons/altitude.svg';
import buildings from '../../assets/placeicons/buildings.svg';
import cities from '../../assets/placeicons/cities.svg';
import constructions from '../../assets/placeicons/constructions.svg';

const NearbyDisplay = ({children}) => { 
  const { selectedPanel } = useSelector( state => state.app);
  const { nearestCity } = useSelector(state => state.conditions);

  const [toggle, setToggle] = useState(true);

  const [imageArray, setImageArray ] = useState([]);

  useEffect(() => {
    if(nearestCity !== 'Atlantis')
    fetch(`${IP}/api/retrieveImages/${nearestCity.tags.name}`)
      .then(data => data.json())
      .then(data => {
        setImageArray(data.images);
      }).catch(err => console.log('cond err', err))
  }, [nearestCity]);

  return ( 
    <StyledDiv 
      show={toggle && (selectedPanel === 'nearby' || selectedPanel === 'all')}
    > 
      <PanelSelectors/>
      <Tab onClick={() => setToggle(!toggle)}>
        *
      </Tab>
      <ImageDiv>
        <NearImage image={imageArray[0]} token={buildings} />
        <NearImage image={imageArray[1]} token={altitude} />
      </ImageDiv>
      <NearCity/>
      <ImageDiv>
        <NearImage image={imageArray[2]} token={cities} />
        <NearImage image={imageArray[3]} token={constructions} />
      </ImageDiv>
      {children}
    </StyledDiv> 
  ) 
}; 

export default NearbyDisplay;


const panelSlideUp = keyframes`
  from {
    transform: translateY(calc(100% + 3rem))
  }
  to {
    transform: translateY(0)
  }
`;

const StyledDiv = styled.div`
  ${props => `transform:${props.show? 'translateY(0)' : 'translateY(100%)'}` };
  ${props => `z-index:${props.show? '2' : '1'}` };
  animation: ${props =>props.show? panelSlideUp : 'none'} 1.5s ease-in-out;
  transition: transform 1500ms ease-in-out;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;
  min-width: 700px;
  height: 100%;
  min-height: 150px;
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.33);
  border-radius: 80% 80% 5px 5px;
  padding: 1rem;
  text-align: center;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    margin: .25rem 0;
  }
  span{
    font-family: 'Rye', cursive;
    color: black;
  }
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    ${props => `transform:${props.show? 'translateY(0)' : 'translateY(calc(100% + 3rem))'}` };
    min-width: 100vw;
    width: 100vw;
    min-height: fit-content;
  }
`;
const Tab = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -1.2rem;
  left: calc(50% - 2rem);
  width: 4rem;
  height: 1.2rem;
  opacity: .3;
  background: tan;
  box-sizing: border-box;
  border: 3px solid #674c47;
  border-bottom: none;
  border-radius: 50% 50% 0 0;
  text-align: center;
  color: gray;
  font-family: 'Rye', cursive;
  font-weight: bold;
  /* z-index: 5; */
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: none;
  }
`;
const ImageDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`;
