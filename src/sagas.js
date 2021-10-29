import { put, takeEvery, all, call } from 'redux-saga/effects'

const url = 'https://pokeapi.co/api/v2/pokemon/'

const fetchData = async (num) => {
  const response = await fetch(`${url}${num}`)
  const data = await response.json()
  return data;
}

const API = async () => {
  const pokemon1 = await fetchData(3)
  const pokemon2 = await fetchData(6)
  const pokemon3 = await fetchData(9)
  return {
    pokemon1: { ...pokemon1 },
    pokemon2: { ...pokemon2 },
    pokemon3: { ...pokemon3 },
  }
}

function* helloSaga() {
  const pokemons = yield call(API)
  yield put({ 
    type: 'BLUE',
    payload: {...pokemons} 
  })
  yield put({ 
    type: 'RED',
    payload: {...pokemons} 
  })
}

export function* incrementAsync() {
  // use the call Effect
  yield put({ 
    type: 'BLUE',
    payload: {} 
  })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
