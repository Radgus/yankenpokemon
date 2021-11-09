import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import { store } from '..';
import Card from './components/Card';
import field from '../resource/img/f6.jpg';
import pokeIcon from '../resource/img/poke-icon.jpg';
import './style.css';

const Container = Styled.div`
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

const Button = Styled.button`
  width: 8rem;
  height: 2.2rem;
`;

const Header = Styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Img = Styled.img`
  width: ${props => props.width ? props.width : '35rem'};
  height: ${props => props.height ? props.height : '35rem'};
  display: ${props => props.showDisplay ? 'inline' : 'none'};
  cursor: pointer; 
`;

const H1 = Styled.h1`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.7rem;
  border-radius: 50%;
  background-color: black;
  display: ${props => props.showDisplay ? 'inline-flex' : 'none'};
`;

const H2 = Styled.h2`
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


const Home = () => {
  const Store = useSelector(state => state);
  // console.log('store: ', store.getState());
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({blue:0,red:0})
  const [showPlay, setShowPlayButton] = useState(true)
  const [showFigth, setShowFigthButton] = useState(false)
  const [choicePokemonMessage, setShowChoicesPokemonMessage] = useState(false)
  
  /******************************************************************
  *******************************************************************/
  
  // Lógica de la mecánica del juego. INICIO
  const playGame = () => {
    npcChoice()
    setShowChoicesPokemonMessage(true)
    setShowPlayButton(false)
  }

  const figth = () => {
    
    console.log('win: ')
  }
  // Lógica de la mecánica del juego. FIN

  /******************************************************************
  *******************************************************************/

  // Genstion de la lógica del movimiento de las cartas. INICIO
  const cardStartPosition = {
    npc: {cn1: 0, cn2: 0, cn3: 0},
    user: {cu1: 0, cu2: 0, cu3: 0}
  }

  const [npcState, setNpcState] = useState({...cardStartPosition.npc});
  const [userState, setUserState] = useState({...cardStartPosition.user});

  useEffect(() => {
    moveCard(npcState, 'npc')
  }, [npcState])

  useEffect(() => {
    moveCard(userState, 'user')
    
    if(userState.cu1 !== 0 || userState.cu2 !== 0 || userState.cu3 !== 0) {
      setShowFigthButton(true)
      setShowChoicesPokemonMessage(false)
    }
  }, [userState])

  const npcChoice = () => {
    const randomPosition = Math.floor(Math.random()*3)+1
    switch (randomPosition) {
      case 1: cardSelected('npc','cn1')
        break;

      case 2: cardSelected('npc','cn2')
        break;

      default: cardSelected('npc','cn3')
        break;
    }
  }

  const cardSelected = (player, cardId) => {
    if(player==='npc') {
      setNpcState({
        ...cardStartPosition.npc,
        [cardId]: 1
      })
    } else {
      setUserState({
        ...cardStartPosition.user,
        [cardId]: 1
      })
    }
  }

  const moveCard = (cardsState, player) => {
      const keys = Object.keys(cardsState)
      keys.forEach(key => {
        const cardChosen = document.getElementById(key);
        if(cardsState[key] === 1) {
          cardChosen.style.top = player==='npc' ? '15rem' : '-15rem';
        } else {
          cardChosen.style.top = '0';
        }
      });
  }
  // Genstion de la lógica del movimiento de las cartas. FIN

  /******************************************************************
  *******************************************************************/

  // Reset Game
  const resetState = () => {
    setNpcState({...cardStartPosition.npc})
    setUserState({...cardStartPosition.user})
    setShowChoicesPokemonMessage(false)
    setShowPlayButton(true)
    setShowFigthButton(false)
  }

  return(
    <>
    <Header>
      <Button type='button' onClick={resetState}>Reset game</Button>
      <h2>Round {round}</h2>
      <div>
        <h2>Score </h2>
        <h3>blue: {score.blue} red: {score.red}</h3>
      </div>
    </Header>
    <Container>
      <div className='board npc'>
        <Card id='cn1' data={Store?.redPokemons?.pokemon1} />
        <Card id='cn2' data={Store?.redPokemons?.pokemon2} />
        <Card id='cn3' data={Store?.redPokemons?.pokemon3} />
      </div>
      <div className='mid'>
        <H1 showDisplay={showPlay} onClick={() => playGame()}>Play</H1>
        <H1 showDisplay={showFigth} onClick={() => figth()}>Figth</H1>
        <H2 showDisplay={choicePokemonMessage}>Choose a Pokemon</H2>
        
      </div>
      <div className='board user'>
        <Card id='cu1' data={Store?.bluePokemons?.pokemon1} onClick={()=>cardSelected('user','cu1')} />
        <Card id='cu2' data={Store?.bluePokemons?.pokemon2} onClick={()=>cardSelected('user','cu2')} />
        <Card id='cu3' data={Store?.bluePokemons?.pokemon3} onClick={()=>cardSelected('user','cu3')} />
      </div>
    </Container>
    </>
  )
}

export default Home;