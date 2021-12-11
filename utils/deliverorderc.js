import {test_baseDomain} from "./test_baseDomain"

const addDeliverOrderc = (params)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/deliverorderc/add',
        method:"POST",
        data:params
      })
}
/**
 * 获得可接单的上门订单信息
 * @param {*} params 
 */
const getDeliverOrdercByOptions = (params)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/deliverorderc/filter/list',
        method:"POST",
        data:params
      })
}
/**
 * 更新上门订单信息
 * @param {*} params 
 */
const updateDeliverOrderc = (params)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/deliverorderc/update',
        method:"POST",
        data:params
      })
} 
const getDeliverOrdercDetail = (id)=>
{
  return wx.cloud.callContainer({
        path: test_baseDomain+'/api/sys/core/deliverorderc/sample',
        method:"GET",
        data:id
      })
}
module.exports={
  addDeliverOrderc,
  getDeliverOrdercByOptions,
  updateDeliverOrderc,
  getDeliverOrdercDetail
}