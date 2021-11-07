import React from 'react';
import Styled from 'styled-components';

const Container = Styled.div`
  width: 28%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
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
