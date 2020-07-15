import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Feature from './../../actions/pos/feature'
import * as actionPos from '../../actions/pos';







///////////
class Confirm extends Component {
  
  deleteMenu = (data,list) =>{
    this.props.delete_Menu(data, list)
  }

 
 
  render() 
  
  {
    return (
     
        <div style = {{backgroundColor: 'rgba(38, 37, 37, 0.5)', opacity : '1', display : this.props.confirm.confirm.display}} id="myModal" class="modal fade">
        <div class="modal-dialog modal-confirm">
            <div style = {{marginTop : '50%'}} class="modal-content">
                <div class="modal-header flex-column">
                    <div class="icon-box">
                        <i class={this.props.confirm.confirm.icon}></i>
                    </div>						
                    <h4 class="modal-title w-100">Bạn có chắc chắn ?</h4>	
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <p>
                    {this.props.confirm.confirm.modalBody}
                        </p>
                    </div>
                <div class="modal-footer justify-content-center">
                    <button onClick = {()=>{
                     
                     
                    var newProps = {...this.props.confirm.confirm};
                      newProps.display = 'none';

                    this.props.confirmFunc({
                    type : {
                      confirm_pos : {
                      type: 'CONFIRM_POS',
                      data : newProps
                    }
                    }
                  })
                    }} 
                    type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button 
                    onClick = {()=>{
                      this.deleteMenu(this.props.confirm.confirm,this.props.confirm.show_list_table)
                    }}
                     type="button" class="btn btn-danger">Agree</button>
                </div>
            </div>
        </div>
    </div> 
       
    );
  }
}

const  mapStateToProps = state =>{
  
	return{
    confirm : state.pos
	}
  };
  
  
  const mapDispatchToProps = (dispatch, props) =>{
	return {
	 
	  delete_Menu : (data,list)=>{
      dispatch(actionPos.deleteMenu(data,list))
    },
    confirmFunc : (action) =>{
      dispatch(action)
    }
	}
  }
export default connect(mapStateToProps,mapDispatchToProps)(Confirm);