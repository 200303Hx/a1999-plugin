import {
  plugin,
  AMessage,
  createQrcode,
  getPathBuffer,
  getPluginHelp
} from 'alemonjs'
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

  async J1(e: AMessage): Promise<boolean> {
    await e.reply(
      getPathBuffer(
        `./application/alemon-plugin-1999/resources/assets/img/剧情/TH.01-1.png`
      )
    )
    e.reply(`<@!${e.msg_id}> `)
    return false
  }

  async J2(e: AMessage): Promise<boolean> {
    await e.reply(
      getPathBuffer(
        `./application/alemon-plugin-1999/resources/assets/img/剧情/TH.01-2.png`
      )
    )
    e.reply(`<@!${e.msg_id}> `)
    return false
  }
}
