import React, { Component } from 'react';
import {connect} from 'react-redux';



///////







///////////
class ListProduct extends Component {
  
    showList_Menu = (menus) =>
    {
    var result = null;
    if(menus.length > 0)
    {
      
     result = menus.map((menu,index) =>
      {
       
     return (
 
                     
          
<li style = {{backgroundColor: '#baaba1',
                                        borderRadius: '10px'}}
     class="tb-active"><a href="#" onclick="cms_select_menu()" title="">
                        <div class="img-product">
                            <img style = {{borderRadius: '10px'}} src={menu.Images} alt=""/>
                        </div>
                        <div class="product-info">
     <span class="product-name">{menu.NameMenu}</span>
                            <br/>
                            <strong>{menu.Price}</strong>
                        </div>
                    </a>
                </li>      
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
     
       
        <div class="row product-list">
        <div class="col-md product-list-content">
            <ul>
               
                       
                {/* <li style = {{backgroundColor: '#baaba1',
                                        borderRadius: '10px'}}
     class="tb-active"><a href="#" onclick="cms_select_menu()" title="">
                        <div class="img-product">
                            <img style = {{borderRadius: '10px'}} src="http://lambanh365.com/wp-content/uploads/2015/05/cach-lam-banh-flan-sua-tuoi-cho-be-yeu-93.jpg" alt=""/>
                        </div>
                        <div class="product-info">
                            <span class="product-name">Bánh Flan</span>
                            <br/>
                            <strong>24.000.000đ</strong>
                        </div>
                    </a>
                </li> */}
                {this.showList_Menu(this.props.menu.menu)}
                
               
                
            </ul>
        </div>
    </div>

    );
  }
}

const  mapStateToProps = state =>{
	return{
	 menu : state.pos
	}
  };
export default connect(mapStateToProps,null)(ListProduct);