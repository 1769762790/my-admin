import React, { useState, Fragment } from 'react';
import { Form, Input, Radio, Checkbox, Switch, Select, TimePicker, DatePicker, InputNumber, Cascader, Spin, Row, Col } from 'antd'
import Utils from '@/lib'
import { getSelectOptions } from './services'
import PropTypes from 'prop-types';
import './index.less'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const Password = Input.Password
const Group = Radio.Group
const CheckboxGroup = Checkbox.Group;

const { MonthPicker, RangePicker } = DatePicker;

// 模糊搜索组件
function RemoteSelect(props) {
    // 下拉选项
    const [data, setData] = useState([])
    // 是否显示spin
    const [fetching, setFetching] = useState(false)
     // 模糊搜索
     const fetchList = value => {
        setData([])
        setFetching(true)
        getSelectOptions(props.url).then(res => {
            setData(res.result.item_list || [])
        }).finally(() => {
            setFetching(false)
        })
    }
    const fetchOptions = Utils.debounce(fetchList, 800);
    return (
        <Select
            labelInValue
            allowClear
            {...props.attr}
            {...props.events}
            placeholder={'请选择' + props.label}
            notFoundContent={fetching ? <Spin size="small" /> : '无匹配数据'}
            filterOption={false}
            showSearch
            onSearch={fetchOptions}
        >
            {
                data.map((item, key) => <Option key={item.id}>{item.name}</Option>)
            }
        </Select>
    )
}
// 构建输入框类型
function genFormTemplates(props) {
    return (
        {
            input: <Input
                    allowClear
                    autoComplete='off'
                    {...props.attr}
                    {...props.events}
                    placeholder={'请输入'+ props.label} />,
            select: <Select autoComplete='off' placeholder={'请选择' + props.label} {...props.events} {...props.attr} allowClear>
                        {
                            props.options ? props.options.map((item, key) => <Option key={key} value={item.value}>{item.text}</Option>) : ''
                        }
                    </Select>,
            textarea: <TextArea autoComplete='off' placeholder={'请输入' + props.label} {...props.events} {...props.attr} />,
            password: <Password autoComplete='off' placeholder={'请输入' + props.label} {...props.events} {...props.attr} />,
            Switch: <Switch {...props.events} {...props.attr} />,
            timePicker: <TimePicker autoComplete='off' {...props.events} {...props.attr}/>,
            datePicker: <DatePicker autoComplete='off' {...props.events} {...props.attr}/>,
            monthPicker: <MonthPicker autoComplete='off' {...props.events} {...props.attr}/>,
            rangePicker: <RangePicker autoComplete='off' {...props.events} {...props.attr}/>,
            rangeTimePicker: <RangePicker autoComplete='off' showTime {...props.events} {...props.attr} />,
            inputNumber: <InputNumber {...props.events} {...props.attr} />,
            radio: <Group {...props.events} {...props.attr}>
                        {
                            props.options ?
                             props.options.map((item, key) => 
                            <Radio key={key} value={item.value}>{ item.text }</Radio>)
                            : null
                        }
                   </Group>,
            checkbox: <CheckboxGroup options={props.options || []} {...props.events} {...props.attr} />,
            cascader: <Cascader options={props.options} {...props.events} {...props.attr} />,
            remoteSelect: <RemoteSelect {...props} />
        }[props.type || 'input']
    )
}

/*
    config: [{
        type: 'select'|'input|'textarea'|'password'|'Switch'|'Checkbox', 表单类型
        key: '',                key
        label: '',              标签的文本
        rule: [],               校验规则
        initialValue: ''        默认值
        options: []             select选项
    }]
*/
function BaseForm (props) {
    const { config, layout, initialValues } = props
    // 构建FormItem
    const getFields = (config) => {
        // 获取显示搜索条件的长度 默认渲染8个查询条件组件，如果config长度没有8则取config长度渲染反之大于8则之渲染前8组数据 
        const count = props.expand ? config.length : (config.length > 8 ? 8 : config.length);
        let children = []
        if (Utils.dimensionArray(config) === 1) {
            for (let i = 0; i < count; i++) {
                children.push(
                    <Col xl={6} md={12} sm={24} key={config[i].key}>
                        <FormItem name={config[i].key} label={config[i].label} rules={config[i].rules}>
                            {
                                genFormTemplates(config[i])
                            }
                        </FormItem>
                    </Col>
                )
                
            }
        } else {
            children = config.map((item, key) => 
                <Fragment key={key}>
                    <Row gutter={[16, 16]}>
                        {
                            item.map((col, index) => 
                                <Col span={(24/item.length)} key={col.key}>
                                    <FormItem name={col.key} label={col.label} rules={col.rules}>
                                        {
                                            genFormTemplates(col)
                                        }
                                    </FormItem>
                                </Col>
                            )
                        }
                    </Row>
                </Fragment>
            )
        }
        return children
    }
    return (
        <Form
            initialValues={initialValues || {}}
            gutter={24}
            {...layout}
            form={props.form}
            validateMessages={validateMessages}
            onFinish={props.onFinish}>
            {/* {
                config.map((item, key) => 
                    <Fragment key={key}>
                        {
                            Utils.isArray(item) ? 
                            <Row gutter={[16, 16]}>
                                {
                                    item.map((col, index) => 
                                        <Col span={(24/item.length)} key={col.key}>
                                            <FormItem name={col.key} label={col.label} rules={col.rules}>
                                                {
                                                    genFormTemplates(col)
                                                }
                                            </FormItem>
                                        </Col>
                                    )
                                }
                            </Row> : 
                            <Row gutter={24}>
                                <Col span={4}>
                                    <FormItem name={item.key} label={item.label} rules={item.rules}>
                                        {
                                            genFormTemplates(item)
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                        }
                    </Fragment>
                )
            } */}
            {
                Utils.dimensionArray(config) === 1 ?
                <Row gutter={24}>
                    {
                        getFields(config)
                    }
                </Row> : getFields(config)
            }
            <Row style={{flexDirection: 'row-reverse'}}>
                <Col>
                    {
                        Utils.isArray(props.children) ?
                            props.children.map((child) => {
                                return renderChild(child)
                            }) :
                            props.children && 
                            renderChild(props.children)
                    }
                </Col>
            </Row>
        </Form>
    )
}
// 默认错误提示信息
const validateMessages = {
    required: "${label}是必选字段"
}

// 控制内容的分发
function renderChild (child) {
    // if (child.props.left) {
    //     return <div className="left" key="left">{child}</div>
    // } else if (child.props.right) {
    //     return <div className="right" key="right">{child}</div>
    // } else if (child.props.center) {
    //     return <div className="center" key="center">{child}</div>
    // }
    return child
}


// 默认值
BaseForm.defaultProps = {
    layout: {
        // labelCol: { span: 7 },
        wrapperCol: { span: 17 },
        layout: 'horizontal'
    }
}
// 参数类型
BaseForm.propTypes = {
    layout: PropTypes.object
}

export default BaseForm;