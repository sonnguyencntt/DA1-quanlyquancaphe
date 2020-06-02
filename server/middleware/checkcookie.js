const jwt = require('jsonwebtoken');

module.exports = 
{
    checkCookie : (accsessToken, req, next, res)=>{
       // var decoded = jwt.verify(accsessToken, 'shhhhh');
        // var position = accsessToken.lastIndexOf('.');
        // var SliceofToken = accsessToken.slice(position+1);
     

        try {
            var decoded = jwt.verify(accsessToken, 'shhhhh', (err, decode)=>{
                if(err)
                {

                  //res.status(403).render();
                   res.send({token : false})
                    return;
                    // co 2 truong hop
                    // + ton tai token nhung khong giai ma dc, (token tao lao)
                    //+ token da het hen
                    
                }
                req.decodeToken = decode;
                req.success = 'success';
               next();
            });
          } catch(err) {
            res.send({err : err});

            return;
          }
        
    }
}
