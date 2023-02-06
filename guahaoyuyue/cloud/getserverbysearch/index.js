// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
  return db.collection('doctor').where(db.command.or([{
      //使用正则查询，实现对‘address’字段的搜索的模糊查询
      name: db.RegExp({
        regexp: event.search,
        options: 'i', //大小写不区分
      }),
    },
    { //使用正则查询，实现对‘wlzname’字段的搜索的模糊查询
      brief: db.RegExp({
        regexp: event.search,
        options: 'i', //大小写不区分
      }),
    }
    //下面可以增加更多的选项,可以做多字段的选择
  ])).get()
}