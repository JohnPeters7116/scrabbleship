export default function(state = {
  playedLetters: {},
 }, action) {

  switch(action.type) {
    case 'ADD_PLAYED_LETTERS':
    let newWord = action.payload
    let coordinateHash = {}
    newWord.forEach(letter =>
      coordinateHash[`${letter.position[0]}${letter.position[1]}`] = letter
    )
    console.log('coordinateHash', coordinateHash, 'state', state)
      let playedLetters = {
        ...state.playedLetters,
        ...coordinateHash
      }
      return Object.assign({}, state, {
        playedLetters
      })
  }

  return state
}