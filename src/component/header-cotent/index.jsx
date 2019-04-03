import React,{Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import { Row, Col,Modal } from 'antd';
import dayjs from 'dayjs';


import MyButton from '../button'
import './index.less'
import {reqWeather} from '../../api/index'
import memory from '../../storage/memory'
import {removeItem} from '../../storage/storage'
import menuList from '../../config/menu'
@withRouter
class HeaderContent extends Component{
    state={
        sysTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
         weather:'晴',
        weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png',
    }
    componentDidMount(){

        reqWeather('深圳')
        .then(res=>{
                this.setState({
                    weather:res.weather,
                    weatherImg:res.weatherImg
                })
            })
        this.intervalId= setInterval(()=>{
            this.setState({
                sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        },1000)
    }
    logout=()=>{
      Modal.confirm({
          title: '您确定要退出登录',
          okText:'确定',
          cancelText:'取消',
          onOk: () => {
              removeItem();
              memory.user = {}
              //返回登录界面
              this.props.history.replace('/login')
          },

          onCancel() {},
      });

    }
    componentWillUnmount() {
        // 清楚定时器
        clearInterval(this.intervalId);
    }
    getTitle=()=>{
        const {pathname}=this.props.location;
        for(let i=0;i<menuList.length;i++){
            const menu = menuList[i];
            const children = menu.children;
          if(children){
           for(let j=0;j<children.length;j++){
                let item=children[j]
               if(pathname===item.key){
                   return item.title
               }
           }
          }else {
              if(pathname===menu.key){
                  return menu.title
              }
          }

        }
    }
    render(){
        const title=this.getTitle();
        const username = memory.user.username;
        const{sysTime,weather,weatherImg}=this.state
        return <Fragment>
            <Row className="header-top"> <span>欢迎 {username}</span> <MyButton onClick={this.logout}>退出</MyButton></Row>
        <Row className="header-buttom"><Col span={6} className="header-buttom-left">{title}</Col>
            <Col span={18} className="header-buttom-right"><span>{sysTime}</span><img src={weatherImg} alt="天气"/><span>{weather}</span></Col>
        </Row>

            </Fragment>
    }
}
export default HeaderContent