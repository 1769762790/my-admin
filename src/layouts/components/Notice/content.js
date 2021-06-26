import React from 'react';
import { Tabs, List, Avatar } from 'antd';
import './content.less'
const { TabPane } = Tabs

const handleMsgClick  = (key) => {
    console.log(key);
}
const Notice = ({data}) => {
    return (
            <div className='notice'>
                <Tabs defaultActiveKey="1" onChange={handleMsgClick}>
                    <TabPane tab="通知(4)" key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item className='notice-item'>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language"
                            />
                        </List.Item>
                        )}
                    />
                    </TabPane>
                    <TabPane tab="消息(3)" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="代办(4)" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
    );
}
 
export default Notice;