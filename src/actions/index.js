//USER ACTIONS
export function moveLetter(letter) {
  return {
    type: 'MOVE_LETTER',
    payload: letter
  }
}

export function newLetters(letters) {
  return {
    type: 'NEW_LETTERS',
    payload: letters
  }
}

export function increaseUserScore(points) {
  return {
    type: 'INCREASE_USER_SCORE',
    payload: points
  }
}

//BOARD ACTIONS
export function addPlayedLetters(word) {
  return {
    type: 'ADD_PLAYED_LETTERS',
    payload: word
  }
}

export function newLetterBag(letterBag) {
  return {
    type: 'NEW_LETTERBAG',
    payload: letterBag
  }
}