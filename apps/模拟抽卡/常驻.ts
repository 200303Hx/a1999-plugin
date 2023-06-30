import { plugin, sendImage, Messagetype } from 'alemon'
import fs from 'fs'
import jimp from 'jimp'
import schedule from 'node-schedule'

const backgroundImagePath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/bg.png`
const folderPaths = [
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/6`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/5`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/4`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/3`,
  `${process.cwd().replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/2`
]

const outputFolderPath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/模拟抽卡/im`
const dbFolderPath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/模拟抽卡/drawCountMap.json`
const drawCountMapPath = `${process
  .cwd()
  .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/db/模拟抽卡/drawCountMap.json`
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
      return option.folderPath
    }
    random -= option.probability
  }
}

// 从指定路径的文件夹中随机选择一个文件
function getRandomFileFromFolder(folderPath) {
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
      { folderPath: folderPaths[0], probability: 0.015 },
      { folderPath: folderPaths[1], probability: 0.085 },
      { folderPath: folderPaths[2], probability: 0.4 },
      { folderPath: folderPaths[3], probability: 0.45 },
      { folderPath: folderPaths[4], probability: 0.05 }
    ]

    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i]
      const randomFolder = getRandomOption(options)
      const randomImage = getRandomFileFromFolder(randomFolder)
      const image = await jimp.read(randomImage)

      // 调整图片尺寸，如果需要的话
      // image.resize(width, height);

      // 叠加图片
      backgroundImage.composite(image, x, y)
    }

    // 保存合成后的图片
    const outputFilePath = `${outputFolderPath}/十连.jpg`
    await backgroundImage.writeAsync(outputFilePath)
    console.log(`图片已保存至 ${outputFilePath}`)

    console.log('图片合成完成！')
  } catch (error) {
    console.error('发生错误：', error)
  }
}

export class chouka extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^\/十连$/,
          fnc: '十连'
        },
        {
          reg: /^\/单抽$/,
          fnc: '单抽'
        }
      ]
    })

    // Create a scheduled task to delete the draw count map file every night at 12 AM
    schedule.scheduleJob('0 0 0 * * *', () => {
      try {
        fs.unlinkSync(drawCountMapPath)
        console.log('Draw count map file has been deleted')
      } catch (error) {
        console.error('Error occurred while deleting the draw count map file:', error)
      }
    })
  }

  async 单抽(e) {
    try {
      const options = [
        { folderPath: folderPaths[0], probability: 0.015 },
        { folderPath: folderPaths[1], probability: 0.085 },
        { folderPath: folderPaths[2], probability: 0.4 },
        { folderPath: folderPaths[3], probability: 0.45 },
        { folderPath: folderPaths[4], probability: 0.05 }
      ]

      const randomFolder = getRandomOption(options)
      const randomImage = getRandomFileFromFolder(randomFolder)
      const image = await jimp.read(randomImage)

      const outputFilePath = `${outputFolderPath}/single_draw.jpg`
      await image.writeAsync(outputFilePath)

      const drawCountMap = loadDrawCountMap()
      const userId = e.msg.author.id

      // 判断结果是否包含文件夹6，如果是，则重置计数
      if (randomFolder === folderPaths[0]) {
        drawCountMap[userId] = 0
      } else {
        drawCountMap[userId] = (drawCountMap[userId] || 0) + 1
      }

      saveDrawCountMap(drawCountMap)

      await e.sendImage(outputFilePath)
      e.reply(`<@!${userId}>，当前卡池：于湖中央\n你已经抽了 ${drawCountMap[userId]} 次。`)
      console.log(`单抽图片已保存至 ${outputFilePath}`)
    } catch (error) {
      console.error('发生错误：', error)
    }
  }

  async 十连(e) {
    try {
      await compositeImages()

      const drawCountMap = loadDrawCountMap()
      const userId = e.msg.author.id

      // 判断合成图片的结果是否包含文件夹6，如果是，则重置计数
      const imagePaths = fs.readdirSync(outputFolderPath)
      const isReset = imagePaths.some(imagePath => imagePath.includes('6'))

      if (isReset) {
        drawCountMap[userId] = 0
      } else {
        drawCountMap[userId] = (drawCountMap[userId] || 0) + 10
      }

      saveDrawCountMap(drawCountMap)

      await e.sendImage(`${outputFolderPath}/十连.jpg`)
      e.reply(`<@!${userId}>，当前卡池：于湖中央\n你已经抽了 ${drawCountMap[userId]} 次。`)
      console.log('十连图片已发送')
    } catch (error) {
      console.error('发生错误：', error)
    }
  }
}

// 读取抽卡计数映射表
function loadDrawCountMap() {
  try {
    const data = fs.readFileSync(drawCountMapPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error occurred while loading draw count map:', error)
    return {}
  }
}

// 保存抽卡计数映射表
function saveDrawCountMap(drawCountMap) {
  try {
    const data = JSON.stringify(drawCountMap, null, 2)
    fs.writeFileSync(drawCountMapPath, data, 'utf-8')
    console.log('Draw count map has been saved')
  } catch (error) {
    console.error('Error occurred while saving draw count map:', error)
  }
}
