import React, { useState } from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';
import {format} from 'date-fns';

import { changeBalloon 
} from '../../reducersActions/userActions';

import balloonIconArray from './balloonArray';
import gentleman from '../../assets/gentleman.svg';

const ProfileDetails = () => { 
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
    }).catch(err => {console.log('udv err', err);})
    setSelected(index);
  };

  return (
    <StyledDiv> 
      <SubDiv> 
        <UserInfo>
          <StyledImg src={gentleman} />
          <SubUser>
            <InfoHeading>Display Name</InfoHeading>
            <InfoValue>{profile.displayName}</InfoValue>
            <InfoHeading>Email</InfoHeading>
            <InfoValue>{profile.email}</InfoValue>
          </SubUser>
        </UserInfo>
        <Headings>Starting Location</Headings>
        <Values>{profile.startingLocation.city}</Values>
        <Headings>Began Journey</Headings>
        <Values>{format(profile.startDate, 'do MMMM yyyy')}</Values>
        <Headings>Collectables</Headings>
        <Values>0/100</Values>
        <Headings>Friends</Headings>
        <Values>No Friends Yet</Values>

      </SubDiv>
      <SubDiv> 
        <Headings>Customize Balloon</Headings>
        <BalloonGallery>
          {balloonIconArray.map((icon, index) => {
            return <Bicon 
                      src={icon} 
                      key={index+1}
                      onClick={ ()=> saveBalloonChoice(index) }
                      style={{borderColor: (profile.balloonIcon === index)? 'goldenrod' : 'transparent'}}
                    />
          })}
        </BalloonGallery>
      </SubDiv>
    </StyledDiv> 
  ) 
}; 


export default ProfileDetails;


const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 1rem;
  width: 100%;
  height: 100%;
  
`;
const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 50%;
  padding: 1rem;
  color: black;
  background: rgba(0,0,0, .1);
  font-family: 'Fredericka the Great', cursive;
  overflow: hidden;
`;
const UserInfo = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: flex-start;
  width:100%;
  margin-bottom: 1rem;
`;
const SubUser = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-left: 1rem;
`;
const StyledImg = styled.img`
  /* height: 10%; */
  width: 40%;
  max-width: 8rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: contain;
  background: skyblue;
  /* padding:.5rem; */
  border: 5px double darkgoldenrod;
`;
const Headings = styled.p`
  font-weight:bold;
  padding-top: .5rem;
  padding-bottom: .25rem;
  font-family: 'Rye', cursive;
  font-size: .85rem;
`;
const InfoHeading = styled(Headings)`
  
`;
const Values = styled.p`
  width: 70%;
  text-align: center;
  padding-bottom: .5rem;
  border-bottom: 1px solid gray;
  font-family: 'Marck Script';
  font-size: 1.2rem;
`;
const InfoValue = styled(Values)`
  width:90%;
`;
const BalloonGallery = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
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
`;
const Bicon = styled.img`
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