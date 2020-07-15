import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Feature from './../../actions/pos/feature'
import * as actionPos from '../../actions/pos';







///////////
class Payment extends Component {
  


  insertbill = () =>{
     
      var newCustomer = {...this.props.feature.show_customer};
     
      if(typeof newCustomer.IdCustomer != 'undefined')
      {
        newCustomer.Avatar = null;

      }
      
     
      this.props.insertBill({

          id : this.props.feature.idbill_default,
          table : this.props.feature.show_table,
          customer : newCustomer,
          menu : this.props.feature.show_list_table,
          totalprice : this.props.feature.payment_total,
          IdUser : this.props.user.id_staff
      })
  }
 
  render() 
  
  {
    return (
     
       
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
                    <button 
                    onClick = {()=>{
                        this.insertbill()
                    }}
                     type="button" class="btn-pay" onclick="cms_save_oder()"><i class="fa fa-floppy-o" aria-hidden="true"></i> Lưu (F10)</button>
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

    );
  }
}

const  mapStateToProps = state =>{
  
	return{
    feature : state.pos,
    user : state.user
	}
  };
  
  
  const mapDispatchToProps = (dispatch, props) =>{
	return {
	 
	  extraMoney : (action) =>{
		dispatch(action)
	},
	insertBill : (data) =>{
        dispatch(actionPos.insertBillrequest(data))
    }
	}
  }
export default connect(mapStateToProps,mapDispatchToProps)(Payment);