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


   
     // var decoded = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbm5ndXllbiIsIm5hbWUiOiJob25nc29uIiwiaWF0IjoxNTkwNDY1NTc4LCJleHAiOjE1OTA0NjU2MDh9.');

module.exports = router ;