import {test_baseDomain} from "./test_baseDomain"

const getOpenId = (code)=>{
    return wx.cloud.callContainer({
      path:test_baseDomain+`/api/sys/core/courier/login?code=${code}`
    })
}


module.exports={
  getOpenId
}