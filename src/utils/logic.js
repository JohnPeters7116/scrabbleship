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

export function calculateWordScore(letterBlocks) {
  const score = letterBlocks.reduce((a, b) => {
    return a + b.v
  }, 0)
  return score
}
export function canDropLetterBlock(toX, toY, coordinates, letters) {
  // console.log(coordinates)
  // console.log(Object.keys(coordinates))
  //First move of game must be at the center
  if (!coordinates['7-7']){
    return (toX === 7 & toY === 7);
  }
  const playable = playableSquares(letters)
  //Next moves must be next to already played letters
  if (playable[`${toX}-${toY}`]){
    return true
  }
  return false
}

export function playableSquares(letters) {
  if (!letters) return null
  const perimeterHash = {}
  letters.forEach(letter => {
    if (letter.position[1] === 15) return null
    perimeterHash[`${letter.position[0]-1}-${letter.position[1]}`] = true
    perimeterHash[`${letter.position[0]+1}-${letter.position[1]}`] = true
    perimeterHash[`${letter.position[0]}-${letter.position[1]-1}`] = true
    perimeterHash[`${letter.position[0]}-${letter.position[1]+1}`] = true
    }
  )
  if (Object.keys(perimeterHash).length === 0) return {'7-7': true}
  return perimeterHash
}

