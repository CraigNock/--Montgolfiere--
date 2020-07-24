import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-icons-kit';
import {cogs} from 'react-icons-kit/icomoon/cogs'

import { AuthContext } from '../AuthContext/AuthContext';

import { toggleModal, setModalValue } 
from '../../reducersActions/appActions';


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

  return (
    <StyledBar >
      <Title> 
        <StyledP>
          Where <span>is</span> my Balloon? 
        </StyledP>
      </Title>
      <Settings 
      onMouseLeave={()=>setShowMenu(!showMenu)}
      onMouseEnter={()=>setShowMenu(!showMenu)}>
        <IconDiv >
          <Icon icon={cogs} size={30} />
        </IconDiv>
        <Menu style={{display: showMenu? 'flex' : 'none' }}>
          <ProButton onClick={()=> profileHandle()}>
            Profile
          </ProButton>
          <ProButton onClick={()=> aboutHandle()}>
            About
          </ProButton>
          <StylishSpace></StylishSpace>
          <StyledButton onClick={handleSignOut}>
            Sign Out
          </StyledButton>
        </Menu>
      </Settings>
    </StyledBar> 
  ) 
}; 


export default Header;

//opacity default 0
const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  color: whitesmoke;
  background: rgba(0,0,0,.5);
  height: 2.5rem;
  /* opacity: 0.1;
  transition: opacity 1.5s;
  &:hover {
    opacity: 1;
    transition: opacity 1.5s;
  } */
  @media(max-width: 440px) {
    opacity: 1;
  }
`;
const Title = styled.div`
  padding: .5rem 1rem;
  font-size: 1.2rem;
  font-family: 'Fredericka the Great', cursive;
  span{
    font-style: italic;
    font-family: 'Fredericka the Great', cursive;
  }
`;
const Settings = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  &:hover{
    background: rgba(0,0,0,.25);
  }
`;
const IconDiv = styled.div`
  width:100%;
  padding: 0 2rem 0 2rem;
  &:hover{
    cursor: pointer;
  }
`;
const Menu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: rgba(0,0,0,.75);
  border-radius: 0 0 0 7px;
  padding: 0 0 .25rem 0;
  z-index: 10000;
  &:hover{
    display: flex;
  }
`;
const StyledP = styled.p`
  color: whitesmoke;
  font-family: 'Fredericka the Great', cursive;
  padding: .25rem .5rem .25rem .75rem;
  
`;
const ProButton = styled.button`
  color: whitesmoke;
  font-family: 'Fredericka the Great', cursive;
  padding: .25rem .5rem .25rem .75rem;
  border: none;
  background: none;
  color: whitesmoke;
  text-align: left;
  font-size: 1rem;
  &:hover{
    background: rgba(0,0,0,.25);
    cursor: pointer;
  }
`;
const StylishSpace = styled.div`
  height: .5rem;
`;
const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: lightgray;
  text-align: left;
  font-size: .75rem;
  padding-left: .75rem;
  font-family: 'Fredericka the Great', cursive;
  &:hover{
    background: rgba(0,0,0,.25);
    cursor: pointer;
  }
`;
