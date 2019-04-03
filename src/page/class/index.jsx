import React, { Component ,Fragment} from 'react';
import {
    Layout,  Breadcrumb,
} from 'antd';

const {
    Content
} = Layout;

export default class Class extends Component{
    render(){
        return <Fragment>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                Class
            </div>
        </Fragment>
    }
}