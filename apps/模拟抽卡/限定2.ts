import { plugin, Messagetype } from 'alemon'
import fs from 'fs'
import jimp from 'jimp'
import schedule from 'node-schedule'

const backgroundImagePath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/bg.png`
const folderPaths = [
  `${process
    .cwd()
    .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/6-lim2`,
  `${process
    .cwd()
    .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/5-lim2`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/4`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/3`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/2`
]

const outputFolderPath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/im`
const dbFolderPath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/模拟抽卡/drawCountMap-lim2.json`
const drawCountMapPath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/模拟抽卡/drawCountMap-lim2.json`
// 背景图的宽度和高度
const backgroundImageWidth = 1500
const backgroundImageHeight = 800

// 根据概率从选项数组中随机选择一个
function getRandomOption(options) {
  const totalProbability = options.reduce((sum, option) => sum + option.probability, 0)
  let random = Math.random() * totalProbability

  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    if (random < option.probability) {
      return option
    }
    random -= option.probability
  }
}

// 从指定路径的文件夹中随机选择一个文件
function getRandomFileFromFolder(folderPath, specificImage, specificImageProbability) {
  if (specificImage && Math.random() < specificImageProbability) {
    return specificImage
  }

  const files = fs.readdirSync(folderPath)
  const randomIndex = Math.floor(Math.random() * files.length)
  const randomFile = files[randomIndex]
  return `${folderPath}/${randomFile}`
}

// 合成图片
async function compositeImages() {
  try {
    const backgroundImage = await jimp.read(backgroundImagePath)
    backgroundImage.resize(backgroundImageWidth, backgroundImageHeight)

    const positions = [
      [160, 0],
      [310, 0],
      [460, 0],
      [610, 0],
      [760, 0],
      [590, 400],
      [740, 400],
      [890, 400],
      [1040, 400],
      [1190, 400]
    ]

    const options = [
      {
        folderPath: folderPaths[0],
        probability: 0.015,
        specificImage: `${folderPaths[0]}/6-13.png`,
        specificImageProbability: 0.5
      },
      {
        folderPath: folderPaths[1],
        probability: 0.085,
        specificImage: `${folderPaths[1]}/5-14.png`,
        specificImageProbability: 0.5
      },
      { folderPath: folderPaths[2], probability: 0.4 },
      { folderPath: folderPaths[3], probability: 0.45 },
      { folderPath: folderPaths[4], probability: 0.05 }
    ]

    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i]
      const randomOption = getRandomOption(options)
      const randomImage = getRandomFileFromFolder(
        randomOption.folderPath,
        randomOption.specificImage,
        randomOption.specificImageProbability
      )
      const image = await jimp.read(randomImage)

      // 调整图片尺寸，如果需要的话
      // image.resize(width, height);

      // 叠加图片
      backgroundImage.composite(image, x, y)
    }

    // 保存合成后的图片
    const outputFilePath = `${outputFolderPath}/十连up2.jpg`
    await backgroundImage.writeAsync(outputFilePath)
    console.log(`图片已保存至 ${outputFilePath}`)

    console.log('图片合成完成！')
  } catch (error) {
    console.error('发生错误：', error)
  }
}

export class up2 extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^\/十连up2$/,
          fnc: '十连up2'
        },
        {
          reg: /^\/单抽up2$/,
          fnc: '单抽up2'
        }
      ]
    })

    // 添加定时任务，在每天晚上12点删除配置文件
    schedule.scheduleJob('0 0 0 * * *', () => {
      fs.unlinkSync(dbFolderPath)
      console.log('配置文件已删除')
    })
  }

  async 单抽up2(e) {
    try {
      const options = [
        {
          folderPath: folderPaths[0],
          probability: 0.015,
          specificImage: `${folderPaths[0]}/6-13.png`,
          specificImageProbability: 0.5
        },
        {
          folderPath: folderPaths[1],
          probability: 0.085,
          specificImage: `${folderPaths[1]}/5-14.png`,
          specificImageProbability: 0.5
        },
        { folderPath: folderPaths[2], probability: 0.4 },
        { folderPath: folderPaths[3], probability: 0.45 },
        { folderPath: folderPaths[4], probability: 0.05 }
      ]

      const randomOption = getRandomOption(options)
      const randomImage = getRandomFileFromFolder(
        randomOption.folderPath,
        randomOption.specificImage,
        randomOption.specificImageProbability
      )
      const image = await jimp.read(randomImage)

      // 保存图片到目标文件夹
      const outputFilePath = `${outputFolderPath}/single_draw-up2.jpg`
      await image.writeAsync(outputFilePath)

      // 更新抽卡次数
      const drawCountMap = loadDrawCountMap()
      const userId = e.msg.author.id
      drawCountMap[userId] = (drawCountMap[userId] || 0) + 1
      saveDrawCountMap(drawCountMap)

      // 发送结果
      await e.sendImage(outputFilePath)
      e.reply(`<@!${userId}>，当前卡池：牧羊犬如是说\n今天已经抽了 ${drawCountMap[userId]} 次。`)
      console.log(`单抽图片已保存至 ${outputFilePath}`)
    } catch (error) {
      console.error('发生错误：', error)
    }
  }

  async 十连up2(e) {
    // 执行合成操作
    await compositeImages()

    // 更新抽卡次数
    const drawCountMap = loadDrawCountMap()
    const userId = e.msg.author.id
    drawCountMap[userId] = (drawCountMap[userId] || 0) + 10
    saveDrawCountMap(drawCountMap)

    // 发送结果
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/抽取中.gif`
    )
    await e.sendImage(`${outputFolderPath}/十连up2.jpg`)
    e.reply(`<@!${userId}>，当前卡池：牧羊犬如是说\n今天已经抽了 ${drawCountMap[userId]} 次。`)
    console.log(`十连图片已保存至 ${outputFolderPath}/十连up2.jpg`)
  }
}

function loadDrawCountMap() {
  try {
    const json = fs.readFileSync(dbFolderPath, 'utf-8')
    return JSON.parse(json)
  } catch (error) {
    console.error('读取抽卡次数映射文件失败:', error)
    return {}
  }
}

function saveDrawCountMap(drawCountMap) {
  try {
    const json = JSON.stringify(drawCountMap, null, 2)
    fs.writeFileSync(drawCountMapPath, json, 'utf-8')
  } catch (error) {
    console.error('保存抽卡次数映射文件失败:', error)
  }
}
