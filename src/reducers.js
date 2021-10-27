export const initialState = {
  red: 0,
  blue: 0
}

export default function counter(state = {...initialState}, action) {
  switch (action.type) {
    case 'BLUE':
      return {
        ...state,
        blue: state.blue + 1,
      }
    case 'RED':
      return {
        ...state,
        blue: state.red + 1,
      }
    default:
      return state
  }
}
