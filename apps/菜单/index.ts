import {
  plugin,
  AMessage,
  getUrlbuffer,
  createQrcode,
  getPathBuffer,
  getPluginHelp
} from 'alemonjs'

export class show extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^\/1999帮助$/,
          fnc: 'help'
        },
        {
          reg: /^\/剧情$/,
          fnc: '剧情'
        },
        {
          reg: /^\/征集帮助$/,
          fnc: '征集帮助'
        },
        {
          reg: /^\/听力笔记$/,
          fnc: '听力笔记'
        },
        {
          reg: /^\/征集分析教程$/,
          fnc: '征集分析教程'
        },
        {
          reg: /^\/攻略$/,
          fnc: '攻略'
        }
      ]
    })
  }

  async 剧情(e: AMessage): Promise<boolean> {
    e.reply(
      '以下为剧情目录\n只需要复制下方目录命令@Bot就可以获取该小节的中英对照剧情辣！\n/TH.01-1\n/TH.01-2'
    )
    return false
  }

  async help(e: AMessage): Promise<boolean> {
    e.reply(
      getPathBuffer(
        `/application/a1999-plugin/resources/assets/img/help/菜单.png`
      )
    )
    return false
  }

  async 听力笔记(e: AMessage): Promise<boolean> {
    e.reply(
      getPathBuffer(
        `/application/a1999-plugin/resources/assets/img/help/听力笔记.png`
      )
    )
    return false
  }
  async 攻略(e: AMessage): Promise<boolean> {
    e.reply(
      getPathBuffer(
        `/application/a1999-plugin/resources/assets/img/help/攻略.jpg`
      )
    )
    return false
  }
  async 征集帮助(e: AMessage): Promise<boolean> {
    e.reply(
      getPathBuffer(
        `/application/a1999-plugin/resources/assets/img/help/征集帮助.png`
      )
    )

    return false
  }

  async 征集分析教程(e: AMessage): Promise<boolean> {
    e.reply(
      getPathBuffer(
        `/application/a1999-plugin/resources/assets/img/help/征集分析教程.png`
      )
    )

    return false
  }
}
