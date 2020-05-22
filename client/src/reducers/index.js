import { combineReducers } from 'redux';
import categories from './category_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    categories,
    user
});

export default rootReducer;