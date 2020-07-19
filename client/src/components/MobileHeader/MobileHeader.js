import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../AuthContext/AuthContext';

import { toggleModal, setModalValue } 
from '../../reducersActions/appActions';

import { GiCaptainHatProfile } from "react-icons/gi"; //profile
import { GiAirBalloon } from "react-icons/gi"; 
import { FaQuestionCircle } from "react-icons/fa"; //instruct
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa"; //about
import { GoInfo } from "react-icons/go";
// import { FaSignOutAlt } from "react-icons/fa"; //signout
import { GoSignOut } from "react-icons/go";

//title

//profile button
//instructions button
//about button

//signout button //verifier or submenu?


const MobileHeader = () => { 
  const dispatch = useDispatch();
  const { currentUser, handleSignOut } = React.useContext(AuthContext);
  const [showMenu, setShowMenu] = React.useState(false);

  const { modalToggle, modalValue } = useSelector(state => state.app);

  const profileHandle = () => {
    if(modalValue !== 'profile') dispatch(setModalValue('profile'));
    // setShowMenu(false);
    dispatch(toggleModal());
  };
  const aboutHandle = () => {
    if(modalValue !== 'about') dispatch(setModalValue('about'));
    // setShowMenu(false);
    dispatch(toggleModal());
  };
  const instructionsHandle = () => {
    if(modalValue !== 'instructions') dispatch(setModalValue('instructions'));
    // setShowMenu(false);
    dispatch(toggleModal());
  };

  return (
    <StyledDiv> 
      <Title>
        <p>Where <span>is</span> my</p>
        <p> Balloon? </p>
      </Title>
      <ModalButtons>
        <IconDiv
          onClick={()=> profileHandle()}
        >
          <GiCaptainHatProfile
            style={{
              color: 'whitesmoke', 
              fontSize: '2rem' 
              }}
          />
        </IconDiv>
        <IconDiv
          onClick={()=> instructionsHandle()}
        >
          <FaQuestionCircle
            style={{
              color: 'whitesmoke', 
              fontSize: '2rem' 
              }}
          />
        </IconDiv>
        <IconDiv
          onClick={()=> aboutHandle()}
        >
          <FaInfoCircle
            style={{
              color: 'whitesmoke', 
              fontSize: '2rem' 
              }}
          />
        </IconDiv>
      </ModalButtons>
      <SignOut
        onClick={()=>setShowMenu(!showMenu)}
      >
        <IconDiv>
          <GoSignOut
            style={{
              color: 'whitesmoke', 
              fontSize: '1.5rem' 
              }}
          />
        </IconDiv>
        <Menu style={{display: showMenu? 'flex' : 'none' }}>
          <StyledButton onClick={handleSignOut}>
            Sign Out
          </StyledButton>
        </Menu>
      </SignOut>
    </StyledDiv> 
  ) 
}; 


export default MobileHeader;


const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: whitesmoke;
  background: rgba(0,0,0,.6);
`;
const Title = styled.div`
  margin: .3rem 1rem;
  font-size: 1rem;
  p {
    font-family: 'Fredericka the Great', cursive;
    text-align: center;
  }
  span{
    font-style: italic;
    font-family: 'Fredericka the Great', cursive;
  }
`;
const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 .9rem;
  margin: 0 .2rem;
`;
const SignOut = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 4rem;
  box-sizing: border-box;
  border-left: 2px solid lightgray;
`;
const Menu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: -2px;
  width: 4rem;
  display: flex;
  flex-direction: column;
  /* box-sizing: border-box; */
  background: rgba(0,0,0,.8);
  border-radius: 0 0 0 7px;
  border: 2px solid lightgray;
  border-top: 2px solid gray;
  border-right: none;
  z-index: 10000;
`;
const StyledButton = styled.button`
  background: transparent;
  box-sizing: border-box;
  color: white;
  text-align: center;
  text-decoration: underline;
  font-family: 'Fredericka the Great', cursive;
  font-size: .9rem;
  margin: 1rem 0;
  width: 100%;
  /* height: 3rem; */
  border: none;
  
`;
