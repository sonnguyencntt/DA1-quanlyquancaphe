import * as Types from './../constants/ActionType';
import callApi,  * as middleware from './../ultis/apiCaller';
import * as export_Data from './exportdata';
import * as Feature from './../actions/pos/feature'

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
export const searchForMenuOnRequest = (data) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/searchmenu', 'post',data ).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
           
            get_list_forsearchMenu : {
                type : 'GET_LIST_FEATURE_SEARCH_MENU',
                data : res.data.menu
              }
          }});
       });

   };
}
export const acSearchCustomerPos = (data) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/getcustomer', 'post',data ).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
           
            search_customer_pos : {
                type : 'SEARCH_CUSTOMER_POS',
                data : res.data.customers
              }
          }});
       });

   };
}
export const fetchAlldataofPos = (data) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/getlistbilldetail', 'post',data ).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          next({type : {
           
            show_customer_pos : {
                type : 'SHOW_CUSTOMER_POS',
                data : res.data.customer[0]
              },
              feature_appendmenu : {
                  type : 'FEATURE_APPENDMENU',
                  data :  res.data.menu
              },
              payment_total : {
                type : 'PAYMENT_TOTAL',
                data :  res.data.totalprice[0].TotalPrice
              },
              show_table_pos : {
                  type : 'SHOW_TABLE_POS',
                  data : res.data.table[0]
              },
              guest_money : {
                type : 'GUEST_MONEY',
                data : 0
              },
              extra_money : {
                type : 'EXTRA_MONEY',
                data : 0 - Number(res.data.totalprice[0].TotalPrice)
              },
              tab_pos_controll : {
                type : 'TAB_POS_CONTROLL',
                data : 'menu',
                }, 
                idbill_default_pos : {
                    type : 'IDBILL_POS_DEFAULT',
                    data :res.data.idbill_default
                },
            tabbackgroundM_pos_controll : {
                    type : 'TABBACKGROUND_M_POS_CONTROLL',
                data : {
                    backgroundColor :'#eb9898'
                   },
                  },
                  tabbackgroundT_pos_controll : {
                    type : 'TABBACKGROUND_T_POS_CONTROLL',
                data : {
                    backgroundColor : ''
                   },
                  }



          }});
       });

   };
}
export const insertBillrequest = (data) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/insertpos', 'post',data ).then(res =>{
           if(res == false)
           {
               return;
           }
           else
           {
               if(res.data.status = 'success')
               {
                var style_menu = {
                    backgroundColor :''
                   }
                   var style_table = {
                    backgroundColor : '#eb9898'
                   }
                    // this.setState({tab : 'table',
                    // style_forListMenu : style_menu,
                    // style_forListTable : style_table
                    //               });
    next({
      type : {
        tab_pos_controll : {
            type : 'TAB_POS_CONTROLL',
            data : 'table',
              }, 
              tabbackgroundM_pos_controll : {
                type : 'TABBACKGROUND_M_POS_CONTROLL',
            data : style_menu,
              },
              tabbackgroundT_pos_controll : {
                type : 'TABBACKGROUND_T_POS_CONTROLL',
            data : style_table,
              }
            }
    })
               }
               else
               {

               }
           }
          console.log(res);
        //   next({type : {
           
        //       get_list_table : {
        //         type : 'GET_LIST_TABLES',
        //         data : res.data.table
        //       }
        //   }});
       });

   };
}
export const deleteMenu = (data, list) => {
   
    return (next, getstate, extra) =>{

        callApi('pos/deletemenuofpos', 'post',{data : data.data} ).then(res =>{
           if(res == false)
           {
               return;
           }
          console.log(res);
          if(typeof res.data.err == "undefined")
          {
            var newValue = Feature.deleteMenu(data.data ,  list);
            var newProps = {...data};
            newProps.display = 'none';
            newProps.data = null;
            next({
                type : {
                   
                    feature_appendmenu : {
                        type : 'FEATURE_APPENDMENU',
                        data : newValue
                      },
                      confirm_pos : {
                        type: 'CONFIRM_POS',
                        data : newProps
                      }
                  }
    
              });
          }
         
       });

   };
}
export const getUser = () => {
   
    return (next, getstate, extra) =>{

        callApi('pos/getuser', 'get',null ).then(res =>{
            console.log(res);
           if(res == false)
           {
               return;
           }
          next({type : {
           
            get_idUser : {
                type : 'GET_ID_USER',
                data : res.data.user
              }
          }});
       });

   };
}