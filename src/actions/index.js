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