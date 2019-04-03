import React, { Component } from 'react';
import {
    Layout, Menu,
} from 'antd';
import {Route} from 'react-router-dom'

import {getItem} from '../../storage/storage';
import memory from '../../storage/memory'
import LeftNav from '../../component/leftnav/index'
import Home from '../home/index'
import Class from '../class/index'
import Store from '../store/index'
import './index.less'
import HeaderContent from '../../component/header-cotent'
const {
    Header,  Footer, Sider,Content
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Admin extends Component{
    constructor(props){
        super(props);
        const user=getItem()
        if(!user){
          this.props.history.replace('/login')
        }
        //内存中存储用户信息
        memory.user=user;
    }
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render(){
        const {collapsed} = this.state;
        const opacity = collapsed ? 0 : 1;
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >

                <LeftNav opacity={opacity}/>
                </Sider>
                <Layout><Header className="header-d" style={{ background: '#fff', padding: 0, height:100}} >
                        <HeaderContent/>
                    </Header>
                    <Content style={{ margin: '20px 16px' }}>
                    < Route path="/home" component={Home} />
                    < Route path="/category" component={Class} />
                    < Route path="/product" component={Store} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )


    }
}