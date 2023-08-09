import { plugin, Messagetype } from 'alemon'
import axios from 'axios'
import _ from 'lodash'
import fs from 'fs'

export class Box extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: '配队分析2(.*)',
          fnc: 'Box'
        },
        {
          reg: /^百度TK\s+([\S]+)/,
          fnc: 'Box3'
        }
      ]
    })
  }
  async Box3(e: Messagetype) {
    const TK = /^百度TK\s+([\S]+)/
    const match = e.cmd_msg.match(TK)
    const partOfUrl = match[1]
    const yamlData = { partOfUrl }

    const yamlFileName = `${process
      .cwd()
      .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/config/TK.yaml`
    fs.writeFileSync(yamlFileName, JSON.stringify(yamlData, null, 2), 'utf-8')
    console.log('TK已保存')
    e.reply('TK已保存')
  }

  async Box(e: Messagetype) {
    const channelID = e.msg.channel_id
    const messageID = e.msg.id
    const data = await client.messageApi.message(channelID, messageID)
    const img = 'http://' + data.data.message.attachments[0].url
    console.log(img)

    const yamlFileName = `${process
      .cwd()
      .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/config/TK.yaml`
    const yamlData = fs.readFileSync(yamlFileName, 'utf-8')
    const parsedData = JSON.parse(yamlData)
    const TK = parsedData.partOfUrl
    const baiduurl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token='
    const apiurl = baiduurl + TK
    console.log(apiurl)
    main()
    async function main() {
      const options = {
        method: 'POST',
        url: baiduurl + TK,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        //参数
        data: {
          url: img,
          language_type: 'CHN_ENG'
        }
      }

      const response = await axios(options)
      console.log(response.data.words_result)
      interface TeamsData {
        [key: string]: { 配队: string[]; 介绍: string }
      }

      const teamsData: TeamsData = {
        物理双c: {
          配队: ['温妮弗雷德', '红弩箭', '泥鯭的士', '兔毛手袋'],
          介绍: '(物理队2c2辅，微控)'
        },
        控制木队: {
          配队: ['柏林以东', '泥鯭的士', '槲寄生', '苏芙比'],
          介绍: '奶位可换，吸血控制木队'
        },
        岩系单c队: {
          配队: ['温妮弗雷德', '皮克勒斯', '十四行诗', '新巴别塔'],
          介绍: '1c3辅'
        },
        铠苏柏: {
          配队: ['未锈铠', '苏芙比', '柏林以东', 'X'],
          介绍: '万金油队伍,X是可替换位'
        },
        纯反伤队: {
          配队: ['新巴别塔', '远旅', '气球派对', '弄臣'],
          介绍: '远旅（核心）'
        },
        永控流: {
          配队: ['五色月', '槲寄生', '泥鯭的士', 'X'],
          介绍: '清一色，永控流，X是可替换位'
        },
        星系暴击队: {
          配队: ['红弩箭', '远旅', '牙仙', 'X'],
          介绍: '红弩箭（可换其他暴击c），X是可替换位'
        },
        纯星系队: {
          配队: ['红弩箭', '远旅', '牙仙', '星梯'],
          介绍: '纯星系队'
        },
        精神万金油队: {
          配队: ['槲寄生', '兔毛手袋', '皮克勒斯', 'X'],
          介绍: '槲寄生输出控制 兔毛奶增伤控制 皮克勒斯驱散增伤，X是可替换位'
        },
        兽系现实: {
          配队: ['百夫长', '玛丽莲', '坎南特', 'X'],
          介绍: '百夫长主c输出减防 坎南特大招减防 玛丽莲副c控制减防，X是可替换位'
        },
        循环出手队: {
          配队: ['牙仙', '皮克勒斯', '星梯', 'X'],
          介绍: '无'
        },
        现实队: {
          配队: ['柏林以东', '红弩箭', '讣告人', '牙仙'],
          介绍: '现实队柏林（核心）➕任意现实主c红弩箭，百夫长，➕任意拐或奶，可选讣告人，皮克勒斯，牙仙，气球派对，兔毛手袋'
        },
        by笯鸦: {
          配队: ['红弩箭', '远旅', '十四行诗', '柏林以东'],
          介绍: '红弩箭对单输出，十四行诗仪式对群体清残血，远旅卡好出手次数有沉默，仪式减激情，加上诗宝的缴械，控制很足，觉得不稳给诗宝带个第二次生命时不时奶一下，远旅只出一级反制二级明昧就足够，柏林以东？别问，问就是打不过就开。by笯鸦'
        },
        输出拉满: {
          配队: ['温妮弗雷德', '梅兰妮', '红弩箭', '百夫长'],
          介绍: '(4c)'
        }
        // 更多配队数据
      }

      // 提供可能的角色名字列表
      const possibleCharacterNames = [
        '槲寄生',
        '红弩箭',
        '尼克·波顿',
        '小春雀儿',
        '未锈铠',
        '勿忘我',
        '苏芙比',
        'X',
        '玛丽莲',
        '弄臣',
        '冬',
        '芭妮芭妮',
        '狼群',
        '婴儿蓝',
        '夏利',
        '雾行者',
        '柏林以东',
        '帕米埃',
        '十四行诗',
        '气球派对',
        '星锑',
        '红斗篷',
        '无线电小姐',
        'APPLe',
        '斯奈德',
        '拉拉泉',
        '铅玻璃',
        '百夫长',
        'TTT',
        '星之眼',
        '莉拉妮',
        '约翰·提托',
        '讣告人',
        '五色月',
        '泥鯭的士',
        '丽莎&路易斯',
        '玛蒂尔达',
        '爱宠',
        '坦南特',
        '莫桑女士',
        '贝蒂',
        '吵闹鬼',
        '兔毛手袋',
        '远旅',
        '喀嚓喀嚓',
        '哒哒达利',
        '温妮弗雷德',
        '新巴别塔',
        '牙仙',
        '洋葱头',
        '斯普特尼克',
        '小梅斯梅尔',
        '埃里克',
        '门',
        '金蜜儿',
        '梅兰妮',
        '皮克勒斯',
        '挖掘艺术'
      ]
      function levenshteinDistance(str1: string, str2: string): number {
        const m = str1.length
        const n = str2.length
        const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

        for (let i = 0; i <= m; i++) {
          dp[i][0] = i
        }

        for (let j = 0; j <= n; j++) {
          dp[0][j] = j
        }

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1]
            } else {
              dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
            }
          }
        }

        return dp[m][n]
      }

      // 定义一个函数，用于找到最相似的角色名字
      function findBestMatchingName(targetName: string): string | undefined {
        let bestMatchName: string | undefined
        let bestMatchScore = Number.MAX_SAFE_INTEGER

        for (const possibleName of possibleCharacterNames) {
          const similarityScore = levenshteinDistance(targetName, possibleName) // 使用 Levenshtein 距离计算相似度
          if (similarityScore < bestMatchScore) {
            bestMatchName = possibleName
            bestMatchScore = similarityScore
          }
        }

        // 如果相似度超过某个阈值（可以根据具体情况调整），则返回匹配的名字，否则返回 undefined
        return bestMatchScore <= 2 ? bestMatchName : undefined
      }

      // Step 1: 筛选出与 possibleCharacterNames 中相似度较高的名字
      const matchingNames = response.data.words_result
        .map(wordResult => wordResult.words.trim()) // 确保去除空格
        .map(word => findBestMatchingName(word)) // 使用函数查找最相似的名字
        .filter(name => name !== undefined) as string[] // 过滤掉 undefined 的结果

      console.log(matchingNames)

      // 定义一个函数，用于找到匹配的队伍
      function findMatchingTeams(names: string[]): TeamsData[] {
        const matchingTeams: TeamsData[] = []
        for (const teamName in teamsData) {
          const teamCharacters = teamsData[teamName].配队
          const foundCharacters = teamCharacters.filter(name => names.includes(name))
          if (foundCharacters.length >= 3) {
            matchingTeams.push({
              [teamName]: {
                配队: foundCharacters,
                介绍: teamsData[teamName].介绍
              }
            })
          }
        }
        return matchingTeams
      }

      // 使用上面定义的函数找到匹配的队伍
      const matchingTeams = findMatchingTeams(matchingNames)

      const formattedResult = matchingTeams
        .map(team => JSON.stringify(team, null, 0).replace(/[{}[\]""]/g, ''))
        .join('\n')

      console.log('匹配的队伍数据：\n', formattedResult)
      e.reply('【配队推荐】：\n' + formattedResult)
      /**
       * 获取文件base64编码
       * @param string  path 文件路径
       * @return string base64编码信息，不带文件头
       */
      function getFileContentAsBase64(path: any) {
        const fs = require('fs')
        try {
          return fs.readFileSync(path, { encoding: 'base64' })
        } catch (err) {
          throw new Error(err)
        }
      }
    }
  }
}
