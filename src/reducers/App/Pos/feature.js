import * as Types from './../../../constants/ActionType';

const list_forSearch = [{non_Query : 'non_query'}];
const append_menu = [];


export const search = (state = list_forSearch , action) =>
{
  let newState = [...state];
  if(typeof action.type.get_list_forsearchMenu === "undefined"){
    return newState
  }
  else
  {
  switch(action.type.get_list_forsearchMenu.type){ 
    // case Types.FETCH_PRODUCTS:
    //   newState = action.product
    case Types.GET_LIST_FEATURE_SEARCH_MENU :
        newState = action.type.get_list_forsearchMenu.data;
        return newState;   
        // case Types.DELETE_PRODUCT :
        //   newState = action.product;
        //   return newState; 
        //   case Types.UPDATE_PRODUCT :
        //     newState = action.product;
        //     return newState;     
      default: return newState;
  }
}
}
export const show_list_table = (state = append_menu , action) =>
{
  let newState = [...state];
  if(typeof action.type.feature_appendmenu === "undefined"){
    return newState
  }
  else
  {
  switch(action.type.feature_appendmenu.type){ 
    // case Types.FETCH_PRODUCTS:
    //   newState = action.product
    case Types.FEATURE_APPENDMENU :
        newState = action.type.feature_appendmenu.data;
        return newState;   
        // case Types.DELETE_PRODUCT :
        //   newState = action.product;
        //   return newState; 
        //   case Types.UPDATE_PRODUCT :
        //     newState = action.product;
        //     return newState;     
      default: return newState;
  }
}
}

