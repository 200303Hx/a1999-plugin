import { plugin, Messagetype } from 'alemon'

export class gonglue extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^共鸣攻略上$/,
          fnc: 'G1'
        },
        {
          reg: /^共鸣攻略中$/,
          fnc: 'G2'
        },
        {
          reg: /^共鸣攻略下$/,
          fnc: 'G3'
        },
        {
          reg: /^主线解谜$/,
          fnc: 'G4'
        },
        {
          reg: /^4-6电路解谜$/,
          fnc: 'G5'
        },
        {
          reg: /^3-12线路图$/,
          fnc: 'G6'
        },
        {
          reg: /^2-4送传单$/,
          fnc: 'G7'
        },
        {
          reg: /^旧齿与陈痕-20$/,
          fnc: 'G8'
        },
        {
          reg: /^旧齿与陈痕-19$/,
          fnc: 'G9'
        },
        {
          reg: /^Buff$/,
          fnc: 'G10'
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
  async G4(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/文字解谜.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
  async G5(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/4-6电路解谜.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
  async G6(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/3-12线路图.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
  async G7(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/攻略/2-4送传单.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
  async G8(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/img/攻略/旧齿与陈痕-20.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
  async G9(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/img/攻略/旧齿与陈痕-19.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }

  async G10(e: Messagetype): Promise<boolean> {
    await e.sendImage(
      `${process
        .cwd()
        .replace(
          /\\/g,
          '/'
        )}/plugins/alemon-plugin-1999/resources/assets/img/攻略/旧齿与陈痕-19.jpg`
    )
    e.reply(`<@!${e.msg.author.id}> `)
    return false
  }
}
