import {
  plugin,
  AMessage,
  createQrcode,
  getPathBuffer,
  getPluginHelp
} from 'alemonjs'
import axios from 'axios'
import _ from 'lodash'
import fs from 'fs'

export class c extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /测试/,
          fnc: 'c'
        }
      ]
    })
  }
  async c(e) {
    const a = e.msg.channel_id
    e.reply(a)
  }
}
