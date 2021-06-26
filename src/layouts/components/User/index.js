import React from 'react';
import { Dropdown, Menu } from 'antd'
import { UserOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import avatar from '../../../assets/avatar.png'
import { withRouter } from 'react-router-dom';
import { _local } from '../../../lib/storage';

const UserCenter = ({ match, location, history }) => {
    const handleUserClick = ({key}) => {
        console.log(key)
        if (key === '2') {
          history.push('/system/login')
          _local.clear()
        }
    }
    const menu = (
        <Menu onClick={handleUserClick}>
          <Menu.Item key="0">
            <UserOutlined/> 个人中心
          </Menu.Item>
          <Menu.Item key="1">
            <SettingOutlined /> 个人设置
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">
            <LoginOutlined /> 退出登录
          </Menu.Item>
        </Menu>
      );
    return (
        <Dropdown overlay={menu}>
            <div className='header-right__item'>
                <div className='avatar'>
                    <img src={avatar} alt='' /> admin
                </div>
            </div>
        </Dropdown>
    );
}
 
export default withRouter(UserCenter);