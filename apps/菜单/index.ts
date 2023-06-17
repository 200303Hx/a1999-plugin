import { plugin, sendImage, Messagetype, segment } from 'alemon'
import path from 'path'
export class show extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: '^/(重返未来|1999)(帮助|help|菜单)',
          fnc: 'help'
        },
        {
          reg: /^\/剧情目录$/,
          fnc: '剧情'
        },
        {
          reg: /^\/听力笔记$/,
          fnc: '听力笔记'
        },
        {
          reg: /^\/抽卡分析$/,
          fnc: '抽卡分析'
        }
      ]
    })
  }

  async 剧情(e: Messagetype): Promise<boolean> {
    const obj = segment.reply(e.msg.id)
    e.reply(
      '以下为剧情目录\n只需要复制下方目录命令@Bot就可以获取该小节的中英对照剧情辣！\n/TH.01-1\n/TH.01-2',
      obj
    )
    return false
  }
  async help(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/help/菜单.png'))
    return false
  }
  async 听力笔记(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/help/听力笔记.jpg'))
    return false
  }
  async 抽卡分析(e: Messagetype): Promise<boolean> {
    e.reply(`<@!${e.msg.author.id}> `)
    e.reply(
      '〇下面为获取URL教程，at Bot+url即可获取抽卡分析，token失效快建议在单独自频道进行，可以保留数据。'
    )
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/help/抽卡分析.jpg'))

    return false
  }
}
