import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Card from './components/Card';
import {choosePokemon} from './utils/services';
import './style.css';

const Container = Styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  .board {
    width: 100%;
    height: 45%;
    border: 2px solid gold;
    padding: 3% 5%;
    display: flex;
    justify-content: space-evenly;
  }
  .npc {

  }
  .mid {
    width: 100%;
    height: 10%;
  }
  .user {
    align-items: flex-end;
  }
`;


const Home = () => {
  const initialState = {
    npc: {cn1: 0, cn2: 0, cn3: 0},
    user: {cu1: 0, cu2: 0, cu3: 0}
  }
  const [state, setState] = useState({
    npc: {
      ci1: {},
      ci2: {},
      ci3: {},
    },
    user: {
      ci1: {},
      ci2: {},
      ci3: {},
    }
  });
  const [npcState, setNpcState] = useState({...initialState.npc});
  const [userState, setUserState] = useState({...initialState.user});
  
  const updateState = (player, pokeData, key) => {
    // const tmp = JSON.parse(JSON.stringify(state))
    console.log('state en UPDATE: ', state)
    setState({
      ...state,
      [player]: {
        ...state[player],
        [key]: pokeData
      },
    });
  }

  useEffect(() => {
    choosePokemon('3')
    .then(data => updateState('npc', data, 'ci1'));

    choosePokemon('6')
    .then(data => updateState('npc', data, 'ci2'));

  }, []);

  useEffect(() => {
    console.log('state: ', state);
  }, [state])

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
        cardSelected.style.top = player==='npc' ? '11rem' : '-11rem';
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
        <Card id='cn1' data={state.npc.ci1} onClick={()=>cardHandler('npc','cn1')} />
        <Card id='cn2' data={state.npc.ci2} onClick={()=>cardHandler('npc','cn2')} />
        <Card id='cn3' data={state.npc.ci3} onClick={()=>cardHandler('npc','cn3')} />
      </div>
      <div className='mid'>
        <button type='button' onClick={resetState}>Reset state</button>
      </div>
      <div className='board user'>
        <Card id='cu1' data={state.user.ci1} onClick={()=>cardHandler('user','cu1')} />
        <Card id='cu2' data={state.user.ci2} onClick={()=>cardHandler('user','cu2')} />
        <Card id='cu3' data={state.user.ci3} onClick={()=>cardHandler('user','cu3')} />
      </div>
    </Container>
  )
}

export default Home;