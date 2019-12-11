import {combineReducers} from 'redux';
import reduxReducer from '../redux/reducers';
import {reduxSauceReducer} from '../redxu-sauce/TodoRedux';

export default combineReducers({
  reduxReducer: reduxReducer,
  reduxSauceReducer: reduxSauceReducer,
});
