var express = require('express');
var router = express.Router();
var connectDB = require('./connect');
var conn = connectDB.pool;
var table = require('./board_type/table');
var room = require('./board_type/room');
var supplier = require('./board_type/supplier')
var customer = require('./board_type/customer')
const jwt = require('jsonwebtoken');
var export_Excel = require('./export_data')


router.get('/', (req, res) =>{
    res.send('ahihi')
})

router.post('/query/selectalldata',(req, res, next)=>{
var req = req.body;
console.log(req);
switch (req.type) {
    case 'TABLE':
        table.select_all_data(req,conn,res)
        break;
        case 'ROOM':
            room.select_all_data(conn,res)
            break;
            case 'SUPPLIER':
                supplier.select_all_data(req,conn,res)
                break; 
                case 'CUSTOMER':
                    customer.select_all_data(req,conn,res)
                    break;        
    default:
        break;
}
})

router.post('/query/insertdata',(req, res, next)=>{
    var req = req.body;
    console.log(req);
    switch (req.type) {
        case 'TABLE':
            table.insert(req,conn,res)
            break;
            case 'ROOM':
                room.insert(req,conn,res)
                break;
                case 'SUPPLIER':
                supplier.insert(req,conn,res)
                break;
                case 'CUSTOMER':
                    customer.insert(req,conn,res)
                    break;
        default:
            break;
    }
    })

    router.post('/query/updatedata',(req, res, next)=>{
        var req = req.body;
        console.log(req);
        switch (req.type) {
            case 'TABLE':
                table.update(req,conn,res)
                break;
                case 'ROOM':
                    room.update(req,conn,res)
                    break;
                    case 'SUPPLIER':
                supplier.update(req,conn,res)
                break;
                case 'CUSTOMER':
                    customer.update(req,conn,res)
                    break;
            default:
                break;
        }
        })
        router.post('/query/deletedata',(req, res, next)=>{
            var req = req.body;
            console.log(req);
            switch (req.type) {
                case 'TABLE':
                    table.delete(req,conn,res)
                    break;
                    case 'ROOM':
                        room.delete(req,conn,res)
                        break;
                        case 'SUPPLIER':
                supplier.delete(req,conn,res)
                break;
                case 'CUSTOMER':
                    customer.delete(req,conn,res)
                    break;
                default:
                    break;
            }
            })
            router.post('/query/exportdata',(req, res, next)=>{
               
                var req = req.body;
                console.log(req);
                export_Excel.export_data(req.board,res, conn);
                })        
/////////////////////
router.post('/query/searchdata',(req, res, next)=>{
    var req = req.body;
    room.search(req, conn, res)
    })
    function requiresLogin(req, res, next) {
       return next('s');
      }
    router.post('/checkpass',requiresLogin,(req, res, next)=>{
      console.log('check')
        var req = req.body;
        
        conn.query("SELECT COUNT(*) as count FROM users WHERE UserName ='" +req.username+ "' and Pass = '" +req.password+"'",(err, result)=>{
            if(result[0].count > 0)
            {
                const user = {
                    "email": 'sonnguyen',
                    "name":'hongson'
                  }
                  const token = jwt.sign(user, 'shhhhh', {
                    expiresIn: "30000000",
                  });
                  console.log(token)
                  res.send({token : token})
            }
            else
            {
                res.send('0')
            }
        });
        
        })
router.get('/getstt',(req, res)=>{

   
   table.getSTT(req,conn, res)
    })


    const user = {
        "email": 'sonnguyen',
        "name":'hongson'
      }
      const token = jwt.sign(user, 'shhhhh', {
        expiresIn: '30000000',
      });
     // var decoded = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbm5ndXllbiIsIm5hbWUiOiJob25nc29uIiwiaWF0IjoxNTkwNDY1NTc4LCJleHAiOjE1OTA0NjU2MDh9.');
//console.log(token)
//console.log(decoded);
module.exports = router ;