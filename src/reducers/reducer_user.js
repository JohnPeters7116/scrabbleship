
export default function(state = {
  usersLetters: [],
  userScore: 0
 }, action) {

  switch(action.type) {
    case 'MOVE_LETTER':
    let newLetter = action.payload
      let letters = [...state.usersLetters]
      const ids = letters.map(letter => letter.id)
      const index = ids.indexOf(newLetter.id)
      letters.splice(index, 1, newLetter)
      return Object.assign({}, state, {
        usersLetters: letters
      })

    case 'NEW_LETTERS':
      return Object.assign({}, state, {
        usersLetters: action.payload
      })

    case 'INCREASE_USER_SCORE':
    const currentScore = state.userScore
      return Object.assign({}, state, {
        userScore: currentScore + action.payload
      })
  }

  return state
}