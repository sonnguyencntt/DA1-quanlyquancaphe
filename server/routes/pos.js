var express = require('express');
var router = express.Router();
var connectDB = require('./connect');
var conn = connectDB.pool;
const jwt = require('jsonwebtoken');
var logic = require('../logic')

router.get('/', function(req, res, next) {

 res.send('ahihi')
});

router.get('/getarea', function(req, res, next) {

    conn.query('SELECT * FROM areas',(err,result)=>{
       conn.query("SELECT tables.IdTable, TableName,tables.idStatus,IdArea, bill.IdBill FROM tables "+
       "LEFT JOIN bill ON tables.IdTable = bill.IdTable AND bill.idStatus = 0 WHERE tables.IdArea = '"+result[0].IdArea+"'",(err_, result_)=>{
          
        res.send({area : result,
            table:result_
        })
       })
    })
    
   });
   router.post('/gettableforselect', function(req, res, next) {

        conn.query("SELECT tables.IdTable, TableName,tables.idStatus,IdArea, bill.IdBill FROM tables "+
       "LEFT JOIN bill ON tables.IdTable = bill.IdTable AND bill.idStatus = 0 WHERE tables.IdArea = '"+req.body.data+"'",(err_, result_)=>{
                      res.send({table : result_})
        })
    
   });


   router.get('/getcate', function(req, res, next) {

    conn.query('SELECT * FROM categories',(err,result)=>{
        conn.query("SELECT * FROM menus WHERE Idcate = '"+result[0].Idcate+"' ",(err_,result_)=>{
            res.send({cate : result,
                    menu : result_
            })
        })
    })
    
   });  
   router.post('/getmenuforselect', function(req, res, next) {

    conn.query("SELECT * FROM menus WHERE Idcate = "+req.body.data+" ",(err_,result_)=>{
        res.send({menu : result_})
    })

});
router.post('/searchmenu', function(req, res, next) {
    if(req.body.data == '')
    {
        res.send({menu : [{non_Query : 'non_query'}]});
        return;
    }
console.log("SELECT * FROM menus WHERE IdMenu LIKE %"+req.body.data+"% or NameMenu LIKE '%"+req.body.data+"%'")
    conn.query("SELECT * FROM menus WHERE IdMenu LIKE '%"+req.body.data+"%' or NameMenu LIKE '%"+req.body.data+"%' ",(err_,result_)=>{
        res.send({menu : result_})
    })

});
router.post('/getcustomer', function(req, res, next) {
    if(req.body.data == '')
    {
        res.send({customers : []});
        return;
    }
    conn.query("SELECT * FROM customers  WHERE CustomerName LIKE '%"+req.body.data+"%' OR PhoneNumber LIKE '%"+req.body.data+"%' ",(err_,result_)=>{
        res.send({customers : result_})
    })

});
router.post('/getlistbilldetail', function(req, res, next) {
   
     conn.query("SELECT bill.IdBill FROM tables , "+
    "bill WHERE tables.IdTable = bill.IdTable AND bill.idStatus = 0 AND tables.IdTable = "+req.body.IdTable+"",(err_b, result_b)=>{
        console.log(result_b)
        if(result_b.length > 0)
        {
          conn.query("SELECT * FROM bill  WHERE IdBill  = '"+result_b[0].IdBill+"' ",(err_,result_bill)=>{
              conn.query("SELECT * FROM customers  WHERE IdCustomer = '"+result_bill[0].IdCustomer+"'",(err_,result_customer)=>{
                  conn.query("SELECT * FROM tables  WHERE IdTable  = "+result_bill[0].IdTable+"",(err_,result_table)=>{
                      conn.query("SELECT billdetail.IdBill, billdetail.IdMenu, billdetail.Quantity, billdetail.Price as TotalPrice, menus.NameMenu, menus.Price FROM menus , billdetail "+
                      "WHERE IdBill = '"+result_bill[0].IdBill+"' AND billdetail.IdMenu = menus.IdMenu",(err_,result_menu)=>{
                          console.log("SELECT billdetail.IdBill, billdetail.IdMenu, billdetail.Quantity, billdetail.Price as TotalPrice, menus.NameMenu, menus.Price FROM menus , billdetail "+
                          "WHERE IdBill = '"+result_bill[0].IdBill+"' AND billdetail.IdMenu = menus.IdMenu");
                          conn.query("SELECT TotalPrice FROM bill  WHERE IdBill  = '"+result_bill[0].IdBill+"'",(err_,result_totalprice)=>{
                              res.send({
                                  customer : result_customer,
                                  table : result_table,
                                  menu : result_menu,
                                  totalprice : result_totalprice,
                                  idbill_default : result_b[0].IdBill
                              })
                          })
                      })
                  })
              })
          })
          return;
        }
        conn.query("SELECT * FROM tables WHERE IdTable = '"+req.body.IdTable+"'",(err, result)=>{
            res.send({
                customer :[{}],
                table : result,
                menu : [],
                totalprice : [{TotalPrice : 0}],
                idbill_default : null
            })
        })
       
     
     })
    })
    function getDatetimeNow(){
        var today = new Date();
        var today1 = new Date();


        return  "HD-" +
         (today.getDate() < 10 ? '0' : '') + 
         today.getDate() +
        "/" +
         ((Number(today.getMonth())+1) < 10 ? '0' : '') +
        (Number(today.getMonth())+1) +
        "/" +
        today.getFullYear() +
        " " +
        (today1.getHours() < 10 ? '0' : '') +
       today.getHours() +
        ":" +
        (today.getMinutes() < 10 ? '0' : '') +
         today.getMinutes() +
        ":" +
        (today.getSeconds() < 10 ? "0" : "")+
        today.getSeconds() 
       

    }
    console.log(getDatetimeNow());
    


    router.post('/insertpos', function(req, res, next) {
       var data = req.body;
       var id = getDatetimeNow()
      console.log(logic.parseNullToString(data.customer.IdCustomer))
       if(data.id == null)
       {
        console.log('insert');

           conn.query("INSERT INTO `bill` (`IdBill`, `id`, `IdUser`, `IdTable`, `IdCustomer`, `create_at`, `Sale`, `idStatus`, `Totalprice`, `Note`) "+
           " VALUES (null, '"+id+"', '"+data.IdUser+"', '"+data.table.IdTable+"', "+logic.parseNullToString(data.customer.IdCustomer)+", current_timestamp(), '0', '0', '"+data.totalprice+"', 'noteeee');",(err,result)=>{
            if(err)
            {
                console.log(err)
                return;
            }
            conn.query("SELECT IdBill FROM bill WHERE id = '"+id+"'",(err_,result_)=>{
                if(err_)
                {
                    console.log(err_);
                    return;
                }
                console.log(result_);
                var stringSql = '';
                data.menu.forEach((value,index)=>{
                stringSql = stringSql + "INSERT INTO `billdetail` (`IdDetail`, `IdBill`, `IdMenu`, `Quantity`, `Price`) VALUES (NULL, '"+result_[0].IdBill+"', '"+value.IdMenu+"', '"+value.Quantity+"', '"+value.Price+"');" ;
                })
                console.log(stringSql);

                conn.query(stringSql,(err__, result__)=>{
                    if(err__)
                    {
                        console.log(err__);
                        return;
                    }
                    res.send({status : 'success'});
                    return;
                })

            })

           })
         return;
       }
       else
       {
           console.log('update');
       conn.query("UPDATE `bill` SET `Totalprice` = '"+data.totalprice+"', `Note` = 'noteeeee', `IdCustomer` = "+logic.parseNullToString(data.customer.IdCustomer)+" WHERE `bill`.`IdBill` = "+data.id+";",(err_,result_)=>{
        if(err_)
        {
            console.log(err_);
            return;
        }
        var stringSql = '';
        data.menu.forEach((value,index)=>{
        stringSql = stringSql + "INSERT INTO `billdetail` (`IdDetail`, `IdBill`, `IdMenu`, `Quantity`, `Price`) VALUES (NULL, '"+data.id+"', '"+value.IdMenu+"', '"+value.Quantity+"', '"+value.Price+"');" ;
        })
        console.log("DELETE FROM billdetail WHERE IdBill = "+data.id+"; "+stringSql+"");
        conn.query("DELETE FROM billdetail WHERE IdBill = "+data.id+"; "+stringSql+"",(err__, result__)=>{
            if(err__)
            {
                console.log(err__);
                return;
            }
           

        })
       })
       }
    });  
    // function x()
    // {
    //     return function(x,y)
    //     {
    //         console.log('2')

    //         return function()
    //         {
    //             console.log(y)
    //             return x1=1;
    //         }
    //     }
    // }
    // var z = x()()();
    // console.log(z);
    router.get('/getuser', function(req, res, next) {
        var accsessToken= req.headers.cookie;
     jwt.verify(accsessToken, 'shhhhh', (err, decode)=>{
      if(err)
      {
         return;
      }
      res.send({user:decode})
    });
    
    });

    router.post('/deletemenuofpos', function(req, res, next) {
      conn.query("DELETE FROM billdetail WHERE IdDetail = '"+req.body.data+"'",(err,result)=>{
        if(err)
        {
            res.send({err : 'err'})
            return;
        }
        res.send({success : 'success'})
      })
    
    });
module.exports = router;
