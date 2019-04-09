import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router-dom'
import {
    Card,Button,Table,Icon,Input,Select,message
} from 'antd';
import MyButton from '../../component/button'
import {reqGetProduct} from "../../api";
import SaveUpdata from "./saveupdate";

const Option=Select.Option

export default class Class extends Component{
    state={
        products:[],
        total:0
    }
    getProducts=async (pageNum,pageSize=3)=>{
        const result=await reqGetProduct(pageNum,pageSize);
        if(result.status===0){
           this.setState({
               products:result.data.list,
               total:result.data.total,
           })
        }else{
            message.error('网络出错')
        }
    }
    componentDidMount(){
        this.getProducts(1)
    }
    render(){
        const {products,total}=this.state
        const columns = [
            {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
           },
            {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'age',
            },
            {
            title: '价格',
            dataIndex: 'price',
            key: 'address',
            },
            {
                title: '状态',
                // dataIndex: 'address',
                key: 'status',
                render:()=><div>
                    <Button type="primary">上架</Button>
                    &nbsp;&nbsp;<span>在售</span>
                </div>
            },
            {
                title: '操作',
                key:'operator',
                // dataIndex: 'address',
                render:text=><div>
                    <MyButton>修改</MyButton>
                </div>
            }
        ];

        return <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Card title={
                  <Fragment>
                    <Select  style={{width:200}} defaultValue={0}>
                    <Option  value={0}>根据商品名称</Option>
                    <Option  value={1}>根据商品描述</Option>
                </Select>
                    <Input placeholder="关键字" style={{width:200, margin:'0 10px'}}/>
                     <Button type="primary">搜索</Button>
                  </Fragment>
                 }
                      extra={<Link to="/product/saveupdate"><Button type="primary"><Icon type="plus" />添加产品</Button></Link>}
                >
                  <Table
                      columns={columns}
                      dataSource={products}
                      bordered
                      pagination={{
                          showSizeChanger:true,
                          pageSizeOptions:['3','4','5','6'],
                          defaultPageSize:3,
                          showQuickJumper:true,
                          total:total,
                          onChange:this.getProducts,
                          onShowSizeChange:this.getProducts
                      }}
                      rowkey="_id"
                  />
                </Card>
             </div>
    }
}