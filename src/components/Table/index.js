import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';
import { Resizable } from 'react-resizable';
import { Table, Button, Card, Form } from 'antd'
import { SearchOutlined, SyncOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import BaseForm from '../../components/BaseForm'
// import LineWrap from '../../components/LineWarp'
import { getTableData } from './services'
import PropTypes from 'prop-types';
import './index.less'

// 可伸缩列
const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props
    if (!width) {
        return <th {...restProps} />;
    }
    return (
        <Resizable
        width={width}
        height={0}
        handle={
            <span
            className="react-resizable-handle"
            onClick={e => {
                e.stopPropagation();
            }}
            />
        }
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
        >
        <th {...restProps} />
        </Resizable>
    )
}

const MixTable = (props) => {
    const [form] = Form.useForm(); // 搜索框实例
    const [expand, setExpand] = useState(false)
    const [params, setParams] = useState({})
    const [dataSource, setDataSource] = useState([]) // 表格数据
    const [isLoading, setIsLoading] = useState(false) // 表格loading
    const [pagination, setPagination] = useState({ // 分页参数
        current: 1,
        pageSize: 10,
        total: 0
    })
    const [columns, setColumns] = useState(props.columns) // 表格单元格配置
    const [sort, setSort] = useState({
        sortField: '',
        sortOrder: '',
    })
    const savedParams = useRef()
    // 触发查询表格数据发
    useEffect(() => {
        console.log({ ...sort, ...pagination })
        getTableList()
    }, [sort, pagination.current, pagination.pageSize])
    // 同步参数
    useEffect(()=>{
        savedParams.current = params
    },[params])
    // 查询表格数据方法
    const getTableList = () => {
        setIsLoading(true)
        getTableData(props.url, {
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...sort,
            ...savedParams.current
        }).then(res => {
            const data = res.data
            // 处理最后一页查询无数据自动查询上一页数据
            if (data.total % pagination.pageSize === 0 && data.list.length === 0) {
                setPagination({
                    ...pagination,
                    total: data.total,
                    current: pagination.current - 1
                })
                return
            }
            const list = props.handleResponseData(data.list)
            setDataSource(list)
            setPagination({
                ...pagination,
                total: data.total
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    // 搜索框校验之后的方法
    const onFinish = values => {
        setParams(values)
        getTableList()
    }
    // 重置搜索框参数值
    const resetFields = () => {
        form.resetFields()
        getTableList()
    }
    // 切换分页
    const handleTableChange = ({ current, pageSize, total }, filters, sorter) => {
        setPagination({
            current,
            pageSize
        })
        setSort({
            sortField: sorter.field,
            sortOrder: sorter.order
        })
    }
    // 拖拽列方法
    const handleResize = index => (e, { size }) => {
        setColumns(prev => {
            const nextColumns = [...prev];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return nextColumns
        })
    }
    // 拖拽列
    const resizableColumns = columns.map((col, index) => ({
        ...col,
        align: 'center', // table 内容居中
        onHeaderCell: column => ({
          width: column.width,
          onResize: handleResize(index),
        }),
        // render: col.render ? col.render : (text, record) => {
        //     return <LineWrap title={text} lineClampNum={1} />
        // }
    }));
    // 拖拽覆盖组件
    const resizableComponents = {
        header: {
          cell: ResizeableTitle,
        }
    }
  
    useImperativeHandle(props.tableRef, () => ({
        // 暴露给父组件的方法
        query: (params) => {
            getTableList()
        }
    }))
    // 控制内容的分发
    const renderChild = (child) => {
        // if (child.props.left) {
        //     return <div className="left" key="left">{child}</div>
        // } else if (child.props.right) {
        //     return <div className="right" key="right">{child}</div>
        // } else if (child.props.center) {
        //     return <div className="center" key="center">{child}</div>
        // }
        return child
    }
    return (
            <>
                <Card style={{marginBottom: '20px',background:'#fbfbfb'}}>
                    <BaseForm
                        layout={{...props.formLayout}}
                        config={[...props.forms]}
                        onFinish={onFinish}
                        form={form}
                        expand={expand}>
                            <Button type='primary' icon={<SearchOutlined/>} htmlType="submit">查询</Button>
                            <Button icon={<SyncOutlined />} onClick={resetFields}>重置</Button>
                            <a
                                style={{ fontSize: 12 }}
                                onClick={() => {
                                    setExpand(!expand);
                                }}
                            >
                                {expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收缩' : '展开'}
                            </a>
                    </BaseForm>
                </Card>
                <Card style={{marginBottom: '20px', background: '#fbfbfb'}}>
                    {
                        props.children && renderChild(props.children)
                    }
                </Card>
                <Table
                    {...props.attrs}
                    scroll={{ ...props.scroll }}
                    rowSelection={{...props.rowSelection}}
                    onChange={handleTableChange}
                    pagination={{...props.paginations, ...pagination}}
                    rowKey={(record, index) => index}
                    loading={{
                        spinning: isLoading,
                        tip: '正在加载中...'
                    }}
                    dataSource={dataSource} 
                    columns={resizableColumns}
                    components={resizableComponents}
                    >
                </Table>
            </>
            
    )
}


// 默认值
MixTable.defaultProps = {
    handleResponseData: (data) => data,
    paginations: {
        showTotal: (total) => {
            return `共${total}条`
        },
        showQuickJumper: true
    },
    attrs: {
        bordered: false
    }
}
// 参数类型
MixTable.propTypes = {
    handleResponseData: PropTypes.func,
    paginations: PropTypes.object,
    attrs: PropTypes.object
}
export default MixTable;