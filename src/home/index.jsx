import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Card from './components/Card';
import usePokemon from '../hooks/usePokemon';
import field from '../resource/img/f6.jpg';
import './style.css';

const Container = Styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  .board {
    width: 100%;
    height: 18%;
    padding: 2% 5%;
    display: flex;
    justify-content: space-evenly;
  }
  .npc {

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
  }
`;

const url = 'https://pokeapi.co/api/v2/pokemon/'

const Home = () => {
  const initialState = {
    npc: {cn1: 0, cn2: 0, cn3: 0},
    user: {cu1: 0, cu2: 0, cu3: 0}
  }
  const [npcState, setNpcState] = useState({...initialState.npc});
  const [userState, setUserState] = useState({...initialState.user});

  const poke1 = usePokemon(`${url}3`)
  const poke2 = usePokemon(`${url}6`)
  const poke3 = usePokemon(`${url}9`)
  const poke4 = usePokemon(`${url}3`)
  const poke5 = usePokemon(`${url}6`)
  const poke6 = usePokemon(`${url}9`)

  useEffect(() => {
    moveCard(npcState, 'npc')
  }, [npcState])

  useEffect(() => {
    moveCard(userState, 'user')
  }, [userState])

  const resetState = () => {
    setNpcState({...initialState.npc})
    setUserState({...initialState.user})
  }

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

  return(
    <Container>
      <div className='board npc'>
        <Card id='cn1' data={poke1} onClick={()=>cardHandler('npc','cn1')} />
        <Card id='cn2' data={poke2} onClick={()=>cardHandler('npc','cn2')} />
        <Card id='cn3' data={poke3} onClick={()=>cardHandler('npc','cn3')} />
      </div>
      <div className='mid'>
        <button type='button' onClick={resetState}>Reset state</button>
      </div>
      <div className='board user'>
        <Card id='cu1' data={poke4} onClick={()=>cardHandler('user','cu1')} />
        <Card id='cu2' data={poke5} onClick={()=>cardHandler('user','cu2')} />
        <Card id='cu3' data={poke6} onClick={()=>cardHandler('user','cu3')} />
      </div>
    </Container>
  )
}

export default Home;