import {combineReducers} from 'redux';
import {filterReducer, idReducer} from './filter';

const rootReducer = combineReducers({
  filter: filterReducer,
  ids: idReducer,
});

export default rootReducer;
