var express = require('express');
var router = express.Router();
var connectDB = require('./connect');
var conn = connectDB.pool;
var table = require('./board_type/table');
var room = require('./board_type/room');
var supplier = require('./board_type/supplier')
var customer = require('./board_type/customer')
const jwt = require('jsonwebtoken');
var check_accesToken =require('./../middleware/auth')
var export_Excel = require('./export_data')

router.get('/', (req, res) =>{
    res.send('ahihi')
})
router.use(check_accesToken.check_authenTication);

router.post('/query/selectalldata',(req, res, next)=>{
var decode_Token = req.decodeToken;
var req = req.body;
switch (req.type + "|" + decode_Token.name) {
    case "TABLE|admin":
        table.select_all_data(req,conn,res)
        break;
        case "ROOM|admin":
            room.select_all_data(conn,res)
            break;
            case "SUPPLIER|admin":
                supplier.select_all_data(req,conn,res)
                break; 
                case "CUSTOMER|admin":
                    customer.select_all_data(req,conn,res)
                    break;        
    default:
        res.send({err : 'err'})
        break;
}
})

router.post('/query/insertdata',(req, res, next)=>{
    var decode_Token = req.decodeToken;
    var req = req.body;
    switch (req.type + "|" + decode_Token.name) {
        case "TABLE|admin":
            table.insert(req,conn,res)
            break;
            case "ROOM|admin":
                room.insert(req,conn,res)
                break;
                case "SUPPLIER|admin":
                    supplier.insert(req,conn,res)
                break;
                case "CUSTOMER|admin":
                    customer.insert(req,conn,res)
                    break;
        default:
            res.send({err : 'err'})

            break;
    }
    })

    router.post('/query/updatedata',(req, res, next)=>{
        var decode_Token = req.decodeToken;

        var req = req.body;
        switch (req.type + "|" + decode_Token.name) {
            case "TABLE|admin":
                table.update(req,conn,res)
                break;
                case "ROOM|admin":
                    room.update(req,conn,res)
                    break;
                    case "SUPPLIER|admin":
                        supplier.update(req,conn,res)
                break;
                case "CUSTOMER|admin":
                    customer.update(req,conn,res)
                    break;
            default:
                res.send({err : 'err'})

                break;
        }
        })
        router.post('/query/deletedata',(req, res, next)=>{
            var decode_Token = req.decodeToken;

        var req = req.body;
        switch (req.type + "|" + decode_Token.name) {
            case "TABLE|admin":
                    table.delete(req,conn,res)
                    break;
                    case "ROOM|admin":
                        room.delete(req,conn,res)
                        break;
                        case "SUPPLIER|admin":
                            supplier.delete(req,conn,res)
                break;
                case "CUSTOMER|admin":
                    customer.delete(req,conn,res)
                    break;
                default:
                    res.send({err : 'err'})

                    break;
            }
            })
            router.post('/query/exportdata',(req, res, next)=>{
                var decode_Token = req.decodeToken;
                if(decode_Token.name = 'admin')
                {
                var req = req.body;
                export_Excel.export_data(req.board,res, conn);
                }})       
             
            
/////////////////////
router.post('/query/searchdata',(req, res, next)=>{
    var decode_Token = req.decodeToken;
    if(decode_Token.name = 'admin')
    {
    var req = req.body;
    room.search(req, conn, res)
    }})
   
    router.post('/checkpass',(req, res, next)=>{
      
        var req = req.body;
        
        conn.query("SELECT * FROM users WHERE UserName ='" +req.username+ "' and Pass = '" +req.password+"'",(err, result)=>{
            console.log(result);
            if(result.length > 0)
            {
            if(typeof result[0].UserId != "undefined")
            {
                const user = {
                   email: result[0].Email,
                   name : result[0].UserName
                  }
                  const token = jwt.sign(user, 'shhhhh', {
                    expiresIn: "30000000",
                  });
                  res.send({token : token})
            }
        }
            else
            {
                res.send({err : 'not availd token'})
            }
        });
        
        })
router.get('/getstt',(req, res)=>{
    var decode_Token = req.decodeToken;
    if(decode_Token.name ='user')
    {   
   table.getSTT(req,conn, res)
    }})

router.post('/query/getstatistical',(req, res)=>{
    const query = "SELECT(SELECT SUM(Totalprice) FROM   bill WHERE create_at BETWEEN '"+req.body.date+" 00:00:01' AND '"+req.body.date+" 23:59:59') AS total_revenue,"+
    "(SELECT COUNT(*)FROM   bill WHERE create_at BETWEEN '"+req.body.date+" 00:00:01' AND '"+req.body.date+" 23:59:59') AS count_bill,"+
    "(SELECT COUNT(*)FROM   bill, customers WHERE bill.IdCustomer = customers.IdCustomer and customers.Debit > 0 AND  create_at BETWEEN '"+req.body.date+" 00:00:01' AND '"+req.body.date+" 23:59:59') AS total_debit_bill,"+
    "(SELECT SUM(customers.Debit)FROM   bill, customers WHERE bill.IdCustomer = customers.IdCustomer and customers.Debit > 0  AND  create_at BETWEEN '"+req.body.date+" 00:00:01' AND '"+req.body.date+" 23:59:59') AS sum_debit_bill,"+
    "(SELECT COUNT(*)FROM   bill WHERE idStatus = 0 and create_at BETWEEN '"+req.body.date+" 00:00:01' AND '"+req.body.date+" 23:59:59') AS count_unpaid_bill,( SELECT SUM(Totalprice)FROM   bill WHERE idStatus = 0 AND create_at BETWEEN '"+req.body.date+" 00:00:01' AND '"+req.body.date+" 23:59:59') AS total_unpaid_bill"
      conn.query(query,(err, result)=>{
        console.log(result);
        res.send(result);
        
      })
        })
        
      
