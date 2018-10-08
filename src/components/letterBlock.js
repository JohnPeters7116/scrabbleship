import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

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
    return connectDragSource(
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
        }}>
        <div style={{
          width: 30,
          height: 30,
          opacity: isDragging ? 0.5 : 1,
          position: 'relative',
          display: 'inline-block',
          background: '#e4d095',
          color: '#2a1f1b',
          borderRadius: 4,
          fontWeight: 400,
          fontSize: 16,
          textAlign: 'center',
          cursor: 'default',
          textShadow: '1px 1px 1px rgba(255, 255, 255, 0.9), 0 -1px 1px rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
          boxShadow: '1px 7px 15px rgba(0,0,0,0.8), inset 3px 0 2px rgba(255,255,255,0.4), inset 0 3px 0px rgba(255,255,255,0.5), inset -2px -3px 0px rgba(143,128,82,0.6)',

        }}>
          {letter.char}
        </div>
      <div style={{
                      // position: 'absolute',
                      // bottom: 3,
                      // right: 3,
                      fontSize: 8,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {letter.v}
                    </div>
    </div>
    );
  }
}
