import React, { Component } from 'react';
import Menu from './../../components/Menu/Menu';
import Header from './../../components/Menu/Header';
import Content from '../../components/Table/Content';
import {Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CheckAuth from  './../../authentication/checkauth'


// import $ from 'jquery';
// import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './../../../node_modules/bootstrap/dist/js/bootstrap.min';

 //for bootstrap.min.js
//bootstrap-theme file for bootstrap 3 only
// import './../../../bootstrap/dist/css/bootstrap-theme.min.css';
// import './../../../bootstrap/dist/css/bootstrap.min.css';
// import './../../../bootstrap/dist/js/bootstrap.min.js';


const history = createBrowserHistory();




class Table extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      redirect : true,
      loading : false,
      
    };
  }
  componentWillMount(){
    CheckAuth().then((data)=>{
      if(data == true)
      {
        console.log(data);
         this.setState({redirect : true, loading : true});
        //this.state.redirect = true;
        return;
      }
      else
      {
       // this.state.redirect = false;

      this.setState({redirect: false, loading : true})
      }
    })
    // if(CheckAuth())
    // {
      
    //   this.setState({redirect : true});
    //   return;
    // }
    // this.setState({redirect: false})
  }
 
  
 
  render() 
  
  {
    if(this.state.loading == false)
   {
    return <div></div>
   }
   else
   {
     if(this.state.redirect == false)
     {
      return <Redirect to='/login' />
 
     }
    return (
    
<div>
  
<Header/>

<div class="row sidebar-row">

<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 full-height"  >

			<Menu/>
	
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"  >



    </div>


	
</div>

<Content/>



</div>
</div>
   

   
    );
  }
  }
}


export default Table;