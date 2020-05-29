import callApi from './../ultis/apiCaller';

export default async function checkAuth(){
   return await callApi('auth', 'get', null).then(res =>{
      console.log(res);
        if(res.data.success)
        {
            return true;
        }
        else
        {
           
           return false;
        }
      
       
     });
}


