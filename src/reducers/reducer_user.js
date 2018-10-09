
export default function(state = {
  usersLetters: [],
  userScore: 0
 }, action) {

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

    case 'INCREASE_USER_SCORE':
    console.log('user score', action.payload)
    console.log('state', state)
    const currentScore = state.userScore
      return Object.assign({}, state, {
        userScore: currentScore + action.payload
      })
  }

  return state
}