export default {
    formateDate(time) {
        if (!time) return ''
        let date = new Date(time)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    },
    isArray(arg) {
        if (!Array.isArray) {
            Array.isArray = function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        } else {
            return Array.isArray(arg)
        }
    },
    debounce(fn, wait = 50, immediate) {
        let timer = null;
        return function(...args) {
            if(timer) clearTimeout(timer)
            if(immediate && !timer) {
                fn.apply(this, args)
            }
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    },
    dimensionArray(arr) {
        if(arr instanceof Array) {
            return Math.max(...arr.map(e => {
                return 1 + parseInt(this.dimensionArray(e))
            }))
        } else {
            return 0
        }
    },
    // 根据某个属性值从MenuList查找拥有该属性值的menuItem
    getMenuItemInMenuListByProperty(menuList, key, value) {
        let stack = [];
        stack = stack.concat(menuList);
        let res;
        while (stack.length) {
            let cur = stack.shift();
            if (cur.children && cur.children.length > 0) {
                stack = cur.children.concat(stack);
            }
            if (value === cur[key]) {
                res = cur;
            }
        }
        return res;
    },
    // 数组去重
    uniqueArr(arr) {
        let newArr = []
        let obj = {}
        arr.forEach(item => {
          if (typeof item !== 'object') {
            if (newArr.indexOf(item) === -1) {
              newArr.push(item)
            }
          } else {
            let str = JSON.stringify(item)
            if (!obj[str]) {
              newArr.push(item)
              obj[str] = 1
            }
          }
        })
        return newArr
      }
}