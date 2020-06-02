import { combineReducers } from 'redux';

import table from './Table/index';
import customer from './Customer/index';
const appReducers = combineReducers({
   table,
   customer,
   
});

export default appReducers;