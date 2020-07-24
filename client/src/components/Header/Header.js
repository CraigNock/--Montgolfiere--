import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../AuthContext/AuthContext';

import { toggleModal, setModalValue } 
from '../../reducersActions/appActions';

import { GiCaptainHatProfile } from "react-icons/gi"; //profile
import { GiAirBalloon } from "react-icons/gi"; //customize balloon
import { GoQuestion } from "react-icons/go";//instruct
import { FaCogs } from "react-icons/fa"; //settings
import { FaInfoCircle } from "react-icons/fa"; //about
import { GoSignOut } from "react-icons/go";

const iconStyle = {
  color: 'white', 
  fontSize: '2rem',
  padding: '2px',
  border: '2px outset goldenrod',
  borderRadius:'50%',
  background: 'gray',
};

const Header = () => { 
  const dispatch = useDispatch();
  const { handleSignOut } = React.useContext(AuthContext);
  const [showMenu, setShowMenu] = React.useState(false);

  const { modalValue } = useSelector(state => state.app);

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
        <p> Balloon?</p>
      </Title>
      <ModalButtons>
        <IconDiv
          onClick={()=> profileHandle()}
        >
          <GiCaptainHatProfile
            style={iconStyle}
          />
        </IconDiv>
        <IconDiv
          onClick={()=> profileHandle()}
        >
          <GiAirBalloon
            style={iconStyle}
          />
        </IconDiv>
        <IconDiv
          onClick={()=> instructionsHandle()}
        >
          <GoQuestion
            style={iconStyle}
          />
        </IconDiv>
        
      </ModalButtons>
      <SignOut
        onClick={()=>setShowMenu(!showMenu)}
      >
        <IconDiv>
          <FaCogs
            style={{
              color: 'whitesmoke', 
              fontSize: '1.5rem' 
              }}
          />
        </IconDiv>
        <Menu style={{display: showMenu? 'flex' : 'none' }}>
          <StyledButton
            onClick={()=> aboutHandle()}
          >
            <span>About </span>
            <FaInfoCircle
              style={{
                color: 'whitesmoke', 
                fontSize: '1rem' 
                }}
            />
          </StyledButton>
          <StyledButton onClick={handleSignOut}>
            <span> Sign Out </span>
            <GoSignOut
              style={{
                color: 'whitesmoke', 
                fontSize: '1rem' 
                }}
            />
          </StyledButton>
          
        </Menu>
      </SignOut>
    </StyledDiv> 
  ) 
}; 


export default Header;


const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  max-width: 100vw;
  height: 2.5rem;
  color: whitesmoke;
  background: rgba(0,0,0,.6);
`;
const Title = styled.div`
  width: 100%;
  margin: .3rem auto .3rem 1rem;
  font-size: 1.25rem;
  p {
    display: inline-block;
    font-family: 'Fredericka the Great', cursive;
    text-align: left;
    white-space: pre;
  }
  span{
    font-style: italic;
    font-family: 'Fredericka the Great', cursive;
  }
  &:hover{
    cursor: context-menu;
  }
  @media(max-width: 440px){
    width: fit-content;
    margin: .3rem 1rem;
    p {
      display: block;
      text-align: center;
      font-size: 1rem;
    }
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
  span {
    font-family: 'Fredericka the Great', cursive;
    margin-right: .25rem;
  }
  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;
const SignOut = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 8rem;
  min-width: 8rem;
  box-sizing: border-box;
  border-left: 2px solid gray;
  @media(max-width: 440px){
    width: 5rem;
    min-width: 5rem;
  }
`;
const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: -2px;
  width: 8rem;
  max-width: 8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(0,0,0,.8);
  padding-top: .5rem;
  border-radius: 0 0 0 7px;
  border: 2px solid gray;
  border-top: 2px solid gray;
  border-right: none;
  z-index: 10000;
  @media(max-width: 440px){
    width: 5rem;
  }
`;
const StyledButton = styled.button`
  background: transparent;
  box-sizing: border-box;
  width: 100%;
  margin: 1rem 0;
  color: white;
  border: none;
  span{
    /* text-decoration: underline; */
    font-family: 'Fredericka the Great', cursive;
    font-size: 1rem;
  }
  
  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;
