import { plugin, sendImage, Messagetype } from 'alemon'
import path from 'path'
import fs from 'fs'
import jimp, { read } from 'jimp'

const backgroundImagePath = path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/bg.png')
const folderPaths = [
  path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/6'),
  path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/5'),
  path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/4'),
  path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/3'),
  path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/2')
]

const outputFolderPath = path.resolve(__dirname, '../../resources/assets/img/模拟抽卡/im')
const dbFolderPath = path.resolve(__dirname, '../../db/模拟抽卡/drawCountMap.json')
const drawCountMapPath = path.resolve(__dirname, '../../db/模拟抽卡/drawCountMap.json')
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
    const backgroundImage = await read(backgroundImagePath)
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
      const image = await read(randomImage)

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
      const image = await read(randomImage)

      // 保存图片到目标文件夹
      const outputFilePath = `${outputFolderPath}/single_draw.jpg`
      await image.writeAsync(outputFilePath)

      // 更新抽卡次数
      const drawCountMap = loadDrawCountMap()
      const userId = e.msg.author.id
      drawCountMap[userId] = (drawCountMap[userId] || 0) + 1
      saveDrawCountMap(drawCountMap)

      // 发送结果
      await e.sendImage(outputFilePath)
      e.reply(`<@!${userId}>，当前卡池：于湖中央\n你已经抽了 ${drawCountMap[userId]} 次。`)
      console.log(`单抽图片已保存至 ${outputFilePath}`)
    } catch (error) {
      console.error('发生错误：', error)
    }
  }

  async 十连(e) {
    // 执行合成操作
    await compositeImages()

    // 更新抽卡次数
    const drawCountMap = loadDrawCountMap()
    const userId = e.msg.author.id
    drawCountMap[userId] = (drawCountMap[userId] || 0) + 10
    saveDrawCountMap(drawCountMap)

    // 发送结果
    e.reply('正在抽取中')
    await e.sendImage(`${outputFolderPath}/十连.jpg`)
    e.reply(`<@!${userId}>，当前卡池：于湖中央\n你已经抽了 ${drawCountMap[userId]} 次。`)
    console.log(`十连图片已保存至 ${outputFolderPath}/十连.jpg`)
  }
}

function loadDrawCountMap() {
  if (!fs.existsSync(dbFolderPath)) {
    fs.mkdirSync(dbFolderPath, { recursive: true })
  }

  const drawCountMapPath = path.resolve(__dirname, '../../db/模拟抽卡/drawCountMap.json')
  if (!fs.existsSync(drawCountMapPath)) {
    fs.writeFileSync(drawCountMapPath, '{}')
  }

  const drawCountMapContent = fs.readFileSync(drawCountMapPath, 'utf8')
  return JSON.parse(drawCountMapContent)
}

function saveDrawCountMap(drawCountMap) {
  fs.writeFileSync(drawCountMapPath, JSON.stringify(drawCountMap))
}
