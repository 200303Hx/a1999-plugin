import { AppName } from './app.config'
import { PointMessageType } from './types'
import { createApps, setMessage, segment } from 'alemon'
/* 重定义e消息方法(非必须) */
//index.ts
setMessage(AppName, (e: PointMessageType) => {
  if (e.msg.user) {
    e.user = e.msg.user
  }
  return e
})
/** 创建插件应用 */
createApps(AppName)
