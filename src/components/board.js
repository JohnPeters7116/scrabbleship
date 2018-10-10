import React, { Component } from 'react'
import LetterBlock from './letterBlock'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './boardSquare';
import { connect } from 'react-redux'
import { moveLetter, newLetters, increaseUserScore, addPlayedLetters, newLetterBag } from '../actions/index'
import { submitWord, playableSquares } from '../utils/logic'
import { bindActionCreators } from 'redux'

@DragDropContext(HTML5Backend)
class Board extends Component {

  constructor(props){
    super(props)
    this.state = {
      word: 'verifying'
    }
  }

  newGame() {
    const {
      letterBag,
      newLetterBag,
      newLetters
    } = this.props
    const letters = letterBag.dealLetters(7)
    newLetters(letters)
    newLetterBag(letterBag)
  }

  getNewLetters() {
      const {
        letterBag,
        newLetterBag,
        newLetters,
        usersLetters
      } = this.props
       //Filter to only the letters not played on the board
      const nonPlayedLetters = usersLetters.filter(letter => letter.position[1] === 15)

      const letters = letterBag.dealLetters(7 - nonPlayedLetters.length)
      const newUserLetters = [...letters, ...nonPlayedLetters].map((letter, index) => {
        return {
          ...letter,
          position: [index, 15]
        }
      })
      newLetters(newUserLetters)
      newLetterBag(letterBag)
  }

  renderPieces(x, y) {
    let { usersLetters, moveLetter, playedLetters } = this.props
    if (!usersLetters || usersLetters.length === 0) return null

    const letters = [...usersLetters, ...playedLetters]
    return letters.map((letter,index) => {
      const [letterBlockX, letterBlockY] = letter.position
      if (x === letterBlockX && y === letterBlockY) {
        return <LetterBlock
          letter={letter}
          key={index}
          action={moveLetter}
          letters={letters}/>;
      }
    })
  }

  renderBoard(letters) {
    const squares = []
    for (let i = 0; i < 225; i++) {
      squares.push(i)
    }

    return squares.map(i => {
      const x = i % 15
      const y = Math.floor(i / 15)
      return(
        <div key={i}
          style={{ width: '6.66%', height: '6.66%'}}>
          <BoardSquare x={x} y={y} letters={letters}>
            {this.renderPieces(x, y)}
          </BoardSquare>
        </div>
      )
    })
  }

  renderHolderSquares(letters) {
    const holder = []
    for (let i = 225; i < 240; i++) {
      holder.push(i)
    }

    return holder.map(i => {
      const x = i % 15
      const y = Math.floor(i / 15)
      return(
        <div key={i}
           style={{ width: '6.66%', height: '100%'}}>
          <BoardSquare x={x} y={y} holder letters={letters}>
            {this.renderPieces(x, y)}
          </BoardSquare>
        </div>
      )
    })
  }

  async submitWord() {
    const {
      usersLetters,
      increaseUserScore,
      addPlayedLetters
    } = this.props
    //Make sure at least one letter played
    if (!usersLetters || usersLetters.length < 1) {
      console.log('play some letters')
      return null
    }
    //Set state to loading
    this.setState({
      loading: true
    })
    //Filter to only the letters played on the board
    const playedLetters = usersLetters.filter(letter => letter.position[1] !== 15)
    //Check if real word and get its score
    const wordResponse = await submitWord(playedLetters)
    this.setState({
        word: wordResponse.word
      },
      () => {
        if (wordResponse.word !== 'non-word'){
          increaseUserScore(wordResponse.score)
          addPlayedLetters(playedLetters)
          this.getNewLetters()
        }
        setTimeout(() => this.setState({
          loading: false,
          word: 'verifying'
        }), 3000)
    })
  }

  render() {
    const { usersLetters, userScore, playedLetters } = this.props
    const { loading, word } = this.state

    const letters = [...usersLetters, ...playedLetters]
    return (
      <div style={styles.container}>
        {loading &&
          <div style={styles.loading}>
            <div style={styles.loadingText}>
              {word === 'verifying' && 'verifying word...'}
              {word === 'non-word' && 'not a word'}
              {
                word !== 'verifying' && word !== 'non-word'
                && `acceptable word: "${word}"`
              }
            </div>
          </div>
        }
        <div style={styles.boardContainer}>
          {this.renderBoard(letters)}
        </div>
          <div style={styles.holderContainer}>
          {this.renderHolderSquares(letters)}
        </div>
        <div onClick={() => this.newGame()}>
          New Game
        </div>
        <div onClick={() => this.submitWord()}>
          Submit Word
        </div>
        <div>
          {userScore}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, board } = state
  return {
    usersLetters: user.usersLetters,
    userScore: user.userScore,
    letterBag: board.letterBag,
    playedLetters: board.playedLetters.map(letter => {
      return {
        ...letter,
        playedBy: 'user'
        }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newLetters,
    newLetterBag,
    moveLetter,
    increaseUserScore,
    addPlayedLetters,
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(Board)

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  boardContainer: {
    margin: 25,
    width: 500,
    height: 500,
    display: 'flex',
    flexWrap: 'wrap'
  },
  holderContainer: {
    width: 500,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'brown'
  },
  loading: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(51,51,51,0.7)',
    zIndex: 3,
  },
  loadingText: {
    display: 'block',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 4,
    padding: 15
  }
};