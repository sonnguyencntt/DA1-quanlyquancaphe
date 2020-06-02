import React, { Component } from 'react';
import Menu from './../../components/Menu/Menu';
import Header from './../../components/Menu/Header';
import Content from '../../components/Cdashboard/Content';
import CheckAuth from  './../../authentication/checkauth'

import { Redirect } from "react-router-dom";






class DashBoard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      redirect : true,
      loading : false,
      
    };
  }

  static getDerivedStateFromProps(props, state) {
    CheckAuth().then((data)=>{
      if(data == true)
      {
       console.log('getdriver')
        
        //this.state.redirect = true;
        return null
      }
      else
      {
       // this.state.redirect = false;
        return null;
      
      }
    })  
  }
  // componentWillMount(){
  //   console.log('will mount')

  //   CheckAuth().then((data)=>{
  //     if(data == true)
  //     {
  //       console.log(data);
  //        this.setState({redirect : true, loading : true});
  //       //this.state.redirect = true;
  //       return;
  //     }
  //     else
  //     {
  //      // this.state.redirect = false;

  //     this.setState({redirect: false, loading : true})
  //     }
  //   })
  //   // if(CheckAuth())
  //   // {
      
  //   //   this.setState({redirect : true});
  //   //   return;
  //   // }
  //   // this.setState({redirect: false})
  // }
   // console.log(this.props.history.match.params.id);
 
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


export default DashBoard;