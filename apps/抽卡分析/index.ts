import {
  plugin,
  sendImage,
  Messagetype,
  createApps,
  setMessage,
  BotType,
  BotConfigType
} from 'alemon'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

export class fenxichouka extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^https:\/\/game-re-service\.sl916\.com\/query\/summon\?userId=.*/,
          fnc: 'fenxi'
        }
      ]
    })
  }
  async fenxi(e: Messagetype) {
    const url = e.cmd_msg // 使用匹配到的内容作为 url
    const decodedUrl = url.replace(/&amp;/g, '&')
    // 发送GET请求获取网页内容
    console.log(decodedUrl)
    axios
      .get(decodedUrl)
      .then(response => {
        // 网页内容
        const html = response.data
        // 将网页内容保存为JSON文件
        fs.writeFile(
          path.resolve(__dirname, '../../db/抽卡分析/.user.id.json'),
          JSON.stringify(html),
          'utf-8',
          err => {
            if (err) {
              console.error('保存JSON文件出错:', err)
            } else {
              console.log('JSON文件保存成功！')

              // 读取JSON文件
              const jsonString = fs.readFileSync(
                path.resolve(__dirname, '../../db/抽卡分析/.user.id.json'),
                'utf-8'
              )
              try {
                // 解析 JSON
                const jsonData = JSON.parse(jsonString)
                // 提取卡池信息
                const pageData = jsonData.data.pageData
                if (Array.isArray(pageData)) {
                  // 创建对象来记录卡池名称及其统计数量
                  const poolStats = {}

                  // 映射关系：卡片名称和星级的映射

                  const cardNameMap = {
                    3003: { name: '槲寄生', star: '6星' },
                    3004: { name: '红弩箭', star: '6星' },
                    3005: { name: '尼克·波顿', star: '4星' },
                    3006: { name: '小春雀儿', star: '4星' },
                    3007: { name: '未锈铠', star: '6星' },
                    3008: { name: '勿忘我', star: '' },
                    3009: { name: '苏芙比', star: '6星' },
                    3010: { name: 'X', star: '5星' },
                    3011: { name: '玛丽莲', star: '5星' },
                    3012: { name: '弄臣', star: '3星' },
                    3013: { name: '冬', star: '4星' },
                    3014: { name: '芭妮芭妮', star: '4星' },
                    3015: { name: '狼群', star: '4星' },
                    3016: { name: '婴儿蓝', star: '5星' },
                    3017: { name: '夏利', star: '5星' },
                    3018: { name: '雾行者', star: '4星' },
                    3019: { name: '', star: '' },
                    3020: { name: '柏林以东', star: '5星' },
                    3021: { name: '', star: '' },
                    3022: { name: '帕米埃', star: '5星' },
                    3023: { name: '十四行诗', star: '5星' },
                    3024: { name: '气球派对', star: '5星' },
                    3025: { name: '星锑', star: '6星' },
                    3026: { name: '红斗篷', star: '4星' },
                    3027: { name: '无线电小姐', star: '2星' },
                    3028: { name: 'APPLe', star: '4星' },
                    3029: { name: '斯奈德', star: '5星' },
                    3030: { name: '拉拉泉', star: '3星' },
                    3031: { name: '铅玻璃', star: '4星' },
                    3032: { name: '百夫长', star: '6星' },
                    3033: { name: 'TTT', star: '4星' },
                    3034: { name: '星之眼', star: '3星' },
                    3035: { name: '莉拉妮', star: '3星' },
                    3036: { name: '约翰·提托', star: '3星' },
                    3037: { name: '讣告人', star: '5星' },
                    3038: { name: '五色月', star: '5星' },
                    3039: { name: '泥鯭的士', star: '6星' },
                    3040: { name: '丽莎&路易斯', star: '3星' },
                    3041: { name: '玛蒂尔达', star: '5星' },
                    3042: { name: '爱宠', star: '4星' },
                    3043: { name: '坦南特', star: '5星' },
                    3044: { name: '莫桑女士', star: '4星' },
                    3045: { name: '贝蒂', star: '3星' },
                    3046: { name: '吵闹鬼', star: '4星' },
                    3047: { name: '兔毛手袋', star: '6星' },
                    3048: { name: '远旅', star: '6星' },
                    3049: { name: '喀嚓喀嚓', star: '5星' },
                    3050: { name: '哒哒达利', star: '3星' },
                    3051: { name: '温妮弗雷德', star: '6星' },
                    3052: { name: '新巴别塔', star: '6星' },
                    3053: { name: '', star: '' },
                    3054: { name: '洋葱头', star: '3星' },
                    3055: { name: '斯普特尼克', star: '3星' },
                    3056: { name: '', star: '' },
                    3057: { name: '小梅斯梅尔', star: '4星' },
                    3058: { name: '埃里克', star: '4星' },
                    3059: { name: '门', star: '2星' },
                    3060: { name: '', star: '' },
                    3061: { name: '', star: '' },
                    3062: { name: '梅兰妮', star: '6星' },
                    3063: { name: '皮克勒斯', star: '6星' },
                    3064: { name: '挖掘艺术', star: '5星' }
                  }
                  // 其他 id 对应的卡片名称和星级
                  // 辅助函数：根据卡片id获取卡片信息
                  function getCardInfoById(cardId) {
                    return cardNameMap[cardId] || { name: '', star: '' }
                  }

                  // ...

                  // 循环遍历每个卡池对象
                  pageData.forEach(pool => {
                    const poolName = pool.poolName
                    const gainIds = pool.gainIds

                    // 检查卡池名称是否已存在于对象中
                    if (poolStats.hasOwnProperty(poolName)) {
                      // 如果已存在，则将当前卡池的星级数量叠加在一起
                      const currentStats = poolStats[poolName]
                      gainIds.forEach(id => {
                        const cardInfo = getCardInfoById(id)
                        const starLevel = cardInfo.star
                        if (starLevel === '6星') {
                          const cardName = cardInfo.name
                          currentStats[starLevel].count++
                          currentStats[starLevel].names.push(`${starLevel} (${cardName})`)
                        } else {
                          currentStats[starLevel]++
                        }
                      })
                    } else {
                      // 如果不存在，则创建新的卡池统计对象
                      const stats = {
                        '2星': 0,
                        '3星': 0,
                        '4星': 0,
                        '5星': 0,
                        '6星': { count: 0, names: [] }
                      }

                      // 统计当前卡池的星级数量
                      gainIds.forEach(id => {
                        const cardInfo = getCardInfoById(id)
                        const starLevel = cardInfo.star
                        if (starLevel === '6星') {
                          const cardName = cardInfo.name
                          stats[starLevel].count++
                          stats[starLevel].names.push(`${starLevel} (${cardName})`)
                        } else {
                          stats[starLevel]++
                        }
                      })

                      // 将卡池名称及其统计对象添加到 poolStats 中
                      poolStats[poolName] = stats
                    }
                  })

                  // 构建统计结果字符串
                  let result = '卡池统计结果:\n'

                  for (const poolName in poolStats) {
                    result += `${poolName}:\n`
                    const stats = poolStats[poolName]

                    for (const starLevel in stats) {
                      if (starLevel === '6星') {
                        const count = stats[starLevel].count
                        const names = stats[starLevel].names.join(', ')
                        result += `  ${names}\n`
                      } else {
                        const count = stats[starLevel]
                        result += `  ${starLevel}: ${count}个\n`
                      }
                    }
                  }

                  // 发送统计结果
                  e.reply(result)
                } else {
                  e.reply('数据格式不正确，无法提取卡池信息。')
                }
              } catch (error) {
                e.reply('解析 JSON 出错: ' + error.message)
              }
            }
          }
        )
      })
      .catch(error => {
        console.error('请求出错:', error)
      })
    return false
  }
}
