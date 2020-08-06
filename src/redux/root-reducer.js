import { combineReducers } from 'redux';

import userReaducer from './user/user.reducer';

export default combineReducers({
    user: userReaducer
});