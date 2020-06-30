import { combineReducers } from 'redux';
import * as Menu from './Menu';
import * as List from './List'


const appReducers = combineReducers({
   
    areas : Menu.area,
    table : List.table,
    cates : Menu.cate,
    menu : List.menu
});

export default appReducers;