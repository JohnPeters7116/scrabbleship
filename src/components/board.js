import React, { Component } from 'react'
import LetterBlock from './letterBlock'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './boardSquare';
import { connect } from 'react-redux'
import { moveLetter, newLetters } from '../actions/index'
import LetterBag from '../utils/letters'
import { composeWord } from '../utils/logic'
import { bindActionCreators } from 'redux'

@DragDropContext(HTML5Backend)
class Board extends Component {

  constructor(props){
    super(props)
    this.state = {
      isWord: true
    }
  }

  newGame() {
    const bag = new LetterBag()
    const letters = bag.dealLetters(7)
    this.props.newLetters(letters)
  }

  renderPieces(x, y) {
    let { usersLetters, moveLetter } = this.props
    if (!usersLetters || usersLetters.length === 0) return null
    return usersLetters.map((letter,index) => {
      const [letterBlockX, letterBlockY] = letter.position
      if (x === letterBlockX && y === letterBlockY) {
        return <LetterBlock
          letter={letter}
          key={index}
          action={moveLetter}
          letters={usersLetters}/>;
      }
    })
  }

  renderBoard() {
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
          <BoardSquare x={x} y={y}>
            {this.renderPieces(x, y)}
          </BoardSquare>
        </div>
      )
    })
  }

  renderHolderSquares() {
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
          <BoardSquare x={x} y={y} holder>
            {this.renderPieces(x, y)}
          </BoardSquare>
        </div>
      )
    })
  }

  render() {
    const { usersLetters} = this.props
    return (
      <div>
        <div style={{
          width: 500,
          height: 500,
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {this.renderBoard()}
        </div>
          <div style={{
          width: 500,
          height: 50,
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: 'brown'
        }}>
          {this.renderHolderSquares()}
        </div>
        <div onClick={() => this.newGame()}>
          New Game
        </div>
        <div onClick={async() => {
          const isWord = await composeWord(this.props.usersLetters)
          console.log('test', isWord)
          this.setState({ isWord })
        }}>
          Submit Word
        </div>
        <div>
          {!this.state.isWord && 'not a word'}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state
  return {
    usersLetters: user.usersLetters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newLetters,
    moveLetter,
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(Board)