import { combineReducers } from 'redux';
import user from './reducer_user'
import board from './reducer_board'


const rootReducer = combineReducers({
  user,
  board
});

export default rootReducer;

