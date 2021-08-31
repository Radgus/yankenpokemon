import React from 'react';
import Styled from 'styled-components';

const Container = Styled.div`
  width: 25%;
  height: 40%;
  border: 2px solid silver;
  cursor: pointer;
`;

const Img = Styled.img`
  width: 100%;
`

const Card = ({id, data, onClick}) => {
  return(
    <Container id={id} onClick={onClick}>
      <Img src={data.url} alt="pokemon" />
    </Container>
  )
}

export default Card;
