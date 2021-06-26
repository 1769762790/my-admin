import React, { useRef, useState, memo } from 'react';
import { Button, Popconfirm, Modal, Form, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import MixTable from '@/components/Table'
import BaseForm from '@/components/BaseForm'
import moment from 'moment'
import { updateUser, deleteUser, addUser, batchDelUser } from '../services'



const UserList = (props) => {
    const [title, setTitle] = useState('新增')
    const [selectRows, setSelectRows] = useState([])
    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(null)
    const [form] = Form.useForm();
    const tableRef = useRef()
    const tableCols = [
        {
          title: '序号',
          width: 60,
          render:(text,record,index)=>`${index+1}`,
        },
        {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
            sorter: true,
            width: 100,
            render: (text, record) => <a onClick={() => getDetail(record)}>{text}</a>
          },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'id',
            width: 100,
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
          },
          {
            title: '状态',
            dataIndex: 'state',
            key: 'id',
            width: 100,
            render(state){
                return '咸鱼'
            }
          },
          {
            title: '爱好',
            dataIndex: 'interest',
            key: 'id',
            width: 100
          },
          {
            title: '生日',
            dataIndex: 'birthday',
            key: 'id',
            ellipsis: true
          },
          {
            title: '早起时间',
            dataIndex: 'time',
            key: 'id',
            ellipsis: true
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'id',
            ellipsis: true
          },
          {
              title: '操作',
              fixed: 'right',
              width: 230,
              render: (text, record) => {
                  return (
                    <>
                        <Button type="link" onClick={() => edit(text, record)} icon={<EditOutlined/>}>修改</Button>
                        <Popconfirm
                          title="确认删除?"
                          okText="确认"
                          cancelText="取消"
                          onCancel={() => handleCancel(record)}
                          onConfirm={() => handleConfirm(record)}>
                          <Button type="link" icon={<DeleteOutlined/>}>删除</Button>
                        </Popconfirm>
                    </>
                  )
              }
          }
      ]
      const forms = [
        {
          type: 'input',
          key: 'userName',
          label: '姓名'
        },
        {
          type: 'select',
          key: 'sex',
          label: '性别',
          options: [
              {
                  value: 1,
                  text: '男'
              },
              {
                  value: 2,
                  text: '女'
              }
          ]
        },
        {
          type: 'select',
          key: 'interest',
          label: '爱好',
          options: [
            {
              value: 1,
              text: 'NBA2K'
            },
            {
              value: 2,
              text: 'CSGO'
            },
            {
              value: 3,
              text: 'OW'
            },
            {
              value: 4,
              text: 'CF'
            },
            {
              value: 5,
              text: 'COD'
            },
            {
              value: 6,
              text: 'BAT'
            },
            {
              value: 7,
              text: 'LOL'
            },
            {
              value: 8,
              text: 'DOTA'
            },
          ]
        },
        {
          type: 'select',
          key: 'state',
          label: '状态',
          options: [
            {
              value: 1,
              text: '正常'
            },
            {
              value: 2,
              text: '非正常'
            }
          ]
        },
        {
          type: 'datePicker',
          key: 'birthday',
          label: '生日'
        },
        {
          type: 'timePicker',
          key: 'time',
          label: '早起时间'
        },
        {
          type: 'input',
          key: 'address',
          label: '住址'
        }
      ]
      const editForms = [
        [
          {
            type: 'input',
            key: 'userName',
            label: '姓名',
            rules: [{required: true}]
          },
          {
            type: 'select',
            key: 'sex',
            label: '性别',
            options: [
                {
                    value: 1,
                    text: '男'
                },
                {
                    value: 2,
                    text: '女'
                }
            ]
          }
        ],
        [
          {
            type: 'select',
            key: 'state',
            label: '状态',
            options: [
              {
                value: 1,
                text: '正常'
              },
              {
                value: 2,
                text: '非正常'
              }
            ]
          },
          {
            type: 'select',
            key: 'interest',
            label: '爱好',
            options: [
              {
                value: 1,
                text: 'NBA2K'
              },
              {
                value: 2,
                text: 'CSGO'
              },
              {
                value: 3,
                text: 'OW'
              },
              {
                value: 4,
                text: 'CF'
              },
              {
                value: 5,
                text: 'COD'
              },
              {
                value: 6,
                text: 'BAT'
              },
              {
                value: 7,
                text: 'LOL'
              },
              {
                value: 8,
                text: 'DOTA'
              },
            ]
          }
        ],
        [
          {
            type: 'datePicker',
            key: 'birthday',
            label: '生日'
          },
          {
            type: 'timePicker',
            key: 'time',
            label: '早起时间'
          },
        ],
        [
          {
            type: 'textarea',
            key: 'address',
            label: '住址',
            width: 200
          }
        ]
      ]
    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows)
            setSelectRows(selectedRows)
        }
    }
    const handleCancel = (record) => {
        message.success(`取消删除id:${record.id}`)
    }
    const handleConfirm = (record) => {
        deleteUser({ id: record.id}).then(res => {
          message.success(res.message)
          tableRef.current.query()
        })
    }
    // 修改
    const edit = (text, record) => {
        setTitle('修改')
        setVisible(true)
        const data = {...record}
        setId(data.id)
        data.time = moment(data.time, 'HH:mm:ss')
        data.birthday = moment(data.birthday)
        form.setFieldsValue(data)
    }
    //删除
    // const deleteRow = (text, record) => {
    //     confirm({
    //         title: '确定删除该数据吗？',
    //         icon: <ExclamationCircleOutlined/>,
    //         content: JSON.stringify(record),
    //         onOk() {
    //             message.success('删除成功')
    //             tableRef.current.query()
    //         },
    //         onCancel(){
    //             message.warning('已取消删除')
    //         }
    //     })
    // }
    const handleOk = () => {
      console.log(form)
      form.validateFields().then(values => {
        if (title === '修改') {
          updateUser({...values, id}).then(res => {
            console.log(res)
            message.success('修改成功')
            setVisible(false)
            tableRef.current.query()
          })
        } else {
          addUser({...values}).then(res => {
            console.log(res)
            message.success('新增成功')
            setVisible(false)
            tableRef.current.query()
          })
        }
      }).catch(e => console.log(e))
    }
    const handleFinish = values => {
      console.log(values)
    }
    // 新增
    const insertUser = () => {
      setTitle('新增')
      setVisible(true)
      form.resetFields()
    }
    // 批量删除
    const batchDel = () => {
      if(!selectRows.length) {
        return message.warning('请选择数据！')
      }
      const ids = selectRows.map(item => item.id)
      console.log(ids)
      batchDelUser({ids}).then(res => {
        if (res.code === 0) {
          message.success(res.message)
          tableRef.current.query()
        }
      })
    }
    // 查看用户详细信息
    const getDetail = (data) => {
      console.log(data)
      console.log(props)
      props.history.push('/list/userList/' + data.id)
    }
    return (
        <div>
            <MixTable 
            url='/getUserList'
            tableRef={tableRef}
            scroll={{ x: 1300, y: 700 }}
            rowSelection={rowSelection}
            forms={forms}
            formLayout={{
              labelCol: {
                flex: "0 0 80px"
              },
            //   wrapperCol: {
            //     flex: "auto"
            //   }
            }}
            columns={tableCols}
            >
              <>
                <Button type='primary' icon={<PlusOutlined />} onClick={insertUser}>新增</Button>
                <Button type='danger' icon={<DeleteOutlined />} onClick={batchDel}>批量删除</Button>
              </>
            </MixTable>
            <Modal 
              title={title} 
              onCancel={() => {
                setVisible(false)
              }}
              onOk={handleOk}
              visible={visible}>
                <BaseForm
                  form={form}
                  layout={{
                    labelCol: {
                      flex: "0 0 80px"
                    },
                    // wrapperCol: {
                    //   flex: "auto"
                    // }
                  }}
                  onFinish={handleFinish}
                  config={editForms}>
                </BaseForm>
              </Modal>
              <div>
              {/* <RenderRoutes routes={props.routes}/> */}
              </div>
        </div>
    );
}
 
export default memo(UserList);