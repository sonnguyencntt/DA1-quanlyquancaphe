import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Menu/Header';
import Content from '../../components/Customer/Content';
import {Redirect} from 'react-router-dom';
import CheckAuth from  './../../authentication/checkauth'

import {connect} from 'react-redux';



class Table extends Component {
  
 
  
  componentWillMount(){
    CheckAuth().then((data)=>{
      if(data == true)
      {
        this.props.checkRedirect({type : {
          redirect : {
              type : 'CHECK_REDIRECT',
              data : true,
                },
                loading : {
                  type : 'CHECK_LOADING',
                  data : true,
                    }}})
        // console.log(data);
        //  this.setState({redirect : true, loading : true});
        // //this.state.redirect = true;

        return;
      }
      else
      {
        this.props.checkRedirect({type : {
          redirect : {
              type : 'CHECK_REDIRECT',
              data : false,
                },
                loading : {
                  type : 'CHECK_LOADING',
                  data : true,
                    }}})

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
    console.log(this.props.redirect);
    if(this.props.redirect.loading == false)
    {
     return <div></div>
    }
    else
    {
      if(this.props.redirect.redirect == false)
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

const  mapStateToProps = state =>{
  

  return{
   redirect : state.redirect,
   test : state.test

  }
};
const mapDispatchToProps = (dispatch, props) =>{
  return {
    checkRedirect : (redirect) =>{
      dispatch(redirect)
    },
   
   
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Table);