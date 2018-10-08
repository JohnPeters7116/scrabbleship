import { fetchData } from './requests'

export const composeWord = async (letters) => {
  const playedLetters = letters.filter(letter => letter.position[1] !== 15)

  if (!playedLetters|| playedLetters.length < 1) {
    console.log('play some letters')
    return null
  }
  //Make sure at least one letter played
  //Check to see if letters position either all
  // in same x coordinates or y coordiates. If not
  // then letters not one after other and invalid
  const sameColumn = playedLetters.reduce((a, b) => {
    return a * b.position[0]
  }, 1) === Math.pow(playedLetters[0].position[0], playedLetters.length)

  const sameRow = playedLetters.reduce((a, b) => {
    return a * b.position[1]
  }, 1) === Math.pow(playedLetters[0].position[1], playedLetters.length)

  if (!sameRow && !sameColumn) {
    console.log('not in a row or column')
    return null
  }

  //If in same row order by x
  //If in same column order by y
  const ordered = sameRow
    ? playedLetters.sort(function (a, b) {
        return a.position[0] - b.position[0] })
    : playedLetters.sort(function (a, b) {
      return a.position[1] - b.position[1]
    })

  const word = ordered.reduce((a, b) => {
    return a + b.char
  }, '')

  //Check to see if actually word
  const fetched = await fetchData(word)
  console.log('word', fetched)
  const isWord = Object.keys(fetched.authors).length !== 0
  return isWord
}
