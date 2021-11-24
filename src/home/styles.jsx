import styled from 'styled-components';
import field from '../resource/img/f6.jpg';

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 5rem);
  color: white;
  .board {
    width: 100%;
    height: 18%;
    padding: 2% 5%;
    display: flex;
    justify-content: space-evenly;
  }
  .npc {
    background-color: red;
  }
  .mid {
    width: 100%;
    height: 64%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${field});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .user {
    align-items: flex-end;
    background-color: blue;
  }
`;

export const Button = styled.button`
  width: 8rem;
  height: 2.2rem;
`;

export const Header = styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Img = styled.img`
  width: ${props => props.width ? props.width : '35rem'};
  height: ${props => props.height ? props.height : '35rem'};
  display: ${props => props.showDisplay ? 'inline' : 'none'};
  cursor: pointer; 
`;

export const H1 = styled.h1`
  min-width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.7rem;
  border-radius: ${props => props.borderRadius ? props.borderRadius : '50%'};
  background-color: black;
  display: ${props => props.showDisplay ? 'inline-flex' : 'none'};
  padding: 0 0.8rem;
`;

export const H2 = styled.h2`
  position: absolute;
  bottom: 11rem;
  width: 85%;
  height: 4rem;
  color: white;
  text-align: center;
  font-size: 2.7rem;
  border-radius: 2rem;
  background-color: black;
  display: ${props => props.showDisplay ? 'inline' : 'none'};
`;

export const H2T = styled(H2)`
  top: 16rem;
`;