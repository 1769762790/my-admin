import React from 'react';
import { Spin } from 'antd'
import './index.less'
//通用的过场组件
const loadingComponent =()=>{
    return (
        <div className='page-loading'>
            <Spin size='large' tip='加载中...'></Spin>
        </div>
    ) 
}
export default loadingComponent