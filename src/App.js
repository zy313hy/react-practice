import React, { Component } from 'react';
import {Switch,Redirect,Route} from 'react-router-dom'

import Login from './page/login/index'
import Admin from './page/admin/index'
import './set/less/reset.less'

export default class App extends Component {
  render() {
    return (
        <Switch>
        < Route path="/login" component={Login}/>
            {/* 为了开发login组件设计的 */}
          {/*<Redirect to="/login"/>*/}
         <Route path="/" component={Admin}/>

        </Switch>
    );
  }
}


