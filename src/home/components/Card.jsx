import React from 'react';
import Styled from 'styled-components';
import cardICon from '../../resource/img/card-icon.png';

const Container = Styled.div`
  width: 28%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  transition: top 1s ease-in-out;
`;

const Img = Styled.img`
  width: 100%;
`;

const ImgNPC = Styled.img`
  width: ${props => props.width ? 'inline' : '100%'};
  display: ${props => props.showDisplay ? 'inline' : 'none'};
`;

const Card = ({id, data={}, onClick, player='npc', change=true }) => {
  // console.log('Card Data: ', data)
  return(
    <Container id={id} onClick={onClick} >
      { player === 'npc' 
        ? <>
            <ImgNPC src={data?.sprites?.front_default} alt="pokemon" showDisplay={!change}/>
            <ImgNPC src={cardICon} alt="pokemon card" showDisplay={change} width={'80%'}/>
          </>
        : <Img src={data?.sprites?.front_default} alt="pokemon"/>
      }
    </Container>
  )
}

export default Card;
