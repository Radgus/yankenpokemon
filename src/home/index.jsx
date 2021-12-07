import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './components/Card';
import {Container, Button, Header, H1, H2, H2T} from './styles';

const Home = () => {
  const Store = useSelector(state => state);
  console.log('store: ', Store);

  const [showVictoryMessage, setShowVictoryMessage] = useState(false);
  const [winner, setWinner] = useState('');

  const resetChangeArray = {car1: true, card2: true, card3: true}
  const [changeArray, setChangeArray] = useState({...resetChangeArray});

  const dispatcher = useDispatch();

  /******************************************************************
   * 
  *******************************************************************/
  // Lógica de la VICTORIA del juego.
  useEffect(() => {
    if (Store.blueScore === 3 || Store.redScore === 3) {
      Store.blueScore === 3 ? setWinner('blue') : setWinner('red') 
      setTimeout(() => {
        dispatcher({ type: 'TEAM_WINER_MESSAGE', payload: false })
        setShowVictoryMessage(true)
        dispatcher({ type: 'SHOW_PLAY_AGAIN', payload: true })
      }, 2000);
    }
    else {
      setTimeout(() => {
        dispatcher({ type: 'SHOW_PLAY', payload: true })
      }, 4000);
    }
  }, [Store.teamWinerPoint])

  /******************************************************************
   * 
  *******************************************************************/
  // Lógica de la mecánica del juego. INICIO

  const playGame = () => {
    npcChoice()
    dispatcher({ type: 'CHOICE_POKEMON_MESSAGE', payload: true })
    dispatcher({ type: 'SHOW_PLAY', payload: false })
  }

  const figth = () => {

    
    // animación de combate. INICIO

    if(Store.redState.cn1 === 1) {
      const tmp = {...changeArray}
      tmp.card1 = false;
      setChangeArray({...tmp})
    }

    if(Store.redState.cn2 === 1) {
      const tmp = {...changeArray}
      tmp.card2 = false;
      setChangeArray({...tmp})
    }

    if(Store.redState.cn3 === 1) {
      const tmp = {...changeArray}
      tmp.card3 = false;
      setChangeArray({...tmp})
    }

    // animación de combate. FIN 

    dispatcher({ type: 'SHOW_FIGTH', payload: false })

    const bt = bluePokemonType();  // blueType
    const rt = redPokemonType();   // redType

    if ( (bt==='grass' && rt==='water') || (bt==='water' && rt==='fire') || 
         (bt==='fire' && rt==='grass') ) {
      dispatcher({ type: 'BLUE_POINT' })
      dispatcher({ type: 'TEAM_WINER_POINT', payload: 'blue' })
    }

    if ( (rt==='grass' && bt==='water') || (rt ==='water' && bt ==='fire') || 
         (rt==='fire' && bt==='grass') ) {
      dispatcher({ type: 'RED_POINT' })
      dispatcher({ type: 'TEAM_WINER_POINT', payload: 'red' })
    }

    if ( rt===bt ) {
      dispatcher({ type: 'TEAM_WINER_POINT', payload: 'no' })
      setTimeout(() => {
        dispatcher({ type: 'SHOW_PLAY', payload: true })
      }, 4000);
    }

    setTimeout(() => {
      dispatcher({ type: 'TEAM_WINER_MESSAGE', payload: true })
    }, 500);

    setTimeout(() => {
      dispatcher({ type: 'USER_CARD_POSITION', payload: {...cardStartPosition.user} })
      dispatcher({ type: 'NPC_CARD_POSITION', payload: {...cardStartPosition.npc} })
    }, 2000);

    setTimeout(() => {
      nextSet()
    }, 4000);
    
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
    // dispatcher({ type: 'SHOW_PLAY', payload: true })
    dispatcher({ type: 'SHOW_FIGTH', payload: false })
    dispatcher({ type: 'TEAM_WINER_MESSAGE', payload: false })
    // dispatcher({ type: 'TEAM_WINER_POINT', payload: 'no' })
    setChangeArray({...resetChangeArray})
    sequenceFunction()
  }

  const sequenceFunction = () => {
    const p1 = {...Store.redPokemons.pokemon1}
    const p2 = {...Store.redPokemons.pokemon2}
    const p3 = {...Store.redPokemons.pokemon3}
    const sequence = [p1,p2,p3]
  
    for (let i = 0; i < 5; i++) {
      const i1 =  Math.floor(Math.random()*3)
      const i2 =  Math.floor(Math.random()*3)
      const v1 = {...sequence[i1]}
      const v2 = {...sequence[i2]}
    
      sequence.splice(i1,1,v2)
      sequence.splice(i2,1,v1)
    }

    const redPokemons = {
      pokemon1: { ...sequence[0] },
      pokemon2: { ...sequence[1] },
      pokemon3: { ...sequence[2] },
    }

    dispatcher({type: 'RED', payload: {...redPokemons} })
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
      dispatcher({ type: 'CHOICE_POKEMON_MESSAGE', payload: false })
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
    dispatcher({ type: 'CHOICE_POKEMON_MESSAGE', payload: false })
    dispatcher({ type: 'SHOW_FIGTH', payload: false })
    setShowVictoryMessage(false)
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
        <Card id='cn1' data={Store?.redPokemons?.pokemon1} change={false}/>
        <Card id='cn2' data={Store?.redPokemons?.pokemon2} change={false}/>
        <Card id='cn3' data={Store?.redPokemons?.pokemon3} change={false}/>
        {/* <Card id='cn1' data={Store?.redPokemons?.pokemon1} change={changeArray.card1}/>
        <Card id='cn2' data={Store?.redPokemons?.pokemon2} change={changeArray.card2}/>
        <Card id='cn3' data={Store?.redPokemons?.pokemon3} change={changeArray.card3}/> */}
      </div>
      <div className='mid'>
        <H2T showDisplay={showVictoryMessage}>Team {winner} Winer !!!</H2T>
        <H2T showDisplay={Store.teamWinerMessage}>Point for {Store.teamWinerPoint} team</H2T>
        <H1 showDisplay={Store.showPlay} onClick={() => playGame()}>Play</H1>
        <H1 showDisplay={Store.showFigth} onClick={() => figth()}>Figth</H1>
        <H1 
          showDisplay={Store.showPlayAgain} 
          borderRadius={'20%'}
          onClick={resetGame}>
            Play Again
        </H1>
        <H2 showDisplay={Store.choicePokemonMessage}>Choose a Pokemon</H2>
      </div>
      <div className='board user'>
        <Card id='cu1' data={Store?.bluePokemons?.pokemon1} onClick={()=>cardSelected('user','cu1')} player='user'/>
        <Card id='cu2' data={Store?.bluePokemons?.pokemon2} onClick={()=>cardSelected('user','cu2')} player='user'/>
        <Card id='cu3' data={Store?.bluePokemons?.pokemon3} onClick={()=>cardSelected('user','cu3')} player='user'/>
      </div>
    </Container>
    </>
  )
}

export default Home;