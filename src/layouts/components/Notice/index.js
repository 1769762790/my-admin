import React from 'react';
import { Badge, Tooltip, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import NoticeContent from './content'

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
];

const content = <NoticeContent data={data}/>;

const Notice = () => {
    return (
        <Dropdown 
            overlay={content} 
            placement="bottomRight" 
            trigger={['click']}>
                <Tooltip title="消息中心">
                    <div className='header-right__item'>
                            <Badge count={5} offset={[0, '-8px']}>
                                <BellOutlined />
                            </Badge>
                    </div>
                </Tooltip>
        </Dropdown>
    );
}
 
export default Notice
