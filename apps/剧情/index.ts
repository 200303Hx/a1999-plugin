import { plugin, Messagetype } from 'alemon'
import path from 'path'

export class showJ extends plugin {
  constructor() {
    super({
      rule: [
        //听力笔记
        {
          reg: /^\/TH.01-1$/,
          fnc: 'J1'
        },
        {
          reg: /^\/TH.01-2$/,
          fnc: 'J2'
        }
      ]
    })
  }

  async J1(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/剧情/TH.01-1.png`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }

  async J2(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/剧情/TH.01-2.png`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
}
