import {test_baseDomain} from "./test_baseDomain"

const getCourierInfo = (options)=>{
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/courier/filter/sample`,
        method:"POST",
        data:options
      })
}
const getCourierDetail = (id)=>
{
  return wx.cloud.callContainer({
        path: test_baseDomain+`/api/sys/core/courier/sample?id=${id}`,
        method:"GET"
      })
}

const saveOrUpdateCourier = (options)=>{
  return wx.cloud.callContainer({
        path: test_baseDomain+"/api/sys/core/courier/saveorupdate",
        method:'POST',
        data:options
  })
}
module.exports={
  getCourierInfo,
  getCourierDetail,
  saveOrUpdateCourier
}