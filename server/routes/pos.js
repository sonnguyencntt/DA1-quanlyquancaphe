var express = require('express');
var router = express.Router();
var connectDB = require('./connect');
var conn = connectDB.pool;
router.get('/', function(req, res, next) {

 res.send('ahihi')
});

router.get('/getarea', function(req, res, next) {

    conn.query('SELECT * FROM areas',(err,result)=>{
        conn.query("SELECT * FROM tables WHERE IdArea = '"+result[0].IdArea+"' ",(err_,result_)=>{
            res.send({area : result,
                    table : result_
            })
        })
    })
    
   });
   router.post('/gettableforselect', function(req, res, next) {

        conn.query("SELECT * FROM tables WHERE IdArea = '"+req.body.data+"' ",(err_,result_)=>{
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
module.exports = router;
