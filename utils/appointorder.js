import {test_baseDomain} from "./test_baseDomain"

// const addAppointOrder=()=>{
//   return new Promise(
//     (resolve,reject)=>
//     {wx.request({
//     path: test_baseDomain+'/api/sys/core/appointorder/add',
//     method:"POST",
//     data:{
//       "addrNo": "string",
//       "courierName": "string",
//       "courierTel": "string",
//       "integration": 0,
//       "isClassified": 0,
//       "items": "string",
//       "orderId": "string",
//       "orderStatus": 0,
//       "senderAddress": "string",
//       "senderDateBegin": "2021-05-03T07:00:10.247Z",
//       "senderDateEnd": "2021-05-03T07:00:10.247Z",
//       "senderName": "string",
//       "senderRemark": "string",
//       "senderTel": "string",
//       "senderUrgent": 0,
//       "senderWeight": 0,
//       "time": "2021-05-03T07:00:10.247Z",
//       "userId": "string"
//     },
//     success:res=>
//     {
//       resolve(res);
//     },
//     fail:err=>
//     {
//       reject(err)
//       console.log("error")
//     }
//   })
// }
// )
// }


/**
 * 获得可接单的上门订单信息
 * @param {*} options 
 */
const getAppointOrderByOptions = (options)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/appointorder/filter/list',
        method:"POST",
        data:options
      })
    }
/**
 * 更新上门订单信息
 * @param {*} options 
 */
const updateAppointOrder = (options)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/appointorder/saveorupdate',
        method:"POST",
        data:options
      })
} 

const getAppointOrderDetail = (id)=>
{
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/appointorder/sample?id=${id}`
      })
}
module.exports={
  getAppointOrderByOptions,
  updateAppointOrder,
  getAppointOrderDetail
}