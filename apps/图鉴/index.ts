import { plugin, sendImage, Messagetype } from 'alemon'
import path from 'path'
export class showImg extends plugin {
  constructor() {
    super({
      rule: [
        //角色图鉴

        {
          reg: /^\/喀嚓喀嚓$/,
          fnc: 'A1'
        },
        {
          reg: /^\/柏林以东$/,
          fnc: 'A2'
        },
        {
          reg: /^\/五色月$/,
          fnc: 'A3'
        },
        {
          reg: /^\/玛丽莲$/,
          fnc: 'A4'
        },
        {
          reg: /^\/帕米埃$/,
          fnc: 'A5'
        },
        {
          reg: /^\/坦南特$/,
          fnc: 'A6'
        },
        {
          reg: /^\/玛蒂尔达$/,
          fnc: 'A7'
        },
        {
          reg: /^\/夏利$/,
          fnc: 'A8'
        },
        {
          reg: /^\/婴儿蓝$/,
          fnc: 'A9'
        },
        {
          reg: /^\/讣告人$/,
          fnc: 'A10'
        },
        {
          reg: /^\/气球派对$/,
          fnc: 'A11'
        },
        {
          reg: /^\/十四行诗$/,
          fnc: 'A12'
        },
        {
          reg: /^\/X$/,
          fnc: 'A13'
        },
        {
          reg: /^\/未锈铠$/,
          fnc: 'A14'
        },
        {
          reg: /^\/槲寄生$/,
          fnc: 'A15'
        },
        {
          reg: /^\/泥鯭的士$/,
          fnc: 'A16'
        },
        {
          reg: /^\/苏芙比$/,
          fnc: 'A17'
        },
        {
          reg: /^\/百夫长$/,
          fnc: 'A18'
        },
        {
          reg: /^\/兔毛手袋$/,
          fnc: 'A19'
        },
        {
          reg: /^\/红弩箭$/,
          fnc: 'A20'
        },
        {
          reg: /^\/星锑$/,
          fnc: 'A21'
        },
        {
          reg: /^\/远旅$/,
          fnc: 'A22'
        },
        {
          reg: /^\/温妮弗雷德$/,
          fnc: 'A23'
        },
        {
          reg: /^\/新巴别塔$/,
          fnc: 'A24'
        },

        //心相图鉴

        {
          reg: /^\/夜色亵渎者$/,
          fnc: 'X1'
        },
        {
          reg: /^\/好奇心宝贝$/,
          fnc: 'X2'
        },
        {
          reg: /^\/必要的记录$/,
          fnc: 'X3'
        },
        {
          reg: /^\/掌声如雷鸣$/,
          fnc: 'X4'
        },
        {
          reg: /^\/第二次生命$/,
          fnc: 'X5'
        },
        {
          reg: /^\/美丽新世界$/,
          fnc: 'X6'
        },
        {
          reg: /^\/跳房子游戏$/,
          fnc: 'X7'
        },
        {
          reg: /^\/午后小憩$/,
          fnc: 'X8'
        },
        {
          reg: /^\/心驰神往$/,
          fnc: 'X9'
        },
        {
          reg: /^\/无束无拘$/,
          fnc: 'X10'
        },
        {
          reg: /^\/明日亦然$/,
          fnc: 'X11'
        },
        {
          reg: /^\/示我以真$/,
          fnc: 'X12'
        },
        {
          reg: /^\/笑语欢声$/,
          fnc: 'X13'
        },
        {
          reg: /^\/自由的心$/,
          fnc: 'X14'
        },
        {
          reg: /^\/远大前程$/,
          fnc: 'X15'
        },

        //道具图鉴

        {
          reg: /^\/不腐猴爪$/,
          fnc: 'C1'
        },
        {
          reg: /^\/分别善恶之果$/,
          fnc: 'C2'
        },
        {
          reg: /^\/双头形骨架$/,
          fnc: 'C3'
        },
        {
          reg: /^\/啮咬盒$/,
          fnc: 'C4'
        },
        {
          reg: /^\/幸运咒语$/,
          fnc: 'C5'
        },
        {
          reg: /^\/幼龙骨标本$/,
          fnc: 'C6'
        },
        {
          reg: /^\/床下怪物$/,
          fnc: 'C7'
        },
        {
          reg: /^\/未知种根骨$/,
          fnc: 'C8'
        },
        {
          reg: /^\/液化战栗$/,
          fnc: 'C9'
        },
        {
          reg: /^\/清扫咒$/,
          fnc: 'C10'
        },
        {
          reg: /^\/狂人絮语$/,
          fnc: 'C11'
        },
        {
          reg: /^\/百灵百验鸟$/,
          fnc: 'C12'
        },
        {
          reg: /^\/盐封曼德拉$/,
          fnc: 'C13'
        },
        {
          reg: /^\/破碎骨片$/,
          fnc: 'C14'
        },
        {
          reg: /^\/祝圣秘银$/,
          fnc: 'C15'
        },
        {
          reg: /^\/粗糙银锭$/,
          fnc: 'C16'
        },
        {
          reg: /^\/精磨苦盐$/,
          fnc: 'C17'
        },
        {
          reg: /^\/罗马金币$/,
          fnc: 'C18'
        },
        {
          reg: /^\/苦盐簇$/,
          fnc: 'C19'
        },
        {
          reg: /^\/金爪灵摆$/,
          fnc: 'C20'
        },
        {
          reg: /^\/金羊毛$/,
          fnc: 'C21'
        },
        {
          reg: /^\/铂金通灵板$/,
          fnc: 'C22'
        },
        {
          reg: /^\/银光子弹$/,
          fnc: 'C23'
        },
        {
          reg: /^\/银矿原石$/,
          fnc: 'C24'
        },
        {
          reg: /^\/长青剑$/,
          fnc: 'C25'
        },
        {
          reg: /^\/颤颤之齿$/,
          fnc: 'C26'
        }
      ]
    })
  }

