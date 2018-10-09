export default function(state = {
  playedLetters: [],
 }, action) {

  switch(action.type) {
    case 'ADD_PLAYED_LETTERS':
      let playedLetters = [
        ...state.playedLetters,
        ...action.payload
      ]
      return Object.assign({}, state, {
        playedLetters
      })
  }

  return state
}