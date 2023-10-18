import { screenshotByUrl } from 'alemonjs'
/**
 * vue
 * @param key 路由
 * @param params 参数
 * @returns
 */
export async function obtainingImages(key = '/', params?: any) {
  const img = await screenshotByUrl({
    url: `http://localhost:3000${key}`,
    params
  }).catch((err: any) => {
    console.error(err)
    return false
  })
  if (typeof img == 'boolean') {
    return '图片工具重启中...'
  }
  return img
}
