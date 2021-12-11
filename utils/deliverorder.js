import {test_baseDomain} from "./test_baseDomain"

/**
 * 获得可接单的投递订单信息
 * @param {*} options 
 */
const getDeliverOrderByOptions = (options)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/deliverorder/filter/list`,
        method:"POST",
        data:options,
      })
}
/**
 * 更新上门订单信息
 * @param {*} options 
 */
const updateDeliverOrder = (options)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/deliverorder/update`,
        method:"POST",
        data:options,
      })
} 

const getDeliverOrderDetail = (id)=>
{
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/deliverorder/sample?id=${id}`,
        method:"GET"
      })
}
module.exports={
  getDeliverOrderByOptions,
  updateDeliverOrder,
  getDeliverOrderDetail
}