import { plugin, Messagetype } from 'alemon'
import fs from 'fs'
import { createCanvas, registerFont } from 'canvas'
import Jimp from 'jimp'

export class fenxichouka2 extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^抽卡分析/,
          fnc: 'fenxi2'
        }
      ]
    })
  }

  async fenxi2(e: Messagetype) {
    const userId = e.msg.author.id // 获取用户唯一标识
    const imageFilePath = `${process
      .cwd()
      .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/fenxi.jpg`

    // 设置自定义字体路径
    const fontPath = `${process
      .cwd()
      .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/ttf/SourceHanSerifSC-VF.ttf`

    // 注册自定义字体
    registerFont(fontPath, { family: 'CustomFont' })

    // 读取新的JSON文件
    const newFilePath = `${process
      .cwd()
      .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/抽卡分析/抽卡记录2${userId}.json`
    const newFileData = JSON.parse(fs.readFileSync(newFilePath, 'utf8'))

    // 处理限定池数据
    const limitedPoolData = processGachaPoolData(newFileData, '限定池（其余卡池）')
    // 处理常驻池数据
    const standardPoolData = processGachaPoolData(newFileData, '常驻池（于湖中央）')
    // 处理新手池数据
    const novicePoolData = processGachaPoolData(newFileData, '新手池（滴一滴雨）')

    // 创建 canvas 用于自定义字体绘制
    const canvas = createCanvas(1414, 20000)
    const ctx = canvas.getContext('2d')

    // 设置字体样式
    ctx.font = '56px CustomFont' // 使用自定义字体
    ctx.fillStyle = '#D9D9D9'

    // 在 canvas 上绘制文本
    ctx.fillText(limitedPoolData, 153, 687)
    ctx.fillText(standardPoolData, 565, 687)
    ctx.fillText(novicePoolData, 1005, 687)

    // 将 canvas 保存为文本图片
    const textImagePath = `${process
      .cwd()
      .replace(
        /\\/g,
        '/'
      )}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/text_image.png`
    const textImageStream = fs.createWriteStream(textImagePath)
    const textImageBuffer = canvas.toBuffer('image/png')
    textImageStream.write(textImageBuffer)
    textImageStream.end()
    // 读取背景图片
    Jimp.read(imageFilePath, async (err, image) => {
      if (err) {
        console.error('Error reading the background image:', err)
        return
      }

      // 读取文本图片
      const textImage = await Jimp.read(textImageBuffer)

      // 在图片上合成文本图片，使用 BLEND_SOURCE_OVER 模式确保覆盖合成
      image.composite(textImage, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 1,
        opacityDest: 1
      })
      // 保存修改后的图片
      image.write(
        `${process
          .cwd()
          .replace(
            /\\/g,
            '/'
          )}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/choukafenxi.jpg`
      )
    })
    e.sendImage(
      `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/choukafenxi.jpg`
    )

    function processGachaPoolData(data, poolName) {
      const poolData = data.find(pool => pool.poolName === poolName)

      if (poolData) {
        const results = poolData.results
        let prevSixStarIndex = -1 // 上一个6星角色的索引
        let hasSixStar = false // 是否有6星角色
        let totalPulls = 0 // 总抽数
        let sixStarCount = 0 // 6星角色数量
        let analysisResultText = '' // 用于保存分析结果的文本

        // 对池子的结果进行遍历
        results.forEach((result, index) => {
          const characterName = result.split('(')[0]
          const star = Number(result.match(/\d+/)) // 提取抽出的星级
          totalPulls++

          if (star === 6) {
            sixStarCount++
            const matchingSixStarName = characterName
            if (matchingSixStarName) {
              // 在这里输出六星角色名字和对应的抽出次数
              analysisResultText += `${characterName}\n`

              if (prevSixStarIndex !== 0) {
                const interval = index - prevSixStarIndex
                analysisResultText += `${interval}抽\n`
              }

              prevSixStarIndex = index
              hasSixStar = true
            } else {
              analysisResultText += `${characterName}\n`
            }
          }
        })

        // 如果没有6星角色
        if (!hasSixStar) {
          analysisResultText += `暂无六星\n`
        }

        // 计算6星概率
        const sixStarProbability = (sixStarCount / totalPulls) * 100
        analysisResultText += `抽数:${totalPulls}\n概率:${sixStarProbability.toFixed(2)}%\n`

        return analysisResultText
      } else {
        // 如果没有找到对应池子的数据
        return '无'
      }
    }
  }
}
