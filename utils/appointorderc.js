import {test_baseDomain} from "./test_baseDomain"

const addAppointOrderc = (params)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/appointorderc/add',
        method:"POST",
        data:params
      })
}
/**
 * 获得可接单的上门订单信息
 * @param {*} params 
 */
const getAppointOrdercByOptions = (params)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/appointorderc/filter/list',
        method:"POST",
        data:params
      })
}
/**
 * 更新上门订单信息
 * @param {*} params 
 */
const updateAppointOrderc = (params)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/appointorderc/saveorupdate',
        method:"POST",
        data:params
  })
}  

const getAppointOrdercDetail = (id)=>{
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/appointorderc/sample?id=${id}`
      })
}
module.exports={
  addAppointOrderc,
  getAppointOrdercByOptions,
  updateAppointOrderc,
  getAppointOrdercDetail
}