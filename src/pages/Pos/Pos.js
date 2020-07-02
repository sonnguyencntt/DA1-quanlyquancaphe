import React, { Component } from 'react';
import Header from './../../components/Pos/Header';
import Tabs from '../../components/Pos/Tabs';
import * as action from '../../actions/index';
import {connect} from 'react-redux';
import * as Feature from './../../actions/pos/feature'









class Pos extends Component {
  constructor(props){
    super(props);
    
  }
  totalPrice = (list) =>{
	  var total = 0
	  for(var i =0; i<list.length ; i++)
	  {
		  total = Number(list[i].TotalPrice) + Number(total)
	  }
	  return total;

  }
 changeQuantity = (id, value, list, guestMoney) =>{
	var newValue = Feature.changequantity(id , value, list);
	var totalPrice = this.totalPrice(newValue);
	var extraMoney = Number(guestMoney) - Number(totalPrice);
	this.props.changeQuantity({
		
			type : {
			   
				feature_appendmenu : {
					type : 'FEATURE_APPENDMENU',
					data : newValue
				  },
				  payment_total: {
					type : 'PAYMENT_TOTAL',
					data : totalPrice
				  },
				  extra_money: {
					type : 'EXTRA_MONEY',
					data : extraMoney
				  },
			  },
			  
		}
	)
 }
 deleteMenu = (id, list, guestMoney) =>{
	var newValue = Feature.deleteMenu(id ,  list);
	var totalPrice = this.totalPrice(newValue);
	var extraMoney = Number(guestMoney) - Number(totalPrice);

	this.props.changeQuantity({
		
			type : {
			   
				feature_appendmenu : {
					type : 'FEATURE_APPENDMENU',
					data : newValue
				  },
				  payment_total: {
					type : 'PAYMENT_TOTAL',
					data : totalPrice
				  },
				  extra_money: {
					type : 'EXTRA_MONEY',
					data : extraMoney
				  },
			  }
		}
	)
 }
  showMenu = (menus, id) =>
  {
  var result = null;
  var style = {width : '100px'}
  if(menus.length > 0)
  {
	
	result = menus.map((menu,index) =>
	{
	  
   return (

	<tr >
	<td>{index+1}</td>

   <td>{menu.NameMenu}</td>
	<td><div class="input-group spinner">
			<button  onClick = {(e)=>{
				this.changeQuantity(menu.IdMenu, Number(menu.Quantity) - 1, this.props.feature.show_list_table, this.props.feature.guest_money )
			}} style = {{width : "15%", float : "left",borderTopLeftRadius: '5px',borderBottomLeftRadius: '5px'}} class=" btn btn-default"><i class="fa fas fa-minus"></i></button>
			<input onChange = {(e)=>{
				this.changeQuantity(menu.IdMenu, e.target.value, this.props.feature.show_list_table,this.props.feature.guest_money)
			}}  style = {{width : "70%"}} type="number" class="form-control quantity-product-oders" name="" defaultValue={menu.Quantity} value = {menu.Quantity}/>
			<button onClick = {(e)=>{
				this.changeQuantity(menu.IdMenu, Number(menu.Quantity) + 1, this.props.feature.show_list_table,this.props.feature.guest_money)
			}} style = {{width : "15%",borderTopRightRadius: '5px',borderBottomRightRadius: '5px'}} class=" btn btn-default"><i class="fa fas fa-plus"></i></button>
		</div></td>
	<td><input type="text" class="form-control price-order" disabled="disabled" name="" value={menu.Price}/></td>
   <td class="text-center total-money">{menu.TotalPrice}</td>
	<td class="text-center">
		<button 
		onClick = {(e)=>{
			this.deleteMenu(menu.IdMenu, this.props.feature.show_list_table,this.props.feature.guest_money)
		}}
		style = {{backgroundColor : 'white'}}
		><i style = {{fontSize: '25px',
color: 'red'}} class="fa fa-times-circle del-pro-order"></i></button>
		
	</td>
</tr>
	
	
	 );
	})
  }
 
 return result
  };
  render() 
  
