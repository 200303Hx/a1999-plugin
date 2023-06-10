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
          reg: /^\/听力笔记$/,
          fnc: '听力笔记'
        }
      ]
    })
  }

  async help(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/help/菜单.jpg'))
    return false
  }
  async 听力笔记(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/help/听力笔记.jpg'))
    return false
  }
}
