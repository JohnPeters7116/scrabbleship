import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
// import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './constants';
import { DropTarget } from 'react-dnd';
import { changePosition } from '../actions/index'
import { connect } from 'react-redux'

const squareTarget = {
  drop(props) {
    return {x: props.x, y: props.y}
  }
};

function collect(connect, monitor, props) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    dropResult: monitor.getDropResult(),
    canDrop: false
  };
}

@connect()
@DropTarget(ItemTypes.LETTERBLOCK, squareTarget, collect)
export default class BoardSquare extends Component {

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const {
      x,
      y,
      connectDropTarget,
      isOver,
      dropResult,
      holder,
      canDrop,
    } = this.props;
    const black = (x + y) % 2 === 1;
    // console.log("TARGET", dropResult)

    return connectDropTarget(
      <div style={styles.container}>
        <Square black={black} holder={holder} coordinates={[x, y]}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('green')}
        {/* {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')} */}
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};