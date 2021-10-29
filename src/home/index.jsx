import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import { store } from '..';
import Card from './components/Card';
import field from '../resource/img/f6.jpg';
import './style.css';

const Container = Styled.div`
  width: 100vw;
  height: 100vh;
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

const url = 'https://pokeapi.co/api/v2/pokemon/'

const Home = () => {
  console.log('store: ', store.getState());
  const Store = store.getState()

  // Genstion de la lógica del movimiento de las cartas. INICIO
  const initialState = {
    npc: {cn1: 0, cn2: 0, cn3: 0},
    user: {cu1: 0, cu2: 0, cu3: 0}
  }

  const [npcState, setNpcState] = useState({...initialState.npc});
  const [userState, setUserState] = useState({...initialState.user});

  useEffect(() => {
    moveCard(npcState, 'npc')
  }, [npcState])

  useEffect(() => {
    moveCard(userState, 'user')
  }, [userState])
  
  const cardHandler = (player, cardId) => {
    if(player==='npc') {
      setNpcState({
        ...initialState.npc,
        [cardId]: 1
      })
    } else {
      setUserState({
        ...initialState.user,
        [cardId]: 1
      })
    }
  }
  
  const resetState = () => {
    setNpcState({...initialState.npc})
    setUserState({...initialState.user})
  }
  // Genstion de la lógica del movimiento de las cartas. FIN

  


  const moveCard = (cardsState, player) => {
    const keys = Object.keys(cardsState)
    keys.forEach(key => {
      const cardSelected = document.getElementById(key);
      if(cardsState[key] === 1) {
        cardSelected.style.top = player==='npc' ? '15rem' : '-15rem';
      } else {
        cardSelected.style.top = '0';
      }
    });
  }

  

  return(
    <Container>
      <div className='board npc'>
        <Card id='cn1' data={Store?.redPokemons?.pokemon1} onClick={()=>cardHandler('npc','cn1')} />
        <Card id='cn2' data={Store?.redPokemons?.pokemon2} onClick={()=>cardHandler('npc','cn2')} />
        <Card id='cn3' data={Store?.redPokemons?.pokemon3} onClick={()=>cardHandler('npc','cn3')} />
      </div>
      <div className='mid'>
        <button type='button' onClick={resetState}>Reset state</button>
      </div>
      <div className='board user'>
        <Card id='cu1' data={Store?.bluePokemons?.pokemon1} onClick={()=>cardHandler('user','cu1')} />
        <Card id='cu2' data={Store?.bluePokemons?.pokemon2} onClick={()=>cardHandler('user','cu2')} />
        <Card id='cu3' data={Store?.bluePokemons?.pokemon3} onClick={()=>cardHandler('user','cu3')} />
      </div>
    </Container>
  )
}

export default Home;