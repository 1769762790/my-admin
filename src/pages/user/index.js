import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginBg from '@/components/loginBg'
import './index.less'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './services'
import { _local } from '@/lib/storage'
import { setUserToken, setUserInfo } from '../../store/actions/user'


const Login = ({ match, location, history, setUserToken, setUserInfo }) => {
    const [loading, setLoading] = useState(false)
    const onFinish = values => {
        setLoading(true)
        login(values).then(res => {
            _local.set('token', res.data.token)
            setUserToken(res.data.token)
            setUserInfo('admin')
            setLoading(false)
            history.push('/dashboard')
            message.success('登录成功')
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    };
    return (
        <div className='login'>
            <div className='login-wrap'>
                <h1 className='login-wrap__title'>DEMO 管理系统</h1>
                <Form
                    name="normal_login"
                    className="login-wrap__form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" block>
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <LoginBg/>
    </div>
    )
}

export default connect(null, {
    setUserToken,
    setUserInfo
})(withRouter(Login))