function replace_fuc(date)
{
    if(typeof date.datetime != "undefined")
    {
        var format_Datetime = date.datetime.split("");
        if(format_Datetime[0] == 0)
        {
            format_Datetime[0] =''
        }
        if(format_Datetime[3]==0)
        {
            format_Datetime[3] ='';
        }
        
        var new_dateTime = format_Datetime.toString();
        var replace_date = new_dateTime.replace(/,/gi,"");
        console.log(replace_date)
        return replace_date;
    }
    return '00/00/0000'
    
}

router.post('/chart',(req, res)=>{
               var list_data = [];
               var data = req.body;
                var fromDate = data[0].split("/").reverse().join("-") + " 00:00:01";
                var nextDate = data[6].split("/").reverse().join("-") + " 23:59:59";
    conn.query("SELECT SUM(Totalprice) as total,DATE_FORMAT(create_at, '%d/%m/%Y') as datetime FROM bill WHERE create_at BETWEEN '"+fromDate+"' AND '"+nextDate+"' GROUP BY create_at ",(err, result)=>{
       
        data.forEach((cli_data, cli_index)=>{
            if(result.length > 0)
            {
                result.forEach((ser_data, ser_index)=>{

                    if(cli_data == replace_fuc(ser_data))
                    {
                        console.log('true');
                        list_data[cli_index] = ser_data.total;
                        return list_data
                    }
                    list_data[cli_index] = 0;
                        return list_data;
                })
            }
            return list_data
           
        })
        res.send(list_data);
    })
               console.log(nextDate);
                })        

 router.get('/query/selectOrder',(req, res)=>{
                  conn.query("SELECT bill.IdBill, staff.name, tables.TableName, customers.CustomerName,"+
                  "DATE_FORMAT(bill.create_at , '%d-%m-%y %h:%m:%s') as create_at,bill.idStatus,bill.Totalprice,"+
                  " bill.Note, GROUP_CONCAT(billdetail.IdDetail SEPARATOR '@#$') as idbilldetail "+
                  " ,GROUP_CONCAT(billdetail.IdMenu SEPARATOR '@#$') as idmenu, GROUP_CONCAT(billdetail.Quantity SEPARATOR '@#$') as quantity"+
                  ", GROUP_CONCAT(billdetail.Price SEPARATOR '@#$') as billdetail_price , GROUP_CONCAT(menus.NameMenu SEPARATOR '@#$') as namemenu"+
                  ",GROUP_CONCAT(menus.Unit SEPARATOR '@#$') as unit,GROUP_CONCAT(menus.Price SEPARATOR '@#$') as menu_price FROM bill"+
                  ", billdetail,users,tables,customers,staff, menus  WHERE bill.IdBill = billdetail.IdBill and bill.IdUser=users.UserId"+
                  " and bill.IdTable = tables.IdTable and bill.IdCustomer = customers.IdCustomer AND users.id_staff = staff.id AND"+
                  " billdetail.IdMenu = menus.IdMenu GROUP BY billdetail.IdBill",(err, result)=>{
                    if(err)
                    {
                        return;
                    }
                    if(result.length == 0)
                    {
                        res.send(result);
                        return;
                    }
                       for(var index = 0 ; index <=result.length ; index++){
                            if(index == result.length)
                            {
                                console.log(result);
                                res.send(result);
                                return;
                            }
                           
                        var bill = [{}];
                        var arr_idbilldetail = result[index].idbilldetail.split("@#$");
                        
                        for(var index_menu = 0 ; index_menu<arr_idbilldetail.length;index_menu++){
                          
                          bill[index_menu] = 
                              {
                                namemenu : result[index].namemenu.split("@#$")[index_menu],
                                idbilldetail : result[index].idbilldetail.split("@#$")[index_menu],
                                idmenu : result[index].idmenu.split("@#$")[index_menu],
                                quantity : result[index].quantity.split("@#$")[index_menu],
                                billdetail_price : result[index].billdetail_price.split("@#$")[index_menu],
                                unit : result[index].unit.split("@#$")[index_menu],
                                menu_price : result[index].menu_price.split("@#$")[index_menu]
                            }
                              
                          
                       
                      
                        }
                       
                        result[index].menu_detail = JSON.stringify([...bill]);
                        
                    }

                  })
                    })
                   
     // var decoded = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbm5ndXllbiIsIm5hbWUiOiJob25nc29uIiwiaWF0IjoxNTkwNDY1NTc4LCJleHAiOjE1OTA0NjU2MDh9.');

module.exports = router ;