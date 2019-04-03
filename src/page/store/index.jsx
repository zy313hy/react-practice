import React, { Component,Fragment } from 'react';
import {
 Table
} from 'antd';




export default class Store extends Component{

    render(){
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Cash Assets',
            className: 'column-money',
            dataIndex: 'money',
        }
        ];

        const data = [{
            key: '1',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            money: '￥1,256,000.00',
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            money: '￥120,000.00',
            address: 'Sidney No. 1 Lake Park',
        }];
        return <Fragment>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered

                />
            </div>
         </Fragment>
    }
}