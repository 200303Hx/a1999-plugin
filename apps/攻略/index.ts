import { plugin, Messagetype } from 'alemon'

export class gonglue extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^\/共鸣攻略上$/,
          fnc: 'G1'
        },
        {
          reg: /^\/共鸣攻略中$/,
          fnc: 'G2'
        },
        {
          reg: /^\/共鸣攻略下$/,
          fnc: 'G3'
        }
      ]
    })
  }

  async G1(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/共鸣攻略上.png`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }

  async G2(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/共鸣攻略中.png`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
  async G3(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/共鸣攻略下.png`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
}
