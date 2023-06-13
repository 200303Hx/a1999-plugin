import { plugin, sendImage, Messagetype } from 'alemon'
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
          fnc: 'juqing'
        },
        {
          reg: /^\/听力笔记$/,
          fnc: '听力笔记'
        }
      ]
    })
  }

  async juqing(e: Messagetype): Promise<boolean> {
    e.reply(
      '以下为剧情目录\n只需要复制下方目录命令@Bot就可以获取该小节的中英对照剧情辣！\n/TH.01-1\n/TH.01-2'
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
}
