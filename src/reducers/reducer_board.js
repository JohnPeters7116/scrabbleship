import LetterBag from "../utils/letters";

export default function(state = {
  playedLetters: [],
  letterBag: new LetterBag()
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

    case 'NEW_LETTERBAG':
     return Object.assign({}, state, {
       letterBag: action.payload
     })

  }

  return state
}