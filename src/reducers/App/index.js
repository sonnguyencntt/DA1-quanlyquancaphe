import { combineReducers } from 'redux';

import table from './Table/index';
import customer from './Customer/index';
import dashboard from './dashboard/index';
import order from './Order/index';

import chart from './dashboard/chart';
import redirect from './redirect';
import pos from './Pos'
const appReducers = combineReducers({
   table,
   customer, 
   dashboard,
   chart,
   redirect,
   order,
   pos
   
});

export default appReducers;