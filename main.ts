import { createApps, getAppName, getAppProCoinfg } from 'alemonjs'
import { buildTools } from 'alemon-rollup'
const hello = await buildTools(
  getAppName(import.meta.url),
  getAppProCoinfg('dir')
)
const apps = createApps(import.meta.url)
apps.component(hello)
apps.mount()
console.log('[APP] a1999 启动')
