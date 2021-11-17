import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styled from 'styled-components';
import Card from './components/Card';
import {Container, Button, Header, H1, H2} from './styles';
import './index.css';

const Home = () => {
  const Store = useSelector(state => state);
  console.log('store: ', Store);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({blue:0,red:0})
  const [showPlay, setShowPlayButton] = useState(true)
  const [showFigth, setShowFigthButton] = useState(false)
  const [choicePokemonMessage, setShowChoicesPokemonMessage] = useState(false)
  const dispatcher = useDispatch();
  /******************************************************************
  *******************************************************************/
  
  // Lógica de la mecánica del juego. INICIO
  const playGame = () => {
    npcChoice()
    setShowChoicesPokemonMessage(true)
    setShowPlayButton(false)
  }

  const figth = () => {

    const bt = pokemonType();  // blueType
    const rt = 'fire';   // redType

    if ( (bt==='grass' && rt==='water') || (bt==='water' && rt==='fire') || 
         (bt==='fire' && rt==='grass') ) {
      dispatcher({ type: 'BLUE_POINT' })
      console.log('blue win!!!')
    }
  
    if ( (rt==='grass' && bt==='water') || (rt ==='water' && bt ==='fire') || 
         (rt==='fire' && bt==='grass') ) {
      dispatcher({ type: 'RED_POINT' })
      console.log('red win!!!')
    }

  }
  
  const pokemonType = () => {
    return 'grass'
  }


  // Lógica de la mecánica del juego. FIN

  /******************************************************************
  *******************************************************************/

  // Genstion de la lógica del movimiento de las cartas. INICIO
  const cardStartPosition = {
    npc: {cn1: 0, cn2: 0, cn3: 0},
    user: {cu1: 0, cu2: 0, cu3: 0}
  }

  useEffect(() => {
    moveCard(Store.redState, 'npc')
  }, [Store.redState])

  useEffect(() => {
    const blueState = Store.blueState
    
    moveCard(blueState, 'user')

    if(blueState.cu1 !== 0 || blueState.cu2 !== 0 || blueState.cu3 !== 0) {
      setShowFigthButton(true)
      setShowChoicesPokemonMessage(false)
    }
  }, [Store.blueState])

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
      const npcPosition = {
        ...cardStartPosition.npc,
        [cardId]: 1
      }
      dispatcher({ type: 'NPC_CARD_POSITION', payload: {...npcPosition} })
    } else {
      const userPosition = {
        ...cardStartPosition.user,
        [cardId]: 1
      }
      dispatcher({ type: 'USER_CARD_POSITION', payload: {...userPosition} })
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
    dispatcher({ type: 'USER_CARD_POSITION', payload: {...cardStartPosition.user} })
    dispatcher({ type: 'NPC_CARD_POSITION', payload: {...cardStartPosition.npc} })
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