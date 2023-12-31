import {
  plugin,
  AMessage,
  createQrcode,
  getPathBuffer,
  getPluginHelp
} from 'alemonjs'
import fs from 'fs'
import jimp from 'jimp'

export class up extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^\/十连up$/,
          fnc: '十连up'
        },
        {
          reg: /^\/单抽up$/,
          fnc: '单抽up'
        }
      ]
    })
  }
  async 单抽up(e) {
    try {
      const drawCountMap = loadDrawCountMap()
      const userId = e.user_id

      // 单抽的逻辑，包括随机选择和处理抽卡结果
      const { randomFolder, randomImage } = await 单抽Logic()
      const image = await jimp.read(randomImage)
      const outputFilePath = `${outputFolderPath}/single_draw.jpg`
      await image.writeAsync(outputFilePath)

      // 添加抽到的文件名到抽卡次数映射中
      drawCountMap[userId] = drawCountMap[userId] || []
      drawCountMap[userId].push(randomImage)

      // 检查是否抽到了文件夹6的文件，如果是，重置抽卡次数并返回之前的抽卡次数
      if (randomFolder.folderPath === folderPaths[0]) {
        const previousDrawCount = drawCountMap[userId].length
        drawCountMap[userId] = [randomImage]
        const previousFolder6Draws = drawCountMap[userId].filter(
          file => file !== randomImage
        )
        drawCountMap[userId] = previousFolder6Draws

        saveDrawCountMap(drawCountMap)
        await e.reply(getPathBuffer(outputFilePath))
        e.reply(
          `<@!${userId}>，当前卡池：自由摇摆\n抽到了6星，所用抽数 ${previousDrawCount} 抽`
        )
        console.log(`单抽图片已保存至 ${outputFilePath}`)
      } else {
        saveDrawCountMap(drawCountMap)
        await e.reply(getPathBuffer(outputFilePath))
        e.reply(
          `<@!${userId}>，当前卡池：自由摇摆\n目前已经抽了 ${drawCountMap[userId].length} 次。`
        )
        console.log(`单抽图片已保存至 ${outputFilePath}`)
      }
    } catch (error) {
      console.error('发生错误：', error)
    }
  }

  async 十连up(e) {
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

    try {
      const drawCountMap = loadDrawCountMap()
      const userId = e.user_id
      let folder6DrawCount = 0 // 记录抽到文件夹6的抽数
      const imagePaths = [] // 用于保存十连的文件名
      const { randomFolder, randomImage } = await 单抽Logic()
      // 添加抽到的文件名到抽卡次数映射中
      drawCountMap[userId] = drawCountMap[userId] || []

      for (let i = 0; i < 10; i++) {
        const { randomFolder, randomImage } = await 单抽Logic()
        drawCountMap[userId].push(randomImage)
        imagePaths.push(randomImage)

        // 检查是否抽到了文件夹6的文件
        if (randomFolder.folderPath === folderPaths[0]) {
          folder6DrawCount = drawCountMap[userId].length
          drawCountMap[userId] = [randomImage]
          const previousFolder6Draws = drawCountMap[userId].filter(
            file => file !== randomImage
          )
          drawCountMap[userId] = previousFolder6Draws
        }
      }

      saveDrawCountMap(drawCountMap)

      const backgroundImage = await jimp.read(backgroundImagePath)
      backgroundImage.resize(backgroundImageWidth, backgroundImageHeight)

      for (let i = 0; i < imagePaths.length; i++) {
        const randomImage = imagePaths[i]
        const image = await jimp.read(randomImage)

        // 叠加图片
        const [x, y] = positions[i]
        backgroundImage.composite(image, x, y)
      }

      // 保存合成后的图片
      const outputFilePath = `${outputFolderPath}.jpg`
      await backgroundImage.writeAsync(outputFilePath)
      // 读取合成后的图像
      const shilian = await jimp.read(outputFilePath)

      // 降低图像质量
      shilian.quality(70) // 调整质量参数

      // 调整图像尺寸
      shilian.resize(1200, 600) // 调整图像宽度和高度

      // 保存压缩后的图像
      const compressedOutputFilePath = `${outputFolderPath}/十连up.jpg`

      await shilian.writeAsync(compressedOutputFilePath)

      console.log(`图片已保存至 ${compressedOutputFilePath}`)

      await e.reply(
        '',
        getPathBuffer(
          `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/抽取中.gif`
        ),
        '抽取中.gif'
      )
      console.log('图片合成完成！')
      await e.reply(getPathBuffer(compressedOutputFilePath))

      if (folder6DrawCount > 0) {
        e.reply(
          `<@!${userId}>，当前卡池：自由摇摆\n抽到了6星，所用抽数：${folder6DrawCount} 抽`
        )
      } else {
        e.reply(
          `<@!${userId}>，当前卡池：自由摇摆\n目前已经抽了 ${drawCountMap[userId].length} 次`
        )
      }
    } catch (error) {
      console.error('发生错误：', error)
    }
  }
}

function loadDrawCountMap() {
  try {
    const json = fs.readFileSync(dbFolderPath, 'utf-8')
    return JSON.parse(json)
  } catch (error) {
    saveDrawCountMap({}) // 创建一个空的抽卡次数映射文件
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
async function 单抽Logic() {
  const options = [
    {
      folderPath: folderPaths[0],
      probability: 0.015,
      specificImage: `${folderPaths[0]}/6-6.png`,
      specificImageProbability: 0.5
    },
    {
      folderPath: folderPaths[1],
      probability: 0.085,
      specificImage: `${folderPaths[1]}/5-8.png`,
      specificImageProbability: 0.5
    },
    { folderPath: folderPaths[2], probability: 0.4 },
    { folderPath: folderPaths[3], probability: 0.45 },
    { folderPath: folderPaths[4], probability: 0.05 }
  ]

  const randomFolder = getRandomOption(options)
  const randomImage = getRandomFileFromFolder(
    randomFolder.folderPath,
    randomFolder.specificImage,
    randomFolder.specificImageProbability
  )
  return { randomFolder, randomImage }
}

const backgroundImagePath = `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/bg.png`
const folderPaths = [
  `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/6-lim1`,
  `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/5-lim1`,
  `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/4`,
  `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/3`,
  `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/2`
]

const outputFolderPath = `./plugins/a1999-plugin/resources/assets/img/模拟抽卡/im`
const dbFolderPath = `./plugins/a1999-plugin/db/模拟抽卡/drawCountMap-lim1.json`
const drawCountMapPath = `./plugins/a1999-plugin/db/模拟抽卡/drawCountMap-lim1.json`
// 背景图的宽度和高度
const backgroundImageWidth = 1500
const backgroundImageHeight = 800

// 根据概率从选项数组中随机选择一个
function getRandomOption(options) {
  const totalProbability = options.reduce(
    (sum, option) => sum + option.probability,
    0
  )
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
function getRandomFileFromFolder(
  folderPath,
  specificImage,
  specificImageProbability
) {
  if (specificImage && Math.random() < specificImageProbability) {
    return specificImage
  }

  const files = fs.readdirSync(folderPath)
  const randomIndex = Math.floor(Math.random() * files.length)
  const randomFile = files[randomIndex]
  return `${folderPath}/${randomFile}`
}
