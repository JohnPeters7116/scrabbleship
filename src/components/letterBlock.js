import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import { canDropLetterBlock } from '../utils/logic';

const letterBlockSource = {
  beginDrag(props) {
    // console.log('drag', props)
    return {};
  },
  endDrag(props, monitor, component) {
    let coordinateHash = {}
    props.letters.forEach(letter =>
      coordinateHash[`${letter.position[0]}${letter.position[1]}`] = true
    )
    const result = monitor.getDropResult()
    console.log('result', result)
    //check to make sure allowed
    if (!canDropLetterBlock(result.x, result.y, coordinateHash)) return null
    //check to make sure no block already there
    if (coordinateHash[`${result.x}${result.y}`]) return null
    let newLetter = {
      ...props.letter,
      position: [result.x, result.y]
    }
    props.action(newLetter)
    return {
      userLetters: newLetter
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(ItemTypes.LETTERBLOCK, letterBlockSource, collect)
export default class LetterBlock extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging, letter } = this.props;

    if (letter.playedBy) {
      return (
        <div style={styles.playedLetterContainer}>
          <div style={styles.letter}>
            {letter.char}
          </div>
          <div style={styles.number}>
            {letter.v}
          </div>
        </div>
        );
    }

    return connectDragSource(
    <div style={styles.letterContainer}>
      <div style={styles.letter}>
        {letter.char}
      </div>
      <div style={styles.number}>
        {letter.v}
      </div>
    </div>
    );
  }
}

const styles = {
  letterContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    display: 'inline-block',
    borderRadius: 4,
    background: '#e4d095',
    cursor: 'default',
    textShadow: '1px 1px 1px rgba(255, 255, 255, 0.9), 0 -1px 1px rgba(255,255,255,0.2)',
    textTransform: 'uppercase',
    boxShadow: '1px 7px 15px rgba(0,0,0,0.8), inset 3px 0 2px rgba(255,255,255,0.4), inset 0 3px 0px rgba(255,255,255,0.5), inset -2px -3px 0px rgba(143,128,82,0.6)',
    width: 30,
    height: 30,
  },
  playedLetterContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    display: 'inline-block',
    borderRadius: 4,
    background: ' #fff4d3',
    cursor: 'default',
    textShadow: '1px 1px 1px rgba(255, 255, 255, 0.9), 0 -1px 1px rgba(255,255,255,0.2)',
    textTransform: 'uppercase',
    boxShadow: '1px 7px 15px rgba(0,0,0,0.8), inset 3px 0 2px rgba(255,255,255,0.4), inset 0 3px 0px rgba(255,255,255,0.5), inset -2px -3px 0px rgba(143,128,82,0.6)',
    width: 30,
    height: 30,
  },
  letter: {
    color: '#2a1f1b',
    fontWeight: 400,
    fontSize: 16,
    textAlign: 'center',
  },
  number: {
    position: 'absolute',
    color: '#2a1f1b',
    right: 4,
    bottom: 4,
    fontSize: 8,
    fontWeight: 'bold',
  }
}
