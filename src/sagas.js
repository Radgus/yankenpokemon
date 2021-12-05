import { put, takeEvery, all, call } from 'redux-saga/effects'

const url = 'https://pokeapi.co/api/v2/pokemon/'

const sequenceFunction = () => {
  const sequence = [3,6,9]

  for (let i = 0; i < 20; i++) {
    const i1 =  Math.floor(Math.random()*3)
    const i2 =  Math.floor(Math.random()*3)
    const v1 = sequence[i1]
    const v2 = sequence[i2]
  
    sequence.splice(i1,1,v2)
    sequence.splice(i2,1,v1)
  }
  return sequence
}

const fetchData = async (num) => {
  const response = await fetch(`${url}${num}`)
  const data = await response.json()
  return data;
}

const API = async () => {
  const sequence = sequenceFunction();

  const pokemon1 = await fetchData(sequence[0])
  const pokemon2 = await fetchData(sequence[1])
  const pokemon3 = await fetchData(sequence[2])
  return {
    pokemon1: { ...pokemon1 },
    pokemon2: { ...pokemon2 },
    pokemon3: { ...pokemon3 },
  }
}

function* helloSaga() {
  const pokemonsBlue = yield call(API)
  const pokemonsRed = yield call(API)
  // console.log('pokemons: ', pokemons)
  yield put({ 
    type: 'BLUE',
    payload: {...pokemonsBlue} 
  })
  yield put({ 
    type: 'RED',
    payload: {...pokemonsRed} 
  })
}

// export function* incrementAsync() {
//   // use the call Effect
//   yield put({ 
//     type: 'BLUE',
//     payload: {} 
//   })
// }

// function* watchIncrementAsync() {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    // watchIncrementAsync()
  ])
}
