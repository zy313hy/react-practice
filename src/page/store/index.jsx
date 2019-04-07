import React, { Component,Fragment } from 'react';

import {
 Table,Card,Icon,Button,message,Modal
} from 'antd';

import {reqDataList,reqAddDataList,reqUpdateCategoryName} from '../../api'
import MyButton from "../../component/button";
import './index.less';
import AddDataListForm  from  './add-datalist-form'
import UpdateDataListsNameForm from './update-datalist-name-form'


export default class Store extends Component{
    constructor(props){
        super(props);
       this.state={
            dataLists:[],
            isShowAddCategoryModal:false,
            isShowUpdateCategoryModal:false,
           dataList:{},
           parentCategory:{}

        }
        this.createAddForm=React.createRef()
        this.createUpdateForm=React.createRef()
    }

    //请求分类数据的方法
    getDataLists=async  (parentId)=>{
        const result=await reqDataList(parentId);
        if(result.status===0){ this.setState({
            dataLists:result.data
        }) }
        else {
            message.error(result.msg)
        }
    }
    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            className:'operator',
            //dataIndex: 'operator',
            render: dataLiist => <div>
                <MyButton >修改名称</MyButton>
                <MyButton>查看子品类</MyButton>
            </div>
        }
    ];
    // showUpdateCategoryNameModal=(dataList)=>{
    //     return()=>{
    //         this.setState({
    //             dataList
    //         })
    //         this.changeModal('isShowUpdateCategoryNameModal', true)();
    //     }
    // }
    componentDidMount(){
        this.getDataLists('0')
    }
    changeModal=()=>{
            this.setState({
                isShowAddCategoryModal:true,
            })
    }


    addCategory = (e) => {
        console.log(e);
        this.setState({
            isShowAddCategoryModal: false,
        });
        const {validateFields}=this.createAddForm.current.props.form;
        validateFields(async (err,values)=>{
            if(!err){
                const{parentId,categoryName}=values;
                const result=await reqAddDataList(parentId,categoryName);
                if (result.status === 0) {
                    message.success('添加分类成功~');
                    // 在table中显示添加的分类数据
                    // 方式一：重新请求所有数据然后更新
                    // 方式二：将返回值插入到数据更新 --> 减少请求
                    // 隐藏对话框、提示添加分类成功
                    // 如果当前在一级分类，添加的是一级分类数据，要显示。添加的是二级分类数据，不显示
                    // 如果当前在二级分类，添加的是一级分类数据，要插入原数据中，添加的是二级分类数据，并且与当前一级分类相同的，才显示
                    if (parentId === '0') {
                        this.setState({
                            isShowAddCategoryModal: false,
                            dataLists: [...this.state.dataLists, result.data]
                        })
                    } else if (parentId === this.state.parentCategory._id) {
                        this.setState({
                            isShowAddCategoryModal: false,
                            subCategories: [...this.state.subCategories, result.data]
                        })
                    }
                } else {
                    message.error(result.msg);
                }
            } else {
                // 校验失败 -- 啥也不做
            }

        })

    }


    addCategoryCancel=()=>{
        this.setState({
            isShowUpCategoryModal: false,
        });
    }
    addCategoryCancel = (e) => {
        console.log(e);
        this.setState({
            isShowAddCategoryModal: false,
        })

    };
    //修改分类名称

    render(){
         const {dataLists,isShowAddCategoryModal,isShowUpCategoryModal}=this.state

        return <Fragment>
            <Card
                className="category"
                title="品类分类管理"
                extra={<Button type="primary" onClick={this.changeModal} ><Icon type="plus" />More</Button>}
                style={{  }}>
                <Table
                    columns={this.columns}
                    dataSource={dataLists}
                    bordered
                    pagination={{
                        showSizeChanger:true,
                        pageSizeOptions:['3','4','5','6'],
                        defaultPageSize:3,
                        showQuickJumper:true,
                    }}
                    rowkey="_id"
                />
                <Modal
                    title="添加分类"
                    visible={isShowAddCategoryModal}
                    onOk={this.addCategory}
                    onCancel={this.addCategoryCancel}
                    okText="确认"
                    cancelText="取消"
                    width={500}>
                    <AddDataListForm categories={dataLists} wrappedComponentRef={this.createAddForm}/>
                </Modal>


            </Card>
         </Fragment>
    }
}