var express = require('express');
var router = express.Router();
var connectDB = require('./connect');
var conn = connectDB.pool;
var table = require('./board_type/table');
var room = require('./board_type/room');
var supplier = require('./board_type/supplier')
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
router.get('/getstt',(req, res)=>{
    
   table.getSTT(req,conn, res)
    })
module.exports = router ;