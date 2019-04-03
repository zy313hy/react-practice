import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'
import { Menu,  Icon
} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menu'
import logo from '../../set/logo.png'
const SubMenu = Menu.SubMenu;

@withRouter
class LeftNav extends Component{
    static propTypes = {
        opacity: PropTypes.number.isRequired
    }
    constructor(props){
        super(props);
        const openKeys=[];
        this.menus=this.createMenu(menuList,openKeys);
    }
     createItem(item){
        return <Menu.Item key={item.key}>
            <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
            </Link>
        </Menu.Item>
     }
     createMenu(menuList,openKeys){
       const{pathname}=this.props.location
       return menuList.map((menu)=>{

           if(menu.children){

             return  <SubMenu
                 key={menu.key}
                 title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}
             > { menu.children.map((item)=>{
                 if(pathname===item.key){
                     openKeys.push(menu.key)
                 }
                 return this.createItem(item)
             })}
             </SubMenu>
           }else {
              return this.createItem(menu)
           }
       })
    }
    render(){
        const {location:{pathname},opacity}=this.props
        return (<Fragment>
            <div className="logo" >
                <img src={logo} alt="logo"/>
                <h2 style={{opacity}}>硅谷后台</h2>
            </div>

        <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
            {this.menus}
        </Menu>
        </Fragment>)
    }
}
export default LeftNav