  {
	  console.log(this.props)
    return (
    <div>
      
      
     <div>
      <Header/>
     </div>
    
     <div class="container-fluid margin-content">
     <div class="row content">

      <Tabs/>
      <div class="col-md-6 content-listmenu" id="content-listmenu">
				<div class="row" id="bill-info">
					
						<div class="col-md-12 p-0 input-group flex" style = {{display : 'flex'}}>
							
							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
								<span style = {{
									fontSize: '30px',
									fontFamily: 'cursive',
									color: 'mediumvioletred',
								}}>Bàn 1</span>
							</div>
							
							
							<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
							<input style = {{width :'92%'}} type="text " id="customer-infor" placeholder="Tìm khách hàng" class="form-control size-tab"/>
    						<button style = {{width :'7%'}} class="btn btn-primary size-tab" data-toggle="modal" data-target="#ModelAddcustomer"><i class="fa fa-plus" aria-hidden="true"></i></button>
							{/* <div id="result-customer"></div>
							<span class="del-customer"></span> */}
							</div>
							
						</div>
					
				</div>
				<div class="panel panel-primary set-border">
		  <div class="panel-heading set_typecolor">
				<h3 class="panel-title">Danh sách sản phẩm</h3>
		  </div>
		  <div class="panel-body">
				
				<div class="table-responsive bill-detail-content">
					<table class="table table-hover table-bordered" >
						<thead style = {{backgroundColor : '#bebaba'}}>
						<tr>
						      <th >STT</th>

						      <th >Tên sản phẩm</th>
						      <th >Số lượng</th>
						      <th scope="col">Gía bán</th>
						      <th scope="col">Thành Tiền</th>
						      <th scope="col"></th>
						    </tr>
						</thead>
						<tbody>
						{this.showMenu(this.props.feature.show_list_table)}
						</tbody>
					</table>
				</div>
				
		  </div>
	</div>
				{/* <div class="row bill-detail">
					<div class="col-md-12 bill-detail-content">
						<table class="table table-bordered">
						  <thead class="thead-light">
						    <tr>
						      <th scope="col">STT</th>
						      <th scope="col">Tên sản phẩm</th>
						      <th scope="col">Số lượng</th>
						      <th scope="col">Gía bán</th>
						      <th scope="col">Thành Tiền</th>
						      <th scope="col"></th>
						    </tr>
						  </thead>
						  <tbody id="pro_search_append">
						    	
						  </tbody>
						</table>
					</div>
				</div> */}
				<div class="row bill-action margin-bill-action">
					<div class="col-md-6 margin-payment">
						<div class="row">
							<div class="col-md-12 p-1">
								<textarea class="form-control" id="note-order" placeholder="Nhập ghi chú hóa đơn" rows="3"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6 p-1 button-left">
								<button type="button" class="btn-print" onclick="cms_save_table()"><i class="fa fa-credit-card" aria-hidden="true"></i> Thanh Toán (F9)</button>
							</div>
							<div class="col-md-6 col-xs-6 p-1 button-right">
								<button type="button" class="btn-pay" onclick="cms_save_oder()"><i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu (F10)</button>
							</div>
						</div>
 					</div>
 					<div class="col-md-6">
 						<div class="row form-group">
							<label class="col-form-label col-md-4"><b>Tổng cộng</b></label>
							<div class="col-md-8">
								<input type="text"  value = {this.props.feature.payment_total} class="form-control total-pay" disabled="disabled"/>
							</div>
						</div>
						<div class="row form-group">
							<label class="col-form-label col-md-4"><b>Khách Đưa</b></label>
							<div class="col-md-8">
								<input 
								onChange = {(e)=>{
									var extraMoney = Number(e.target.value) - Number(this.props.feature.payment_total);
									this.props.extraMoney({
		
										type : {
										   
											extra_money : {
												type : 'EXTRA_MONEY',
												data : extraMoney
											  },
											  guest_money : {
												type : 'GUEST_MONEY',
												data : e.target.value
											  }
											  
										  }
									}
								)
								}}
								 type="text"  class="form-control customer-pay" defaultValue={this.props.feature.guest_money}  placeholder="Nhập số điền khách đưa"/>
							</div>
						</div>
						<div class="row form-group">
							<label class="col-form-label col-md-4"><b>Tiền thừa</b></label>
							<div class="col-md-8 excess-cash">
							{this.props.feature.extra_money}
							</div>
						</div>
 					</div>
				</div>
			</div>
			</div>
	</div>
     

      
    </div>

   
    );
  }
}

const  mapStateToProps = state =>{
  
	return{
	feature : state.pos
	}
  };
  
  
  const mapDispatchToProps = (dispatch, props) =>{
	return {
	  changeQuantity : (action) =>{
		  dispatch(action)
	  },
	  extraMoney : (action) =>{
		dispatch(action)
	}
	}
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Pos);