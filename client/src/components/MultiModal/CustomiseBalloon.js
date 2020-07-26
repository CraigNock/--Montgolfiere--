import React, { useState } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

///// USER BALLOON ICON SELECTION /////

import { MEDIA_GATE } from '../../constants';
import { changeBalloon 
} from '../../reducersActions/userActions';

import balloonIconArray from './balloonArray';
import CloseModal from './CloseModal';

const CustomiseBalloon = () => { 
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);
  const [selected, setSelected] = useState(profile.balloonIcon);

  const saveBalloonChoice = async (index) => {
    if (selected === index) return;
    dispatch(changeBalloon(index));
    fetch('/changeBalloon', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: profile.userId,
        newBalloon: index,
      }),
    }).catch(err => {console.log('changeBalloon err', err);})
    setSelected(index);
  };

  return (
    <StyledDiv> 
      <CloseModal/>
      <Title>Customise Balloon</Title>
      <Headings>Select your balloon icon:</Headings>
      <BalloonGallery>
        {balloonIconArray.map((icon, index) => {
          return <BalloonImg 
                    src={icon} 
                    key={index+1}
                    onClick={ ()=> saveBalloonChoice(index) }
                    style={{borderColor: (profile.balloonIcon === index)? 'goldenrod' : 'transparent'}}
                  />
        })}
      </BalloonGallery>
    </StyledDiv> 
  ) 
}; 


export default CustomiseBalloon;


const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 500px;
  height: 80%;
  padding: 1rem;
  color: black;
  background: rgba(0,0,0, .1);
  font-family: 'Fredericka the Great', cursive;
  overflow: hidden;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}){
    width: 100%;
    height: 100%;
    padding: .5rem ;
  }
`;
const Title = styled.p`
  /* width: 100%; */
  font-size: 1.5rem;
  font-family: 'Fredericka the Great', cursive;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 1rem;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}){
    margin-bottom: 0;
  }
`;
const Headings = styled.p`
  font-weight:bold;
  padding-top: .5rem;
  padding-bottom: .25rem;
  font-family: 'Rye', cursive;
  font-size: .85rem;
`;
const BalloonGallery = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow-Y: auto;
  padding: 1rem;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 11px;
  };
  &::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
  };
  &::-webkit-scrollbar-thumb {
  background-color: var(#90A4AE) ;
  border-radius: 6px;
  border: 3px solid var(#CFD8DC);
  };
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}){
    padding: .5rem;
  }
`;
const BalloonImg = styled.img`
  height: 4rem;
  width: 4rem;
  padding: .45rem;
  box-sizing: border-box;
  border-radius: 30%;
  border-width: 3px;
  border-style: dashed;
  border-color: transparent;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 1s ease-in-out;
    border-color: gray;
    
  }
`;