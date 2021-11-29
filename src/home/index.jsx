import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './components/Card';
import {Container, Button, Header, H1, H2, H2T} from './styles';

const Home = () => {
  const Store = useSelector(state => state);
  console.log('store: ', Store);
  const [choicePokemonMessage, setShowChoicesPokemonMessage] = useState(false)
  const [teamWinerMessage, setTeamWinerMessage] = useState(false)
  const [teamWinerPoint, setTeamWinerPoint] = useState('no')
  const dispatcher = useDispatch();

  /******************************************************************
   * 
  *******************************************************************/
  // Lógica de la mecánica del juego. INICIO
  const playGame = () => {
    npcChoice()
    setShowChoicesPokemonMessage(true)
    dispatcher({ type: 'SHOW_PLAY', payload: false })
  }

  const figth = () => {

    dispatcher({ type: 'SHOW_FIGTH', payload: false })

    const bt = bluePokemonType();  // blueType
    const rt = redPokemonType();   // redType

    if ( (bt==='grass' && rt==='water') || (bt==='water' && rt==='fire') || 
         (bt==='fire' && rt==='grass') ) {
      dispatcher({ type: 'BLUE_POINT' })
      setTeamWinerPoint('blue')
    }

    if ( (rt==='grass' && bt==='water') || (rt ==='water' && bt ==='fire') || 
         (rt==='fire' && bt==='grass') ) {
      dispatcher({ type: 'RED_POINT' })
      setTeamWinerPoint('red')
    }

    // animación de combate. INICIO

    // animación de combate. FIN 

    setTimeout(() => {
      setTeamWinerMessage(true)
    }, 500);

    setTimeout(() => {
      dispatcher({ type: 'USER_CARD_POSITION', payload: {...cardStartPosition.user} })
      dispatcher({ type: 'NPC_CARD_POSITION', payload: {...cardStartPosition.npc} })
      nextSet()
    }, 3000);


  }
  
  const bluePokemonType = () => {
    if (Store.blueState.cu1 === 1) return Store.bluePokemons.pokemon1.types[0].type.name;
    if (Store.blueState.cu2 === 1) return Store.bluePokemons.pokemon2.types[0].type.name;
    if (Store.blueState.cu3 === 1) return Store.bluePokemons.pokemon3.types[0].type.name;
  }

  const redPokemonType = () => {
    if (Store.redState.cn1 === 1) return Store.redPokemons.pokemon1.types[0].type.name;
    if (Store.redState.cn2 === 1) return Store.redPokemons.pokemon2.types[0].type.name;
    if (Store.redState.cn3 === 1) return Store.redPokemons.pokemon3.types[0].type.name;
  }

  const nextSet = () => {
    dispatcher({ type: 'ROUND', payload: Store.round + 1 })
    dispatcher({ type: 'SHOW_PLAY', payload: true })
    dispatcher({ type: 'SHOW_FIGTH', payload: false })
    setTeamWinerMessage(false)
    setTeamWinerPoint('no')
  }

  // Lógica de la mecánica del juego. FIN
  /******************************************************************
   * 
  *******************************************************************/
  // Gestion de la lógica del movimiento de las cartas. INICIO
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

    if(blueState.cu1 === 1 || blueState.cu2 === 1 || blueState.cu3 === 1) {
      dispatcher({ type: 'SHOW_FIGTH', payload: true })
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
  // Gestion de la lógica del movimiento de las cartas. FIN

  /******************************************************************
  *******************************************************************/

  // Reset Game
  const resetGame = () => {
    dispatcher({ type: 'USER_CARD_POSITION', payload: {...cardStartPosition.user} })
    dispatcher({ type: 'NPC_CARD_POSITION', payload: {...cardStartPosition.npc} })
    dispatcher({ type: 'RESET_SCORE' })
    dispatcher({ type: 'ROUND', payload: 1 })
    dispatcher({ type: 'SHOW_PLAY', payload: true })
    dispatcher({ type: 'SHOW_PLAY_AGAIN', payload: false })
    setShowChoicesPokemonMessage(false)
    dispatcher({ type: 'SHOW_FIGTH', payload: false })
    
  }

  return(
    <>
    <Header>
      <Button type='button' onClick={resetGame}>Reset game</Button>
      <h2>Round {Store.round}</h2>
      <div>
        <h2>Score </h2>
        <h3>red: {Store.redScore} blue: {Store.blueScore} </h3>
      </div>
    </Header>
    <Container>
      <div className='board npc'>
        <Card id='cn1' data={Store?.redPokemons?.pokemon1} />
        <Card id='cn2' data={Store?.redPokemons?.pokemon2} />
        <Card id='cn3' data={Store?.redPokemons?.pokemon3} />
      </div>
      <div className='mid'>
        <H2T showDisplay={teamWinerMessage}>Point for {teamWinerPoint} team</H2T>
        <H1 showDisplay={Store.showPlay} onClick={() => playGame()}>Play</H1>
        <H1 showDisplay={Store.showFigth} onClick={() => figth()}>Figth</H1>
        <H1 
          showDisplay={Store.showPlayAgain} 
          borderRadius={'20%'} 
          onClick={resetGame}>
            Play Again
        </H1>
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