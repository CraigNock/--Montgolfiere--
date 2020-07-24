import React, { useState } from 'react'; 
import styled from 'styled-components'; 
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

///// DISPLAYS USER PROFILE INFORMATION /////

import gentleman from '../../assets/gentleman.svg';
import CloseModal from './CloseModal';

const ProfileDetails = () => { 
  const { profile } = useSelector(state => state.user);
  const [profileImgErr, setProfileImgErr] = useState(false);

  return (
    <StyledDiv> 
      <CloseModal/>
      <Title>
        Aeronaut Licence #{`${profile.displayName.length}${profile.email.length}${profile.startingLocation.city.length}`}
      </Title>
      <UserInfo>
        <StyledImg 
          src={(profileImgErr === true || profile.imageSrc === undefined)? gentleman : profile.imageSrc} 
          onError={()=> setProfileImgErr(true)}
        />
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
    </StyledDiv> 
  ) 
}; 


export default ProfileDetails;



const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 80%;
  padding: 1rem;
  color: black;
  background: rgba(0,0,0, .1);
  font-family: 'Fredericka the Great', cursive;
  overflow: hidden;
  @media(max-width: 440px){
    width: 100%;
    height: 100%;
    padding: .5rem ;
  }
`;
const Title = styled.p`
  width: 100%;
  font-size: 1.5rem;
  font-family: 'Fredericka the Great', cursive;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 2rem;
  @media(max-width: 440px){
    margin-bottom: 1rem;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width:100%;
  margin-bottom: 1rem;
  @media(max-width: 440px){
    align-items: center;
  }
`;
const SubUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;
const StyledImg = styled.img`
  width: 40%;
  max-width: 8rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: contain;
  background: skyblue;
  border: 5px double darkgoldenrod;
  @media(max-width: 440px){
    max-width: 5rem;
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
