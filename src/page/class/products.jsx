import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import Index from './index'
import SaveUpDate from './saveupdate'
 export default class Products extends Component{
    render(){
        return(
          <Switch>
              <Route path="/product/index" component={Index}></Route>
              <Route path="/product/detail"></Route>
              <Route path="/product/saveupdate" component={SaveUpDate}></Route>
              <Redirect to="/product/index"></Redirect>
          </Switch>
        )
    }
}