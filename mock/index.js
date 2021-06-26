const Mock = require('mockjs');
const delay = require('mocker-api/lib/delay')
const Random = Mock.Random

const param2Obj = url => {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }


let userList = []
const count = 60
for (let i = 0; i < count; i++) {
    userList.push(
      Mock.mock({
        "id": i+1,
        // 属性 userId 是一个5位的随机码
        "userId|5": "",
        "userName": "@cname(true)",
        "sex|1": [1, 2],
        "state|1": [1, 2],
        "interest|1": [1, 2, 3, 4, 5, 6, 7, 8],
        "birthday": "@date",
        "time": "@time",
        "address": "@county(true)",
      })
    );
}

const request = {
    'GET /api/user': {
        id: 1,
        username: "kenny",
        sex: 6
    },
    'POST /api/login': (req, res) => {
        console.log(req.body)
        const data = req.body
        if (data.username === 'admin' && data.password === 'admin') {
            res.json(Mock.mock({
                code: 0,
                message: '请求成功',
                data: {
                    token: 'adjgsubqwzxcas'
                }
            }))
        } else {
            res.json({
                code: 1,
                message: '请检查用户名和密码是否填写正确',
            })
        }
    },
    'GET /api/mock': Mock.mock({
        success: true,
        //随机生成一段中文
        message: '@cparagraph',
        // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
        'list|1-5': [{
            // 属性 sid 是一个自增数，起始值为 1，每次增 1
            'sid|+1': 1,
            // 属性 userId 是一个5位的随机码
            'userId|5': '',
        }]
    }),
    'GET /api/getUserList': (config, res) => {
        const {current, pageSize = 10} = param2Obj(config.url)
        const pageList = userList.filter((item, index) => index < pageSize * current && index >= pageSize * (current - 1))
        return res.json({
            code: 0,
            message: '获取用户列表成功',
            data: {
                list: pageList,
                total: userList.length
            },
            
        })
    },
    'POST /api/updateUser': (req, res) => {
        const { id } = req.body
        userList.some(u => {
            if (u.id == id) {
                Object.assign(u, req.body)
                return true
            }
        })
        res.json({
            code: 0,
            message: '更新成功'
        })
    },
    'POST /api/deleteUser': (req, res) => {
        const id = req.body.id
        userList = userList.filter(item => item.id != id)
        res.json({
            code: 0,
            message: '删除成功'
        })
    },
    'POST /api/insertUser': (req, res) => {
        const data = req.body
        let obj = {...data}
        obj.id = Random.guid()
        userList.push(obj)
        res.json({
            code: 0,
            message: '新增成功'
        })
    },
    'POST /api/batchDeleteUser': (req, res) => {
        const { ids } = req.body
        if (!ids || ids.length === 0) {
            res.json({
                code: 1,
                message: '参数id缺失'
            })
            return
        }
        userList = userList.filter(u => !ids.includes(u.id))
        res.json({
            code: 0,
            message: '批量删除成功'
        })
    },
    'GET /api/getUserDetail': (req, res) => {
        const { id } = param2Obj(req.url)
        if (!id) {
            res.json({
                code: 1,
                message: '参数Id缺失'
            })
            return
        }
        let userDetail = userList.filter(item => item.id == id)
        res.json({
            code: 0,
            data: userDetail,
            message: '获取用户详细信息成功'
        })
    },
    'GET /api/user/menu': (req, res) => {
        res.json({
            code: 0,
            data: [
                {
                    name: '仪表盘',
                    url: '/dashboard',
                    icon: 'DashboardOutlined',
                    affix: true
                },
                {
                    name: '列表管理',
                    url: '/list',
                    icon: 'UserOutlined',
                    children: [
                        {
                            name: '用户列表',
                            url: '/list/userList',
                            icon: 'MenuUnfoldOutlined',
                        }
                    ]
                },
                {
                    name: 'Echarts',
                    url: '/echarts',
                    icon: 'BarChartOutlined'
                },
                {
                    name: 'Animate',
                    url: '/animate',
                    icon: 'ShakeOutlined'
                },
                {
                    name: 'Test1',
                    url: '/test1',
                    children: [
                        {
                            name: 'TEST2',
                            url: '/test1/test2'
                        }
                    ]
                }
            ]
        })
    }
}
//数据会延迟1000毫秒获得
module.exports = delay(request, Random.integer(200, 1000))