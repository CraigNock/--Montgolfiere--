import { combineReducers } from 'redux';

import app from './appReducer';
import user from './userReducer';
import conditions from './conditionsReducer';
import chat from './chatReducer';

//ie state.app, state.conditions, state.user
export default combineReducers({ app, user, conditions, chat, });