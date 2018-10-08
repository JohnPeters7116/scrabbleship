export default  class LetterBag {
  constructor() {
    this.letterBag = this.generateLetterBag()
  }

  shuffleBag() {
    if (this.letterBag.length < 1) return null
    let shuffledBag = this.letterBag

    for (let i = 0; i < shuffledBag.length; i++) {
      let randomNumber = Math.floor(Math.random() * (shuffledBag.length - 1))
      let currentValue = shuffledBag[i]
      shuffledBag[i] = shuffledBag[randomNumber]
      shuffledBag[randomNumber] = currentValue
    }

    return this.letterBag = shuffledBag
  }

  uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
   )
  }


  generateLetterBag() {
    const letters = [
    {char: '-', n: 2, v: 0},
    {char: 'E', n: 12, v: 1},
    {char: 'A', n: 9, v: 1},
    {char: 'I', n: 9, v: 1},
    {char: 'O', n: 8, v: 1},
    {char: 'N', n: 6, v: 1},
    {char: 'R', n: 6, v: 1},
    {char: 'T', n: 6, v: 1},
    {char: 'L', n: 4, v: 1},
    {char: 'S', n: 4, v: 1},
    {char: 'U', n: 4, v: 1},
    {char: 'D', n: 4, v: 2},
    {char: 'G', n: 3, v: 2},
    {char: 'B', n: 2, v: 3},
    {char: 'C', n: 2, v: 3},
    {char: 'M', n: 2, v: 3},
    {char: 'P', n: 2, v: 3},
    {char: 'F', n: 2, v: 4},
    {char: 'H', n: 2, v: 4},
    {char: 'V', n: 2, v: 4},
    {char: 'W', n: 2, v: 4},
    {char: 'Y', n: 2, v: 4},
    {char: 'K', n: 1, v: 5},
    {char: 'J', n: 1, v: 8},
    {char: 'X', n: 1, v: 8},
    {char: 'Q', n: 1, v: 10},
    {char: 'Z', n: 1, v: 10},
    ]

  const bag = letters.map(letter => {
    let char = []
    for (let i = 0; i < letter.n; i++) {
      char.push({
        char: letter.char,
        v: letter.v,
        id: this.uuidv4(),
      })
    }
    return char
  })
  return this.letterBag = [].concat.apply([], bag)
  }

  sumAllPoints() {
    return this.letterBag.reduce((total, letter) =>
    total + letter.v, 0)}

  dealLetters(amount) {
    if (this.letterBag.length === 0) return []

    const numberLettersToDeal = amount > this.letterBag.length
      ? this.letterBag.length
      : amount

    let dealtLetters  = []
    for (let i = 0; i < numberLettersToDeal; i++) {
      let randomNumber = Math.floor(Math.random() * (this.letterBag.length - 1))
      dealtLetters.push({
        ...this.letterBag[randomNumber],
        position: [i, 15],
      })
      this.letterBag.splice(randomNumber, 1)
    }
    return dealtLetters
  }
}