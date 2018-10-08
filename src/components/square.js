import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black, holder, coordinates } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    const centerSqaure = coordinates[0] * coordinates[1] === 49

    if (holder) return (
      <div style={{
        color: stroke,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {this.props.children}
      </div>
    );

    if (centerSqaure) return (
      <div style={{
        backgroundColor: 'red',
        border: '1px solid lightgrey',
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );

    return (
      <div style={{
        backgroundColor: fill,
        border: '1px solid lightgrey',
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}