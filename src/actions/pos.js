import * as Types from './../constants/ActionType';
import callApi,  * as middleware from './../ultis/apiCaller';
import * as export_Data from './exportdata';

export const fetchAreaONrequest = () => {
   
    return (next, getstate, extra) =>{

        callApi('pos/getarea', 'get', null).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
            get_list_area :{
                  type : 'GET_LIST_AREAS',
                  data : res.data.area
              },
              get_list_table : {
                type : 'GET_LIST_TABLES',
                data : res.data.table
              }
          }});
       });

   };
}

export const fetchTableforSelectONrequest = (data) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/gettableforselect', 'post',data ).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
           
              get_list_table : {
                type : 'GET_LIST_TABLES',
                data : res.data.table
              }
          }});
       });

   };
}
export const fetchCateONrequest = () => {
   
    return (next, getstate, extra) =>{

        callApi('pos/getcate', 'get', null).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
            get_list_cate :{
                  type : 'GET_LIST_CATES',
                  data : res.data.cate
              },
              get_list_menu : {
                type : 'GET_LIST_MENU',
                data : res.data.menu
              }
          }});
       });

   };
}
export const fetchMenuforSelectONrequest = (data) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/getmenuforselect', 'post',data ).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
           
              get_list_menu : {
                type : 'GET_LIST_MENU',
                data : res.data.menu
              }
          }});
       });

   };
}