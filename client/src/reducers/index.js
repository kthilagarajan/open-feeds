import { combineReducers } from 'redux';
import LoginReducer from './login-reducer';
import RegisterReducer from './register-reducer';
import HomeReducer from './home-reducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    feeds: HomeReducer
});

export default allReducers
