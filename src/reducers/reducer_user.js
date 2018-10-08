
export default function(state = { usersLetters: [] }, action) {

  switch(action.type) {
    case 'MOVE_LETTER':
    let newLetter = action.payload
    console.log('move letter', newLetter, 'state', state)
      let letters = [...state.usersLetters]
      const ids = letters.map(letter => letter.id)
      const index = ids.indexOf(newLetter.id)
      letters.splice(index, 1, newLetter)
      console.log('test', letters)
      return Object.assign({}, state, {
        usersLetters: letters
      })

    case 'NEW_LETTERS':
    console.log(action.payload)
      return Object.assign({}, state, {
        usersLetters: action.payload
      })
  }

  return state
}