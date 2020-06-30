import React, { Component } from 'react';



///////







///////////
class Header extends Component {
  
   // console.log(this.props.history.match.params.id);
 
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
					   
					   <input  type="text" id="myInput" class="form-control " onkeyup="myFunction()" placeholder="Search for names.."
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
	<span style = {{fontSize : '18px'}}>Cà phê sữa đá</span>	

</div>

<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style = {{marginTop : 'auto',
	marginBottom : 'auto'}}>
<img style={{    
	height: '60px',
    width: '60px',
    marginTop: '5px',
	marginBottom: '5px',
	float : "right"}} src="https://media.cooky.vn/recipe/g1/2022/s/recipe2022-prepare-step11-635711695846648568.jpg" alt=""/>

</div>
</div>


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
    //  <div className="position-fixed">
	// 	<div id="topsidebar">
	// 	<nav class="navbar navbar-color" role="navigation">
	// 		<div class="navbar-header">
	// 			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
	// 				<span class="sr-only color">Toggle navigation</span>
	// 				<span class="icon-bar color"></span>
	// 				<span class="icon-bar color"></span>
	// 				<span class="icon-bar color"></span>
	// 			</button>
	// 			<a class="navbar-brand text-color" href="#">Quản lý Quán Cà Phê</a>
	// 		</div>
		
	// 		<div class="collapse navbar-collapse navbar-ex1-collapse collapse-index">
				
	// 			<ul class="nav navbar-nav navbar-right">
	// 				<li class="dropdown">
	// 					<a href="#" class="dropdown-toggle text-color" data-toggle="dropdown">Xin chào Admin<b class="caret " ></b></a>
	// 					<ul class="dropdown-menu">
	// 						<li><a href="#">Action</a></li>
	// 						<li><a href="#">Another action</a></li>
	// 						<li><a href="#">Something else here</a></li>
	// 						<li><a href="#">Separated link</a></li>
	// 					</ul>
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	</nav>
		
	// 	</div>
    //  </div>
    );
  }
}

export default Header;