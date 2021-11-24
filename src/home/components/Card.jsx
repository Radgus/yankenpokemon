import React from 'react';
import Styled from 'styled-components';

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
`

const Card = ({id, data={}, onClick}) => {
  // console.log('Card Data: ', data)
  return(
    <Container id={id} onClick={onClick} >
      <Img src={data?.sprites?.front_default} alt="pokemon" />
    </Container>
  )
}

export default Card;
