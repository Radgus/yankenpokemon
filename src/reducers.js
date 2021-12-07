export const initialState = {
  blueScore: 0,
  blueState: {cu1: 0, cu2: 0, cu3: 0},
  redScore: 0,
  redState: {cn1: 0, cn2: 0, cn3: 0},
  round: 1,
  showPlay: true,
  showPlayAgain: false,
  showFigth: false,
  choicePokemonMessage: false,
  teamWinerMessage: false,
  teamWinerPoint: '',
}

export default function counter(state = {...initialState}, action) {
  switch (action.type) {

    case 'BLUE': return { ...state, bluePokemons: {...action.payload} }
    case 'USER_CARD_POSITION': return { ...state, blueState: {...action.payload} }
    case 'BLUE_POINT': return { ...state, blueScore: state.blueScore + 1 }
    case 'RED': return { ...state, redPokemons: {...action.payload} }
    case 'NPC_CARD_POSITION': return { ...state, redState: {...action.payload} }
    case 'RED_POINT': return { ...state, redScore: state.redScore + 1 }
    case 'RESET_SCORE': return { ...state, blueScore: 0, redScore: 0 }
    case 'ROUND': return { ...state, round: action.payload }
    case 'SHOW_PLAY': return { ...state, showPlay: action.payload }
    case 'SHOW_PLAY_AGAIN': return { ...state, showPlayAgain: action.payload }
    case 'SHOW_FIGTH': return { ...state, showFigth: action.payload }
    case 'CHOICE_POKEMON_MESSAGE': return { ...state, choicePokemonMessage: action.payload }
    case 'TEAM_WINER_MESSAGE': return { ...state, teamWinerMessage: action.payload }
    case 'TEAM_WINER_POINT': return { ...state, teamWinerPoint: action.payload }

    default: return state
  }
}
