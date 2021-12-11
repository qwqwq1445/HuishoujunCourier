import {test_baseDomain} from "./test_baseDomain"

/**
 * 更新上门订单信息
 * @param {*} options 
 */
const getBucketByOptions = (options)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/bucket/filter/list`,
        method:"POST",
        data:options
      })
} 

const getBucketInfo = (id)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/bucket/sample?id=${id}`,
      })
} 

const updateBucket = (options)=>
{ 
  return wx.cloud.callContainer({
        path: test_baseDomain+'`/api/sys/core/bucket/saveorupdate`',
        method:"POST",
        data:options
      })
} 

module.exports={
  getBucketByOptions,
  getBucketInfo,
  updateBucket
}