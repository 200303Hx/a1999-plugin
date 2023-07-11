import { plugin, Messagetype } from 'alemon'
import path from 'path'
export class showI extends plugin {
  constructor() {
    super({
      rule: [
        //听力笔记
        {
          reg: /^\/day1-1$/,
          fnc: 'T1'
        },
        {
          reg: /^\/day1-2$/,
          fnc: 'T2'
        },
        {
          reg: /^\/day1-3$/,
          fnc: 'T3'
        },
        {
          reg: /^\/day2-1$/,
          fnc: 'T4'
        },
        {
          reg: /^\/day2-2$/,
          fnc: 'T5'
        },
        {
          reg: /^\/day2-3$/,
          fnc: 'T6'
        },
        {
          reg: /^\/day3-1$/,
          fnc: 'T7'
        },
        {
          reg: /^\/day3-2$/,
          fnc: 'T8'
        },
        {
          reg: /^\/day4-1$/,
          fnc: 'T9'
        },
        {
          reg: /^\/day4-2$/,
          fnc: 'T10'
        },
        {
          reg: /^\/day4-3$/,
          fnc: 'T11'
        },
        {
          reg: /^\/day4-4$/,
          fnc: 'T12'
        },
        {
          reg: /^\/day5-1$/,
          fnc: 'T13'
        },
        {
          reg: /^\/day5-2$/,
          fnc: 'T14'
        }
      ]
    })
  }

  async T1(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day1-1.jpg`
    )
    return false
  }

  async T2(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day1-2.jpg`
    )
    return false
  }

  async T3(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day1-3.jpg`
    )
    return false
  }

  async T4(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day2-1.jpg`
    )
    return false
  }

  async T5(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day2-2.jpg`
    )
    return false
  }

  async T6(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day2-3.jpg`
    )
    return false
  }

  async T7(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day3-1.jpg`
    )
    return false
  }

  async T8(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day3-2.jpg`
    )
    return false
  }

  async T9(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day4-1.jpg`
    )
    return false
  }

  async T10(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day4-2.jpg`
    )
    return false
  }

  async T11(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day4-3.jpg`
    )
    return false
  }

  async T12(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day4-4.jpg`
    )
    return false
  }

  async T13(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day5-1.jpg`
    )
    return false
  }

  async T14(e: Messagetype): Promise<boolean> {
    e.sendImage(
      `${process
        .cwd()
        .replace(/\\/g, '/')}/plugins/alemon-plugin-1999/resources/assets/img/听力/day5-2.jpg`
    )
    return false
  }
}
