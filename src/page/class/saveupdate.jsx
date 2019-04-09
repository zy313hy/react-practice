import React, { Component } from 'react';
import {Card,Icon,Input,Form,Cascader,InputNumber,Upload,Button,message} from 'antd'
import {Link} from 'react-router-dom'
import './saveupdate.less'
import MyButton from "../../component/button";
import {reqDataList} from '../../api'

const Item=Form.Item
@Form.create()
 class SaveUpDate extends Component{
    constructor(props){
        super(props)
        this.state={
            options:[],
        }
    }
    getDataList=async(parentId)=>{
        const result=await reqDataList(parentId)
        //判断是一级还是二级分类
        if (result.status===0){
            if(parentId==='0'){
                this.setState({
                    options:result.data.map((item)=>{
                        return{
                            label:item.name,
                            value:item._id,
                            isLeaf:false
                        }
                    })
                })
            }
            else{
                this.setState({
                    options:this.state.options.map((option)=>{
                       if(option.value===parentId){
                           //说明找到修改分类
                           option.children=result.data.map((item)=>{
                              return{
                                  label:item.name,
                                  value:item._id
                              }
                           });
                           option.loading=false;
                           option.isLeaf=true;
                       }
                       return option;
                    })
                })
            }
        }else {
            message.error('网络出错')
        }
    }
    loadData=(selectedOptions)=>{
        const targetOption=selectedOptions[selectedOptions.length-1];
        targetOption.loading=true;
        this.getDataList(targetOption.value);
    }
    componentDidMount(){
      this.getDataList('0');
    }
    render(){
       const {options}=this.state
        const { getFieldDecorator}=this.props.form
        const formItemLayout = {
            //调整Item中label占据多少列
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            // 调整Item的内容占据多少列
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return(
            <Card title={<div className="saveupdate-title">
                <Link to="/product/index"><Icon type="arrow-left" className="saveupdate-Icon"/></Link>
                &nbsp;&nbsp;<span>添加商品</span>
            </div>}>
             <Form {...formItemLayout} onSubmit={this.submit}>
              <Item label="商品名称">
                  {getFieldDecorator('name',{
                      rules: [{required: true, whiteSpace: true, message: '商品名称不能为空'}]
                  })(<Input placeholder="请输入商品名称"/>)}

              </Item>
               <Item label="商品描述">
                     <Input placeholder="请输入商品描述" />
               </Item>
                 <Item label="选择分类" wrapperCol={{
                     xs: { span: 24 },
                     sm: { span: 4 },
                 }}>
                     <Cascader placeholder="请输入商品描述"
                      options={options}
                      onChange={this.onChange}
                       changeOnSelect
                       loadData={this.loadData}
                     />
                 </Item>
                   <Item label="商品价格" >
                   <InputNumber className="saveupdate-InputNumber"
                   formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                     onChange={this.onChange}/>
                  </Item>
                 <Item label="商品图片" >
                     <Upload   name="avatar"
                       listType="picture-card"
                       className="avatar-uploader"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={this.beforeUpload}
                         onChange={this.handleChange}>

                     </Upload>
                 </Item>
                 <Item>
                     <Button type="primary" htmlType="submit">提交</Button>
                 </Item>
             </Form>
            </Card>
        )
    }
}
export default SaveUpDate;