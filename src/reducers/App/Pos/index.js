import { combineReducers } from 'redux';
import * as Menu from './Menu';
import * as List from './List'
import * as Feature from './feature'
import * as Payment from './payment'

const appReducers = combineReducers({
   
    areas : Menu.area,
    table : List.table,
    cates : Menu.cate,
    menu : List.menu,
    search_menu : Feature.search,
    show_list_table : Feature.show_list_table,
    payment_total : Payment.totalPrice,
    guest_money : Payment.guestMoney,
    extra_money : Payment.extraMoney,


});

export default appReducers;