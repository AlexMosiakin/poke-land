
const defaultState = {
    id: 1,
}

export const PokeReducer = (state = defaultState, action) => {
    switch (action.type){
      case 'GET_ID':
        return {...state, id: action.payload}
      default:
        return state
    }
  }