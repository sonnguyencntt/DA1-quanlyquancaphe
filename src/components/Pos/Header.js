import React, { Component } from 'react';

import * as action from '../../actions/pos';
import {connect} from 'react-redux';

///////







///////////
class Header extends Component {
	constructor(props) {
		super(props);
	  
		this.state = {
		 search : '',
		};
	  }
	 
		
   // console.log(this.props.history.match.params.id);
   showmenu = (menus, id) =>
    {
    var result = null;
    var style = {width : '100px'}
    if(menus.length > 0)
    {
      
      result = menus.map((menu,index) =>
      {

		if(typeof menu.non_Query != "undefined")
		{
			return;
		}
		else
		{
			return (
 
				<div class="container-fluid style-of-container menu_hover" onMouseOver = {()=>{console.log('1')}} style = {
					{
					border: "1px solid #ddd",
					paddingRight : '0px',
					paddingLeft  : '0px',
					backgroundColor : 'white',
					cursor: 'pointer',
					display:'flex',
					
				
				}
					
					}>
		<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style = {{
		marginTop : 'auto',
		marginBottom : 'auto'
		}}>
		<span style = {{fontSize : '18px'}}>{menu.NameMenu}</span>	
		
		</div>
		
		<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style = {{marginTop : 'auto',
		marginBottom : 'auto'}}>
		<img style={{    
		height: '60px',
		width: '60px',
		marginTop: '5px',
		marginBottom: '5px',
		float : "right"}} src={menu.Images} alt=""/>
		
		</div>
		</div>
			  
			  
			   );
		}
    
      })
	}
	else
	{
		
			return(
				<div class="container-fluid style-of-container menu_hover" onMouseOver = {()=>{console.log('1')}} style = {
					{
					border: "1px solid #ddd",
					paddingRight : '0px',
					paddingLeft  : '0px',
					backgroundColor : 'white',
					cursor: 'pointer',
					display:'flex',
					
				
				}
					
					}>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style = {{
		marginTop : 'auto',
		marginBottom : 'auto',
		height : '40px'
		}}>
		<span style = {{fontSize : '18px'}}>Not result for search</span>	
		
		</div>
		
		
		</div>
			)
		
		
		
	}
   
   return result
	};
	
	searchMenu = (data)=>{
		// if(data == '')
		// {
		// 	this.props.valueDefaultNull({
		// 		type : {
           
		// 			get_list_forsearchMenu : {
		// 				type : 'GET_LIST_FEATURE_SEARCH_MENU',
		// 				data : []
		// 			  }
		// 		  }
		// 	})
		// 	return;
		// }
		this.props.searchForMenu({data : data})
	}
  render() 
  
  {
    return (
     
		<div className="position-fixed">
		 	<div id="topsidebar">
	   <nav class="navbar navbar-color" role="navigation">
		   <div class="navbar-header">
			   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
				   <span class="sr-only color">Toggle navigation</span>
				   <span class="icon-bar color"></span>
				   <span class="icon-bar color"></span>
				   <span class="icon-bar color"></span>
			   </button>
			   <a class="navbar-brand text-color" href="#">Quản Lý Quán Cà Phê</a>
		   </div>
	   
		   <div class="collapse navbar-collapse navbar-ex1-collapse">
			  
			   <div class="navbar-form navbar-left bill_Search" role="search" >
				   <div class="form-group" style = {{marginLeft : '310px',width : '400px'}  }>
					   {/* <input  type="text" class="form-control search input-size" placeholder="Nhập Tên Mặt Hàng"/> */}
					   
					   <input onChange = {(e)=>{
							this.searchMenu(e.target.value);
						   
					   }}  type="text" id="myInput" class="form-control " onkeyup="myFunction()" placeholder="Search for names.."
					   />


<div class="container-fluid child-of-listmenu"
								style = {
									{
									paddingRight : '0px',
									paddingLeft  : '0px',
									position: 'fixed',
   									 width: '400px',
								}
									
									}
>


{this.showmenu(this.props.search_menu.search_menu)}


</div>



				   </div>
				  
			   </div>
			   <ul class="nav navbar-nav navbar-right">
				  
				   <li class="dropdown " >
					   <a className="text-size text-color" href="#" >Quay lại <b class="fa fa-arrow-left"></b></a>
					  
				   </li>
			   </ul>
		   </div>
	   </nav>
	   </div>
	   </div>
   
    );
  }
}
const  mapStateToProps = state =>{
  
	return{
	 search_menu : state.pos
	}
  };
  
  
  const mapDispatchToProps = (dispatch, props) =>{
	return {
	  
	  searchForMenu : (data) =>{
		dispatch(action.searchForMenuOnRequest(data));
	   
	  },
	  valueDefaultNull : (action) =>{
		  dispatch(action)
	  }
	 
	}
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Header);