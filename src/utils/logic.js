import { fetchData } from './requests'


export const submitWord = async (playedLetters) => {
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
    return {
      word: 'non-word',
      score: 0
    }
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
  const fetchedWord = await fetchData(word)
  //If word get scoreGet word score
  const score = fetchedWord === 'non-word'
    ? 0
    : calculateWordScore(ordered)

  return {
    word: fetchedWord,
    score
  }
}

export function observe(receive) {
  setInterval(() => receive([
    Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 8)
  ]), 500);
}

export function canDropLetterBlock(toX, toY, coordinates) {
  console.log(toX)
  //First move of game must be at the center
  if (!coordinates[77]){
    return (toX === 7 & toY === 7);
  }
  return true
}


export function calculateWordScore(letterBlocks) {
   const score = letterBlocks.reduce((a, b) => {
     return a + b.v
   }, 0)
   return score
}