  //角色图鉴
  async A1(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/喀嚓喀嚓.jpg'))
    return false
  }
  async A2(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/柏林以东.jpg'))
    return false
  }
  async A3(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/五色月.jpg'))
    return false
  }

  async A4(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/玛丽莲.jpg'))
    return false
  }

  async A5(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/帕米埃.jpg'))
    return false
  }

  async A6(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/坦南特.jpg'))
    return false
  }

  async A7(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/玛蒂尔达.jpg'))
    return false
  }

  async A8(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/夏利.jpg'))
    return false
  }

  async A9(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/婴儿蓝.jpg'))
    return false
  }

  async A10(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/讣告人.jpg'))
    return false
  }

  async A11(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/气球派对.jpg'))
    return false
  }

  async A12(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/十四行诗.jpg'))
    return false
  }

  async A13(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/X.jpg'))
    return false
  }

  async A14(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/未锈铠.jpg'))
    return false
  }

  async A15(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/槲寄生.jpg'))
    return false
  }

  async A16(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/泥鯭的士.jpg'))
    return false
  }

  async A17(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/苏芙比.jpg'))
    return false
  }

  async A18(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/百夫长.jpg'))
    return false
  }

  async A19(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/兔毛手袋.jpg'))
    return false
  }

  async A20(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/红弩箭.jpg'))
    return false
  }

  async A21(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/星锑.jpg'))
    return false
  }

  async A22(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/远旅.jpg'))
    return false
  }

  async A23(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/温妮弗雷德.jpg'))
    return false
  }

  async A24(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/角色/新巴别塔.jpg'))
    return false
  }

  //心相图鉴

  async X1(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/夜色亵渎者.png'))
    return false
  }

  async X2(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/好奇心宝贝.png'))
    return false
  }

  async X3(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/必要的记录.png'))
    return false
  }

  async X4(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/掌声如雷鸣.png'))
    return false
  }

  async X5(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/第二次生命.png'))
    return false
  }

  async X6(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/美丽新世界.png'))
    return false
  }

  async X7(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/跳房子游戏.png'))
    return false
  }
  async X8(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/午后小憩.png'))
    return false
  }

  async X9(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/心驰神往.png'))
    return false
  }

  async X10(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/无束无拘.png'))
    return false
  }

  async X11(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/明日亦然.png'))
    return false
  }

  async X12(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/示我以真.png'))
    return false
  }

  async X13(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/笑语欢声.png'))
    return false
  }

  async X14(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/自由的心.png'))
    return false
  }

  async X15(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/心相/远大前程.png'))
    return false
  }

  //道具图鉴

  async C1(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/不腐猴爪.png'))
    return false
  }

  async C2(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/分别善恶之果.png'))
    return false
  }

  async C3(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/双头形骨架.png'))
    return false
  }

  async C4(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/啮咬盒.png'))
    return false
  }

  async C5(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/幸运咒语.png'))
    return false
  }

  async C6(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/幼龙骨标本.png'))
    return false
  }

  async C7(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/床下怪物.png'))
    return false
  }

  async C8(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/未知种根骨.png'))
    return false
  }

  async C9(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/液化战栗.png'))
    return false
  }

  async C10(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/清扫咒.png'))
    return false
  }

  async C11(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/狂人絮语.png'))
    return false
  }

  async C12(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/百灵百验鸟.png'))
    return false
  }

  async C13(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/盐封曼德拉.png'))
    return false
  }

  async C14(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/破碎骨片.png'))
    return false
  }

  async C15(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/祝圣秘银.png'))
    return false
  }

  async C16(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/粗糙银锭.png'))
    return false
  }

  async C17(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/精磨苦盐.png'))
    return false
  }

  async C18(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/罗马金币.png'))
    return false
  }

  async C19(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/苦盐簇.png'))
    return false
  }

  async C20(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/金爪灵摆.png'))
    return false
  }

  async C21(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/金羊毛.png'))
    return false
  }

  async C22(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/铂金通灵板.png'))
    return false
  }

  async C23(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/银光子弹.png'))
    return false
  }

  async C24(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/银矿原石.png'))
    return false
  }

  async C25(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/长青剑.png'))
    return false
  }

  async C26(e: Messagetype): Promise<boolean> {
    e.sendImage(path.resolve(__dirname, '../../resources/assets/img/图鉴/道具/颤颤之齿.png'))
    return false
  }
}
