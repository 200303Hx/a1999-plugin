import { plugin, sendImage, Messagetype } from 'alemon'
import path from 'path'

const K_菜单 = path.resolve(__dirname, '../../resources/assets/img/help/菜单.png')
export class show extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: '^/(重返未来|1999)(帮助|help|菜单)',
          fnc: '菜单'
        }
      ]
    })
  }

  async 菜单(e: Messagetype): Promise<boolean> {
    e.sendImage(K_菜单)
    return false
  }
}
