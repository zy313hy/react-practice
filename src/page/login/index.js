import React, { Component } from 'react';
import {
    Form, Icon, Input, Button
} from 'antd';

import logo from './logo.png'
import './index.less'

 @Form.create()
 class Login extends Component{
    login=(e)=>{
      e.preventDefault();
      this.props.form.validateFields((err,value)=>{
         if(!err){
             console.log(value)
         } else{
             console.log(err)
         }
      })
    }
    validator=(rule,value,callback)=>{
        const length=value && value.length;
        const pwdReg=/^[a-zA-Z0-9_]+$/
        if(!value){
            callback("必须输入密码");
        }else if(length<4){
            callback("密码要大于4位")
        }else if(length>12){
            callback("密码要大于12位")
        }else if(!pwdReg){
            callback('密码必须是英文、数组或下划线组成')
        }else {
            callback();
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
       return(
           <div className="login">
               <header className="login-header">
                   <img src={logo} alt="logo"/>
                   <h1>React项目：后台管理系统</h1>
               </header>
               <section className="login-content">
                       <h3>用户登录</h3>
                       <Form onSubmit={this.login} className="login-form">
                       <Form.Item>
                           {
                               getFieldDecorator('username',{
                                   rules:[{required:true,whitespace:true,message:'必须输入用户名'},
                                       {min:4 ,message:'用户名不能小于4'},
                                       {max:12,message:'用户名不能大于12'},
                                       {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}]
                               })( <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="username" placeholder="密码" />)
                           }

                       </Form.Item>
                       <Form.Item>
                           {
                               getFieldDecorator('password',{
                                   rules:[{validator:this.validator}]
                               })( <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)
                           }

                       </Form.Item>
                       <Form.Item>
                           <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
                           </Button>
                       </Form.Item>
                       </Form>
               </section>
           </div>
       )
    }
}
export default Login;