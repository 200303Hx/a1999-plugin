import { plugin, Messagetype } from 'alemon'
import fs from 'fs'
import jimp from 'jimp'
import { createCanvas, registerFont } from 'canvas'
import path from 'path'
export class fenxichouka1 extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^我的大保底概率/,
          fnc: 'fenxi1'
        }
      ]
    })
  }

  async fenxi1(e: Messagetype) {
    const userId = e.msg.author.id // 获取用户唯一标识
    analyzeAndDisplayStats()

    function analyzeAndDisplayStats() {
      const filePath = `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/抽卡分析/抽卡记录${userId}.json`
      const file2Data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

      const isSpecialSixStarNotWhale = true
      let hasSixStar = false

      const poolStats: {
        [key: string]: { totalPulls: number; sixStarPulls: number; misfitPulls: number }
      } = {}

      file2Data.reverse() // 从最下方的卡池开始遍历

      // 统计所有卡池的数据
      let totalPullsOverall = 0
      let sixStarPullsOverall = 0
      let misfitPullsOverall = 0

      file2Data.forEach(pool => {
        const poolName = pool.poolName

        // 排除“第一滴雨”和“于湖中央”卡池
        if (poolName !== '第一滴雨' && poolName !== '于湖中央') {
          const results = pool.results
          let specialSixStar = ''

          // 设置每个卡池的特殊六星（硬编码特殊六星的信息）
          if (poolName === '星的栖居') {
            specialSixStar = '远旅'
          } else if (poolName === '剑与盔的撕鸣') {
            specialSixStar = '未锈铠'
          } else if (poolName === '望族与隐士') {
            specialSixStar = '苏芙比'
          } else if (poolName === '流行即世界') {
            specialSixStar = '梅兰妮'
          } else if (poolName === '牧羊犬如是说') {
            specialSixStar = '皮克勒斯'
          } else if (poolName === '深林的絮语') {
            specialSixStar = '槲寄生'
          }

          let hasSixStarInPool = false
          let totalPullsInPool = 0
          let sixStarPullsInPool = 0
          let misfitPullsInPool = 0

          results.forEach(result => {
            totalPullsInPool++

            if (result.includes('6星')) {
              hasSixStar = true
              hasSixStarInPool = true
              sixStarPullsInPool++

              // 对其他卡池的特殊6星情况进行标记
              if (specialSixStar && result.includes(specialSixStar) && isSpecialSixStarNotWhale) {
                console.log(`${result.split('-')[0]} `)
              } else {
                misfitPullsInPool++
              }
            }
          })

          poolStats[poolName] = {
            totalPulls: totalPullsInPool,
            sixStarPulls: sixStarPullsInPool,
            misfitPulls: misfitPullsInPool
          }

          // 统计所有卡池的数据
          totalPullsOverall += totalPullsInPool
          sixStarPullsOverall += sixStarPullsInPool
          misfitPullsOverall += misfitPullsInPool
        }
      })

      // 输出总概率
      const overallSixStarProbability = (sixStarPullsOverall / totalPullsOverall) * 100
      const overallMisfitProbability = (misfitPullsOverall / sixStarPullsOverall) * 100

      /*


大保底概率图片合成


      */

      async function generateTextImage(text, ttffontPath, width, height) {
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')

        // 注册外部字体
        registerFont(ttffontPath, { family: 'MyFont' })

        // 绘制文字
        ctx.font = '264.67px MyFont'
        ctx.fillStyle = '#545454'
        ctx.textAlign = 'center' // 居中对齐文本
        ctx.fillText(text, width / 2, height / 2)

        // 将Canvas生成的Buffer转换为Node.js的Buffer类型
        const buffer = canvas.toBuffer()

        return buffer
      }

      async function selectGradeImage(overallMisfitProbability) {
        // 映射表，将大保底概率范围与对应的图片路径进行关联
        const gradeImageMap = {
          'SS': 'SS.png',
          'S': 'S.png',
          'A+': 'A+.png',
          'A': 'A.png',
          'B+': 'B+.png',
          'B': 'B.png',
          'C+': 'C+.png',
          'C': 'C.png'
        }

        let gradeImage
        if (overallMisfitProbability >= 0 && overallMisfitProbability < 10) {
          gradeImage = gradeImageMap['SS']
        } else if (overallMisfitProbability >= 10 && overallMisfitProbability < 20) {
          gradeImage = gradeImageMap['S']
        } else if (overallMisfitProbability >= 20 && overallMisfitProbability < 30) {
          gradeImage = gradeImageMap['A+']
        } else if (overallMisfitProbability >= 30 && overallMisfitProbability < 40) {
          gradeImage = gradeImageMap['A']
        } else if (overallMisfitProbability >= 40 && overallMisfitProbability < 50) {
          gradeImage = gradeImageMap['B+']
        } else if (overallMisfitProbability >= 50 && overallMisfitProbability < 60) {
          gradeImage = gradeImageMap['B']
        } else if (overallMisfitProbability >= 60 && overallMisfitProbability < 70) {
          gradeImage = gradeImageMap['C+']
        } else if (overallMisfitProbability >= 70 && overallMisfitProbability < 100) {
          gradeImage = gradeImageMap['C']
        } else {
          // 默认情况，当大保底概率超出映射表的范围时，默认为C.png
          gradeImage = gradeImageMap['C']
        }
        return gradeImage
      }

      async function addTextAndSpecialImagesToBackground(
        text,
        backgroundImagePath,
        fontPath,
        outputImagePath
      ) {
        try {
          // 使用 Jimp 读取背景图片
          const backgroundImage = await jimp.read(backgroundImagePath)
          // 根据大保底概率选择合适的图片路径
          const gradeImageFileName = await selectGradeImage(overallMisfitProbability)
          const gradeImagePath = path.join(
            `${process
              .cwd()
              .replace(
                /\\/g,
                '/'
              )}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/大保底/评级`,
            gradeImageFileName
          )

          // 使用 Jimp 读取评级图片
          const gradeImage = await jimp.read(gradeImagePath)

          // 设置评级图片的合成位置
          const gradeImageX = 966.2 // 替换为评级图片在背景图片上的 X 坐标
          const gradeImageY = 1583.7 // 替换为评级图片在背景图片上的 Y 坐标

          // 将评级图片合成在背景图片上
          backgroundImage.composite(gradeImage, gradeImageX, gradeImageY)

          // 生成包含文字的图片
          const textImageBuffer = await generateTextImage(text, ttffontPath, 1069, 400)

          // 使用 Jimp 读取文字图片
          const textImage = await jimp.read(textImageBuffer)

          // 设置文字图片的合成位置
          const textImageX = 217 // 替换为文字图片在背景图片上的 X 坐标
          const textImageY = 500 // 替换为文字图片在背景图片上的 Y 坐标

          // 将文字图片合成在背景图片上
          backgroundImage.composite(textImage, textImageX, textImageY)

          // 保存合成后的图片
          await backgroundImage.writeAsync(outputImagePath)
          console.log('图片合成成功！')
        } catch (error) {
          console.error('图片合成失败：', error)
        }
      }
      // 在图片上添加大保底概率文本并保存图片
      const textToPrint = `${overallMisfitProbability.toFixed(2)}%`
      const backgroundImagePath = `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/大保底/dbd.jpg` // 替换为背景图片路径
      const ttffontPath = `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/ttf/SourceHanSerifSC-VF.ttf` // 替换为外部字体文件的路径
      const outputImagePath = `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/img/抽卡分析/大保底/baodi.jpg`
      addTextAndSpecialImagesToBackground(
        textToPrint,
        backgroundImagePath,
        ttffontPath,
        outputImagePath
      )
      /*





      */
      // 读取新的JSON文件
      const newFilePath = `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/抽卡分析/抽卡记录2${userId}.json`
      const newFileData = JSON.parse(fs.readFileSync(newFilePath, 'utf8'))

      // 找到限定卡池的数据
      const limitedPoolData = newFileData.find(pool => pool.poolName === '限定池（其余卡池）')

      if (limitedPoolData) {
        const results = limitedPoolData.results
        let prevSixStarIndex = -1 // 上一个6星角色的索引

        // 对限定卡池的结果进行遍历
        results.forEach((result, index) => {
          const characterName = result.split('(')[0]
          const star = Number(result.match(/\d+/)) // 提取抽出的星级

          if (star === 6) {
            const matchingSixStarName = characterName
            if (matchingSixStarName) {
              if (prevSixStarIndex !== -1) {
                const interval = index - prevSixStarIndex
              }

              prevSixStarIndex = index
            } else {
              console.log(`${characterName} - 第${index + 1}抽（六星，但没有匹配到对应的名字）`)
            }
          }
        })
        // 分别统计 '第一滴雨' 和 '于湖中央' 卡池的信息
        let totalPullsFirstRain = 0
        let sixStarPullsFirstRain = 0
        let misfitPullsFirstRain = 0

        let totalPullsLakeCenter = 0
        let sixStarPullsLakeCenter = 0
        let misfitPullsLakeCenter = 0
        const filePath = `${process
          .cwd()
          .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/抽卡分析/抽卡记录${userId}.json`
        const file2Data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

        file2Data.forEach(pool => {
          const poolName = pool.poolName
          if (poolName === '第一滴雨' || poolName === '于湖中央') {
            const results = pool.results

            let hasSixStarInPool = false
            let totalPullsInPool = 0
            let sixStarPullsInPool = 0
            const misfitPullsInPool = 0

            results.forEach(result => {
              totalPullsInPool++

              if (result.includes('6星')) {
                const hasSixStar = true
                hasSixStarInPool = true
                sixStarPullsInPool++

                const characterName = result.split('(')[0]

                prevSixStarIndex = totalPullsInPool
                if (poolName === '第一滴雨') {
                  totalPullsFirstRain += totalPullsInPool
                  sixStarPullsFirstRain += sixStarPullsInPool
                  misfitPullsFirstRain += misfitPullsInPool
                } else if (poolName === '于湖中央') {
                  totalPullsLakeCenter += totalPullsInPool
                  sixStarPullsLakeCenter += sixStarPullsInPool
                  misfitPullsLakeCenter += misfitPullsInPool
                }
              }
            })
          }
        })
        if (totalPullsLakeCenter > 0) {
          const sixStarProbabilityLakeCenter = (sixStarPullsLakeCenter / totalPullsLakeCenter) * 100
        }
      }
    }
  }
}
