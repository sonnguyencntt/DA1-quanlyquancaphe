

import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as action from '../../actions/pos';

///////







///////////
class NumberTable extends Component {
  
   // console.log(this.props.history.match.params.id);
 

   showList_Tables = (tables) =>
   {
   var result = null;
   if(tables.length > 0)
   {
     
    result = tables.map((table,index) =>
     {
      
    return (

					
         
    <li style = {{backgroundColor : '#615a57'}}  onclick="cms_load_pos()">{table.TableName}</li>
     
      );
     })
   }
   else
   {
     var Undefined_ = [];
     for(var i = 0; i< 8 ; i++)
     {
      Undefined_[i] = 	<li class="tb-active"  onclick="cms_load_pos()">Undefined!!!!</li>
        
     }
     result = Undefined_
    return result
   }
   return result;
   };

  render() 
  
  {
    return (
     
       
        <div class="header-cashier round_table">
			<div class="row table-list filter">
					<div class="col-md table-list-content">
						<ul>
						
								{this.showList_Tables(this.props.table.table)}
						
						</ul>
					</div>
				</div>
                </div>

    );
  }
}

const  mapStateToProps = state =>{
	return{
	 table : state.pos
	}
  };
export default connect(mapStateToProps,null)(NumberTable);