import React, { Component, Fragment } from 'react';
import Menu from './Menu';
import NumberTable from './NumberTable';
import MenuProduct from './MenuProduct';
import ListProduct from './ListProduct';




///////







///////////
class Tabs extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      style_forListTable : {
        backgroundColor : '#eb9898',
      },
      style_forListMenu : {
        backgroundColor : '',
      },
      tab : 'table'
    };
  }
   // console.log(this.props.history.match.params.id);
  showTab = ()=>{
    if(this.state.tab == 'table')
    {
      return(
        <Fragment>
                <Menu/>
                <NumberTable/> 
        </Fragment>
      )
    }
    else
    {
      return (
        <Fragment>
           <MenuProduct/>
                <ListProduct/>
        </Fragment>
      )
    }
    
  }
  render() 
  {
    console.log(this.state.tab)

    return (
     
       
        
			<div class="col-md-6 tablist-color" id="table-list">
			
      <div role="tabpanel">
          <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" >
              <a href="#tab" onClick = {(e)=>{e.preventDefault()
                                       var style_menu = {
                                        backgroundColor :''
                                       }
                                       var style_table = {
                                        backgroundColor : '#eb9898'
                                       }
                                        this.setState({tab : 'table',
                                        style_forListMenu : style_menu,
                                        style_forListTable : style_table
                                                      });
                                                   
              }} style = {this.state.style_forListTable} >
                  <i class="fa fa-table" aria-hidden="true"></i> &nbsp;&nbsp; Phòng Bàn</a>
              </li>
              <li role="presentation">
                  <a href="#tab"  onClick = {(e)=>{e.preventDefault()
                   var style_menu = {
                    backgroundColor :'#eb9898'
                   }
                   var style_table = {
                    backgroundColor : ''
                   }
                                         this.setState({tab : 'menu',
                                         style_forListMenu : style_menu,
                                         style_forListTable : style_table
  
                                      });
                                     
              }}style = {this.state.style_forListMenu} >
                  <i class="fa fa-list-alt" aria-hidden="true"></i> &nbsp;&nbsp;
                    Thực Đơn</a>
              </li>
          </ul>
      
          <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="home">
                {this.showTab()}
                {/* <Menu></Menu>
                <NumberTable/> */}
              </div>
              {/* <div role="tabpanel" class="tab-pane" id="tab">
              <MenuProduct></MenuProduct>
                <ListProduct/>
              </div> */}
          </div>
      </div>
      
			</div>

        

    );
  }
}

export default Tabs;