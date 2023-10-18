import { plugin, getPathBuffer } from 'alemonjs';
import axios from 'axios';
import fs, { existsSync } from 'fs';
import jimp from 'jimp';
import { createCanvas, registerFont } from 'canvas';
import _ from 'lodash';

class c extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /测试/,
                    fnc: 'c'
                }
            ]
        });
    }
    async c(e) {
        const a = e.msg.channel_id;
        e.reply(a);
    }
}

class Box extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /配队分析(.*)/,
                    fnc: 'Box'
                },
                {
                    reg: /^百度TK\s+([\S]+)/,
                    fnc: 'Box2'
                }
            ]
        });
    }
    async Box2(e) {
        const TK = /^百度TK\s+([\S]+)/;
        const match = e.msg.match(TK);
        const partOfUrl = match[1];
        const yamlData = { partOfUrl };
        const yamlFileName = `./application/alemon-plugin-1999/config/TK.yaml`;
        fs.writeFileSync(yamlFileName, JSON.stringify(yamlData, null, 2), 'utf-8');
        console.log('TK已保存');
        e.reply('TK已保存');
    }
    async Box(e) {
        const channelID = e.msg.channel_id;
        const messageID = e.msg.id;
        const data = await global.clientApiByQQ.messageApi.message(channelID, messageID);
        const img = 'http://' + data.data.message.attachments[0].url;
        console.log(img);
        const yamlFileName = `./application/alemon-plugin-1999/config/TK.yaml`;
        const yamlData = fs.readFileSync(yamlFileName, 'utf-8');
        const parsedData = JSON.parse(yamlData);
        const TK = parsedData.partOfUrl;
        const baiduurl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=';
        const apiurl = baiduurl + TK;
        console.log(apiurl);
        main();
        async function main() {
            const options = {
                method: 'POST',
                url: baiduurl + TK,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                data: {
                    url: img,
                    language_type: 'CHN_ENG'
                }
            };
            const response = await axios(options);
            console.log(response.data.words_result);
            const teamsData = {
                物理双c: {
                    配队: ['温妮弗雷德', '红弩箭', '泥鯭的士', '兔毛手袋'],
                    介绍: '(物理队2c2辅，微控)'
                },
                控制木队: {
                    配队: ['柏林以东', '泥鯭的士', '槲寄生', '苏芙比'],
                    介绍: '奶位可换，吸血控制木队'
                },
                岩系单c队: {
                    配队: ['温妮弗雷德', '皮克勒斯', '十四行诗', '新巴别塔'],
                    介绍: '1c3辅'
                },
                铠苏柏: {
                    配队: ['未锈铠', '苏芙比', '柏林以东', 'X'],
                    介绍: '万金油队伍,X是可替换位'
                },
                纯反伤队: {
                    配队: ['新巴别塔', '远旅', '气球派对', '弄臣'],
                    介绍: '远旅（核心）'
                },
                永控流: {
                    配队: ['五色月', '槲寄生', '泥鯭的士', 'X'],
                    介绍: '清一色，永控流，X是可替换位'
                },
                星系暴击队: {
                    配队: ['红弩箭', '远旅', '牙仙', 'X'],
                    介绍: '红弩箭（可换其他暴击c），X是可替换位'
                },
                纯星系队: {
                    配队: ['红弩箭', '远旅', '牙仙', '星梯'],
                    介绍: '纯星系队'
                },
                精神万金油队: {
                    配队: ['槲寄生', '兔毛手袋', '皮克勒斯', 'X'],
                    介绍: '槲寄生输出控制 兔毛奶增伤控制 皮克勒斯驱散增伤，X是可替换位'
                },
                兽系现实: {
                    配队: ['百夫长', '玛丽莲', '坎南特', 'X'],
                    介绍: '百夫长主c输出减防 坎南特大招减防 玛丽莲副c控制减防，X是可替换位'
                },
                循环出手队: {
                    配队: ['牙仙', '皮克勒斯', '星梯', 'X'],
                    介绍: '无'
                },
                现实队: {
                    配队: ['柏林以东', '红弩箭', '讣告人', '牙仙'],
                    介绍: '现实队柏林（核心）➕任意现实主c红弩箭，百夫长，➕任意拐或奶，可选讣告人，皮克勒斯，牙仙，气球派对，兔毛手袋'
                },
                by笯鸦: {
                    配队: ['红弩箭', '远旅', '十四行诗', '柏林以东'],
                    介绍: '红弩箭对单输出，十四行诗仪式对群体清残血，远旅卡好出手次数有沉默，仪式减激情，加上诗宝的缴械，控制很足，觉得不稳给诗宝带个第二次生命时不时奶一下，远旅只出一级反制二级明昧就足够，柏林以东？别问，问就是打不过就开。by笯鸦'
                },
                输出拉满: {
                    配队: ['温妮弗雷德', '梅兰妮', '红弩箭', '百夫长'],
                    介绍: '(4c)'
                }
            };
            const possibleCharacterNames = [
                '槲寄生',
                '红弩箭',
                '尼克·波顿',
                '小春雀儿',
                '未锈铠',
                '勿忘我',
                '苏芙比',
                'X',
                '玛丽莲',
                '弄臣',
                '冬',
                '芭妮芭妮',
                '狼群',
                '婴儿蓝',
                '夏利',
                '雾行者',
                '柏林以东',
                '帕米埃',
                '十四行诗',
                '气球派对',
                '星锑',
                '红斗篷',
                '无线电小姐',
                'APPLe',
                '斯奈德',
                '拉拉泉',
                '铅玻璃',
                '百夫长',
                'TTT',
                '星之眼',
                '莉拉妮',
                '约翰·提托',
                '讣告人',
                '五色月',
                '泥鯭的士',
                '丽莎&路易斯',
                '玛蒂尔达',
                '爱宠',
                '坦南特',
                '莫桑女士',
                '贝蒂',
                '吵闹鬼',
                '兔毛手袋',
                '远旅',
                '喀嚓喀嚓',
                '哒哒达利',
                '温妮弗雷德',
                '新巴别塔',
                '牙仙',
                '洋葱头',
                '斯普特尼克',
                '小梅斯梅尔',
                '埃里克',
                '门',
                '金蜜儿',
                '梅兰妮',
                '皮克勒斯',
                '挖掘艺术'
            ];
            function levenshteinDistance(str1, str2) {
                const m = str1.length;
                const n = str2.length;
                const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
                for (let i = 0; i <= m; i++) {
                    dp[i][0] = i;
                }
                for (let j = 0; j <= n; j++) {
                    dp[0][j] = j;
                }
                for (let i = 1; i <= m; i++) {
                    for (let j = 1; j <= n; j++) {
                        if (str1[i - 1] === str2[j - 1]) {
                            dp[i][j] = dp[i - 1][j - 1];
                        }
                        else {
                            dp[i][j] =
                                Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                        }
                    }
                }
                return dp[m][n];
            }
            let matchingNames;
            function findBestMatchingName(targetName) {
                let bestMatchName;
                let bestMatchScore = Number.MAX_SAFE_INTEGER;
                for (const possibleName of possibleCharacterNames) {
                    const similarityScore = levenshteinDistance(targetName, possibleName);
                    if (similarityScore < bestMatchScore) {
                        bestMatchName = possibleName;
                        bestMatchScore = similarityScore;
                    }
                }
                return bestMatchScore <= 2 ? bestMatchName : undefined;
            }
            if (response.data && Array.isArray(response.data.words_result)) {
                const matchingNames = response.data.words_result
                    .filter((wordResult) => wordResult && wordResult.words)
                    .map((wordResult) => wordResult.words.trim())
                    .map((word) => findBestMatchingName(word))
                    .filter((name) => name !== undefined);
                console.log(matchingNames);
            }
            function findMatchingTeams(names) {
                const matchingTeams = [];
                for (const teamName in teamsData) {
                    const teamCharacters = teamsData[teamName].配队;
                    if (Array.isArray(names) && Array.isArray(teamCharacters)) {
                        const foundCharacters = teamCharacters.filter(name => names.includes(name));
                        if (foundCharacters.length === 4) {
                            matchingTeams.push({
                                [teamName]: {
                                    配队: foundCharacters,
                                    介绍: teamsData[teamName].介绍
                                }
                            });
                        }
                    }
                    return matchingTeams;
                }
            }
            const matchingTeams = findMatchingTeams(matchingNames);
            const formattedResult = matchingTeams
                .map(team => JSON.stringify(team, null, 0).replace(/[{}[\]""]/g, ''))
                .join('\n \n');
            console.log('匹配的队伍数据：\n', formattedResult);
            e.reply('【配队推荐】：\n' + formattedResult);
        }
    }
}

class showJ extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^\/TH.01-1$/,
                    fnc: 'J1'
                },
                {
                    reg: /^\/TH.01-2$/,
                    fnc: 'J2'
                }
            ]
        });
    }
    async J1(e) {
        await e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/剧情/TH.01-1.png`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async J2(e) {
        await e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/剧情/TH.01-2.png`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
}

class showI extends plugin {
    constructor() {
        super({
            rule: [
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
        });
    }
    async T1(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day1-1.jpg`));
        return false;
    }
    async T2(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day1-2.jpg`));
        return false;
    }
    async T3(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day1-3.jpg`));
        return false;
    }
    async T4(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day2-1.jpg`));
        return false;
    }
    async T5(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day2-2.jpg`));
        return false;
    }
    async T6(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day2-3.jpg`));
        return false;
    }
    async T7(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day3-1.jpg`));
        return false;
    }
    async T8(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day3-2.jpg`));
        return false;
    }
    async T9(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day4-1.jpg`));
        return false;
    }
    async T10(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day4-2.jpg`));
        return false;
    }
    async T11(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day4-3.jpg`));
        return false;
    }
    async T12(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day4-4.jpg`));
        return false;
    }
    async T13(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day5-1.jpg`));
        return false;
    }
    async T14(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/听力/day5-2.jpg`));
        return false;
    }
}

class gonglue extends plugin {
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
        });
    }
    async G1(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/共鸣攻略上.png`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G2(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/共鸣攻略中.png`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G3(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/共鸣攻略下.png`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G4(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/文字解谜.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G5(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/4-6电路解谜.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G6(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/3-12线路图.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G7(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/2-4送传单.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G8(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/旧齿与陈痕-20.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G9(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/旧齿与陈痕-19.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
    async G10(e) {
        await e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/攻略/Buff.jpg`));
        e.reply(`<@!${e.msg_id}> `);
        return false;
    }
}

class chouka extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^\/十连$/,
                    fnc: '十连'
                },
                {
                    reg: /^\/单抽$/,
                    fnc: '单抽'
                }
            ]
        });
    }
    async 单抽(e) {
        try {
            const options = [
                { folderPath: folderPaths$2[0], probability: 0.015 },
                { folderPath: folderPaths$2[1], probability: 0.085 },
                { folderPath: folderPaths$2[2], probability: 0.4 },
                { folderPath: folderPaths$2[3], probability: 0.45 },
                { folderPath: folderPaths$2[4], probability: 0.05 }
            ];
            const drawCountMap = loadDrawCountMap$2();
            const userId = e.user_id;
            const { randomFolder, randomImage } = await 单抽Logic$2(e);
            const image = await jimp.read(randomImage);
            const outputFilePath = `${outputFolderPath$2}/single_draw.jpg`;
            await image.writeAsync(outputFilePath);
            drawCountMap[userId] = drawCountMap[userId] || [];
            drawCountMap[userId].push(randomImage);
            if (randomFolder === folderPaths$2[0]) {
                const previousDrawCount = drawCountMap[userId].length;
                drawCountMap[userId] = [randomImage];
                const previousFolder6Draws = drawCountMap[userId].filter(file => file !== randomImage);
                drawCountMap[userId] = previousFolder6Draws;
                saveDrawCountMap$2(drawCountMap);
                await e.reply(getPathBuffer(outputFilePath));
                e.reply(`<@!${userId}>，当前卡池：于湖中央\n抽到了6星，所用抽数 ${previousDrawCount} 抽`);
                console.log(`单抽图片已保存至 ${outputFilePath}`);
            }
            else {
                saveDrawCountMap$2(drawCountMap);
                await e.reply(getPathBuffer(outputFilePath));
                e.reply(`<@!${userId}>，当前卡池：于湖中央\n目前已经抽了 ${drawCountMap[userId].length} 次。`);
                console.log(`单抽图片已保存至 ${outputFilePath}`);
            }
        }
        catch (error) {
            console.error('发生错误：', error);
        }
    }
    async 十连(e) {
        const positions = [
            [160, 0],
            [310, 0],
            [460, 0],
            [610, 0],
            [760, 0],
            [590, 400],
            [740, 400],
            [890, 400],
            [1040, 400],
            [1190, 400]
        ];
        try {
            const drawCountMap = loadDrawCountMap$2();
            const userId = e.user_id;
            let folder6DrawCount = 0;
            const imagePaths = [];
            drawCountMap[userId] = drawCountMap[userId] || [];
            for (let i = 0; i < 10; i++) {
                const { randomFolder, randomImage } = await 单抽Logic$2(e);
                drawCountMap[userId].push(randomImage);
                imagePaths.push(randomImage);
                if (randomFolder === folderPaths$2[0]) {
                    folder6DrawCount = drawCountMap[userId].length;
                    drawCountMap[userId] = [randomImage];
                    const previousFolder6Draws = drawCountMap[userId].filter(file => file !== randomImage);
                    drawCountMap[userId] = previousFolder6Draws;
                }
            }
            saveDrawCountMap$2(drawCountMap);
            const backgroundImage = await jimp.read(backgroundImagePath$2);
            backgroundImage.resize(backgroundImageWidth$2, backgroundImageHeight$2);
            for (let i = 0; i < imagePaths.length; i++) {
                const randomImage = imagePaths[i];
                const image = await jimp.read(randomImage);
                const [x, y] = positions[i];
                backgroundImage.composite(image, x, y);
            }
            const outputFilePath = `${outputFolderPath$2}/十连.jpg`;
            await backgroundImage.writeAsync(outputFilePath);
            console.log(`图片已保存至 ${outputFilePath}`);
            console.log('图片合成完成！');
            await e.reply('', getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/抽取中.gif`), '抽取中.gif');
            await e.reply(getPathBuffer(outputFilePath));
            if (folder6DrawCount > 0) {
                e.reply(`<@!${userId}>，当前卡池：于湖中央\n抽到了6星，所用抽数：${folder6DrawCount} 抽`);
            }
            else {
                e.reply(`<@!${userId}>，当前卡池：于湖中央\n目前已经抽了 ${drawCountMap[userId].length} 次`);
            }
        }
        catch (error) {
            console.error('发生错误：', error);
        }
    }
}
function loadDrawCountMap$2() {
    try {
        const json = fs.readFileSync(dbFolderPath$2, 'utf-8');
        return JSON.parse(json);
    }
    catch (error) {
        saveDrawCountMap$2({});
        console.error('读取抽卡次数映射文件失败:', error);
        return {};
    }
}
function saveDrawCountMap$2(drawCountMap) {
    try {
        const json = JSON.stringify(drawCountMap, null, 2);
        fs.writeFileSync(drawCountMapPath$2, json, 'utf-8');
    }
    catch (error) {
        console.error('保存抽卡次数映射文件失败:', error);
    }
}
async function 单抽Logic$2(e) {
    const options = [
        { folderPath: folderPaths$2[0], probability: 0.015 },
        { folderPath: folderPaths$2[1], probability: 0.085 },
        { folderPath: folderPaths$2[2], probability: 0.4 },
        { folderPath: folderPaths$2[3], probability: 0.45 },
        { folderPath: folderPaths$2[4], probability: 0.05 }
    ];
    const randomFolder = getRandomOption$2(options);
    const randomImage = getRandomFileFromFolder$2(randomFolder);
    return { randomFolder, randomImage };
}
const backgroundImagePath$2 = `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/bg.png`;
const folderPaths$2 = [
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/6`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/5`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/4`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/3`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/2`
];
const outputFolderPath$2 = `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/im`;
const dbFolderPath$2 = `./application/alemon-plugin-1999/db/模拟抽卡/drawCountMap.json`;
const drawCountMapPath$2 = `./application/alemon-plugin-1999/db/模拟抽卡/drawCountMap.json`;
const backgroundImageWidth$2 = 1500;
const backgroundImageHeight$2 = 800;
function getRandomOption$2(options) {
    const totalProbability = options.reduce((sum, option) => sum + option.probability, 0);
    let random = Math.random() * totalProbability;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (random < option.probability) {
            return option.folderPath;
        }
        random -= option.probability;
    }
}
function getRandomFileFromFolder$2(folderPath) {
    const files = fs.readdirSync(folderPath);
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    return `${folderPath}/${randomFile}`;
}

class up2 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^\/十连up2$/,
                    fnc: '十连up2'
                },
                {
                    reg: /^\/单抽up2$/,
                    fnc: '单抽up2'
                }
            ]
        });
    }
    async 单抽up2(e) {
        try {
            const drawCountMap = loadDrawCountMap$1();
            const userId = e.user_id;
            const { randomFolder, randomImage } = await 单抽Logic$1();
            const image = await jimp.read(randomImage);
            const outputFilePath = `${outputFolderPath$1}/single_draw.jpg-up2`;
            await image.writeAsync(outputFilePath);
            drawCountMap[userId] = drawCountMap[userId] || [];
            drawCountMap[userId].push(randomImage);
            if (randomFolder.folderPath === folderPaths$1[0]) {
                const previousDrawCount = drawCountMap[userId].length;
                drawCountMap[userId] = [randomImage];
                const previousFolder6Draws = drawCountMap[userId].filter(file => file !== randomImage);
                drawCountMap[userId] = previousFolder6Draws;
                saveDrawCountMap$1(drawCountMap);
                await e.reply(getPathBuffer(outputFilePath));
                e.reply(`<@!${userId}>，当前卡池：仙子振翅入夜\n抽到了6星，所用抽数 ${previousDrawCount} 抽`);
                console.log(`单抽图片已保存至 ${outputFilePath}`);
            }
            else {
                saveDrawCountMap$1(drawCountMap);
                await e.reply(getPathBuffer(outputFilePath));
                e.reply(`<@!${userId}>，当前卡池：仙子振翅入夜\n目前已经抽了 ${drawCountMap[userId].length} 次。`);
                console.log(`单抽图片已保存至 ${outputFilePath}`);
            }
        }
        catch (error) {
            console.error('发生错误：', error);
        }
    }
    async 十连up2(e) {
        const positions = [
            [160, 0],
            [310, 0],
            [460, 0],
            [610, 0],
            [760, 0],
            [590, 400],
            [740, 400],
            [890, 400],
            [1040, 400],
            [1190, 400]
        ];
        try {
            const drawCountMap = loadDrawCountMap$1();
            const userId = e.user_id;
            let folder6DrawCount = 0;
            const imagePaths = [];
            const { randomFolder, randomImage } = await 单抽Logic$1();
            drawCountMap[userId] = drawCountMap[userId] || [];
            for (let i = 0; i < 10; i++) {
                const { randomFolder, randomImage } = await 单抽Logic$1();
                drawCountMap[userId].push(randomImage);
                imagePaths.push(randomImage);
                if (randomFolder.folderPath === folderPaths$1[0]) {
                    folder6DrawCount = drawCountMap[userId].length;
                    drawCountMap[userId] = [randomImage];
                    const previousFolder6Draws = drawCountMap[userId].filter(file => file !== randomImage);
                    drawCountMap[userId] = previousFolder6Draws;
                }
            }
            saveDrawCountMap$1(drawCountMap);
            const backgroundImage = await jimp.read(backgroundImagePath$1);
            backgroundImage.resize(backgroundImageWidth$1, backgroundImageHeight$1);
            for (let i = 0; i < imagePaths.length; i++) {
                const randomImage = imagePaths[i];
                const image = await jimp.read(randomImage);
                const [x, y] = positions[i];
                backgroundImage.composite(image, x, y);
            }
            const outputFilePath = `${outputFolderPath$1}/十连up2.jpg`;
            await e.reply('', getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/抽取中.gif`), '抽取中.gif');
            await backgroundImage.writeAsync(outputFilePath);
            console.log(`图片已保存至 ${outputFilePath}`);
            console.log('图片合成完成！');
            await e.reply(getPathBuffer(outputFilePath));
            if (folder6DrawCount > 0) {
                e.reply(`<@!${userId}>，当前卡池：仙子振翅入夜\n抽到了6星，所用抽数：${folder6DrawCount} 抽`);
            }
            else {
                e.reply(`<@!${userId}>，当前卡池：仙子振翅入夜\n目前已经抽了 ${drawCountMap[userId].length} 次`);
            }
        }
        catch (error) {
            console.error('发生错误：', error);
        }
    }
}
function loadDrawCountMap$1() {
    try {
        const json = fs.readFileSync(dbFolderPath$1, 'utf-8');
        return JSON.parse(json);
    }
    catch (error) {
        saveDrawCountMap$1({});
        console.error('读取抽卡次数映射文件失败:', error);
        return {};
    }
}
function saveDrawCountMap$1(drawCountMap) {
    try {
        const json = JSON.stringify(drawCountMap, null, 2);
        fs.writeFileSync(drawCountMapPath$1, json, 'utf-8');
    }
    catch (error) {
        console.error('保存抽卡次数映射文件失败:', error);
    }
}
async function 单抽Logic$1() {
    const options = [
        {
            folderPath: folderPaths$1[0],
            probability: 0.015,
            specificImage: `${folderPaths$1[0]}/6-14.png`,
            specificImageProbability: 0.5
        },
        {
            folderPath: folderPaths$1[1],
            probability: 0.085,
            specificImage: `${folderPaths$1[1]}/5-15.png`,
            specificImageProbability: 0.5
        },
        { folderPath: folderPaths$1[2], probability: 0.4 },
        { folderPath: folderPaths$1[3], probability: 0.45 },
        { folderPath: folderPaths$1[4], probability: 0.05 }
    ];
    const randomFolder = getRandomOption$1(options);
    const randomImage = getRandomFileFromFolder$1(randomFolder.folderPath, randomFolder.specificImage, randomFolder.specificImageProbability);
    return { randomFolder, randomImage };
}
const backgroundImagePath$1 = `/application/alemon-plugin-1999/resources/assets/img/模拟抽卡/bg.png`;
const folderPaths$1 = [
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/6-lim2`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/5-lim2`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/4`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/3`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/2`
];
const outputFolderPath$1 = `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/im`;
const dbFolderPath$1 = `./application/alemon-plugin-1999/db/模拟抽卡/drawCountMap-lim2.json`;
const drawCountMapPath$1 = `./application/alemon-plugin-1999/db/模拟抽卡/drawCountMap-lim2.json`;
const backgroundImageWidth$1 = 1500;
const backgroundImageHeight$1 = 800;
function getRandomOption$1(options) {
    const totalProbability = options.reduce((sum, option) => sum + option.probability, 0);
    let random = Math.random() * totalProbability;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (random < option.probability) {
            return option;
        }
        random -= option.probability;
    }
}
function getRandomFileFromFolder$1(folderPath, specificImage, specificImageProbability) {
    if (specificImage && Math.random() < specificImageProbability) {
        return specificImage;
    }
    const files = fs.readdirSync(folderPath);
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    return `${folderPath}/${randomFile}`;
}

class up extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^\/十连up$/,
                    fnc: '十连up'
                },
                {
                    reg: /^\/单抽up$/,
                    fnc: '单抽up'
                }
            ]
        });
    }
    async 单抽up(e) {
        try {
            const drawCountMap = loadDrawCountMap();
            const userId = e.user_id;
            const { randomFolder, randomImage } = await 单抽Logic();
            const image = await jimp.read(randomImage);
            const outputFilePath = `${outputFolderPath}/single_draw.jpg`;
            await image.writeAsync(outputFilePath);
            drawCountMap[userId] = drawCountMap[userId] || [];
            drawCountMap[userId].push(randomImage);
            if (randomFolder.folderPath === folderPaths[0]) {
                const previousDrawCount = drawCountMap[userId].length;
                drawCountMap[userId] = [randomImage];
                const previousFolder6Draws = drawCountMap[userId].filter(file => file !== randomImage);
                drawCountMap[userId] = previousFolder6Draws;
                saveDrawCountMap(drawCountMap);
                await e.reply(getPathBuffer(outputFilePath));
                e.reply(`<@!${userId}>，当前卡池：自由摇摆\n抽到了6星，所用抽数 ${previousDrawCount} 抽`);
                console.log(`单抽图片已保存至 ${outputFilePath}`);
            }
            else {
                saveDrawCountMap(drawCountMap);
                await e.reply(getPathBuffer(outputFilePath));
                e.reply(`<@!${userId}>，当前卡池：自由摇摆\n目前已经抽了 ${drawCountMap[userId].length} 次。`);
                console.log(`单抽图片已保存至 ${outputFilePath}`);
            }
        }
        catch (error) {
            console.error('发生错误：', error);
        }
    }
    async 十连up(e) {
        const positions = [
            [160, 0],
            [310, 0],
            [460, 0],
            [610, 0],
            [760, 0],
            [590, 400],
            [740, 400],
            [890, 400],
            [1040, 400],
            [1190, 400]
        ];
        try {
            const drawCountMap = loadDrawCountMap();
            const userId = e.user_id;
            let folder6DrawCount = 0;
            const imagePaths = [];
            const { randomFolder, randomImage } = await 单抽Logic();
            drawCountMap[userId] = drawCountMap[userId] || [];
            for (let i = 0; i < 10; i++) {
                const { randomFolder, randomImage } = await 单抽Logic();
                drawCountMap[userId].push(randomImage);
                imagePaths.push(randomImage);
                if (randomFolder.folderPath === folderPaths[0]) {
                    folder6DrawCount = drawCountMap[userId].length;
                    drawCountMap[userId] = [randomImage];
                    const previousFolder6Draws = drawCountMap[userId].filter(file => file !== randomImage);
                    drawCountMap[userId] = previousFolder6Draws;
                }
            }
            saveDrawCountMap(drawCountMap);
            const backgroundImage = await jimp.read(backgroundImagePath);
            backgroundImage.resize(backgroundImageWidth, backgroundImageHeight);
            for (let i = 0; i < imagePaths.length; i++) {
                const randomImage = imagePaths[i];
                const image = await jimp.read(randomImage);
                const [x, y] = positions[i];
                backgroundImage.composite(image, x, y);
            }
            const outputFilePath = `${outputFolderPath}/十连.jpg`;
            await e.reply('', getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/抽取中.gif`), '抽取中.gif');
            await backgroundImage.writeAsync(outputFilePath);
            console.log(`图片已保存至 ${outputFilePath}`);
            console.log('图片合成完成！');
            await e.reply(getPathBuffer(outputFilePath));
            if (folder6DrawCount > 0) {
                e.reply(`<@!${userId}>，当前卡池：自由摇摆\n抽到了6星，所用抽数：${folder6DrawCount} 抽`);
            }
            else {
                e.reply(`<@!${userId}>，当前卡池：自由摇摆\n目前已经抽了 ${drawCountMap[userId].length} 次`);
            }
        }
        catch (error) {
            console.error('发生错误：', error);
        }
    }
}
function loadDrawCountMap() {
    try {
        const json = fs.readFileSync(dbFolderPath, 'utf-8');
        return JSON.parse(json);
    }
    catch (error) {
        saveDrawCountMap({});
        console.error('读取抽卡次数映射文件失败:', error);
        return {};
    }
}
function saveDrawCountMap(drawCountMap) {
    try {
        const json = JSON.stringify(drawCountMap, null, 2);
        fs.writeFileSync(drawCountMapPath, json, 'utf-8');
    }
    catch (error) {
        console.error('保存抽卡次数映射文件失败:', error);
    }
}
async function 单抽Logic() {
    const options = [
        {
            folderPath: folderPaths[0],
            probability: 0.015,
            specificImage: `${folderPaths[0]}/6-6.png`,
            specificImageProbability: 0.5
        },
        {
            folderPath: folderPaths[1],
            probability: 0.085,
            specificImage: `${folderPaths[1]}/5-8.png`,
            specificImageProbability: 0.5
        },
        { folderPath: folderPaths[2], probability: 0.4 },
        { folderPath: folderPaths[3], probability: 0.45 },
        { folderPath: folderPaths[4], probability: 0.05 }
    ];
    const randomFolder = getRandomOption(options);
    const randomImage = getRandomFileFromFolder(randomFolder.folderPath, randomFolder.specificImage, randomFolder.specificImageProbability);
    return { randomFolder, randomImage };
}
const backgroundImagePath = `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/bg.png`;
const folderPaths = [
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/6-lim1`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/5-lim1`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/4`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/3`,
    `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/2`
];
const outputFolderPath = `./application/alemon-plugin-1999/resources/assets/img/模拟抽卡/im`;
const dbFolderPath = `./application/alemon-plugin-1999/db/模拟抽卡/drawCountMap-lim1.json`;
const drawCountMapPath = `./application/alemon-plugin-1999/db/模拟抽卡/drawCountMap-lim1.json`;
const backgroundImageWidth = 1500;
const backgroundImageHeight = 800;
function getRandomOption(options) {
    const totalProbability = options.reduce((sum, option) => sum + option.probability, 0);
    let random = Math.random() * totalProbability;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (random < option.probability) {
            return option;
        }
        random -= option.probability;
    }
}
function getRandomFileFromFolder(folderPath, specificImage, specificImageProbability) {
    if (specificImage && Math.random() < specificImageProbability) {
        return specificImage;
    }
    const files = fs.readdirSync(folderPath);
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    return `${folderPath}/${randomFile}`;
}

class showImg2 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^夜色亵渎者$/,
                    fnc: 'X1'
                },
                {
                    reg: /^好奇心宝贝$/,
                    fnc: 'X2'
                },
                {
                    reg: /^必要的记录$/,
                    fnc: 'X3'
                },
                {
                    reg: /^掌声如雷鸣$/,
                    fnc: 'X4'
                },
                {
                    reg: /^第二次生命$/,
                    fnc: 'X5'
                },
                {
                    reg: /^美丽新世界$/,
                    fnc: 'X6'
                },
                {
                    reg: /^跳房子游戏$/,
                    fnc: 'X7'
                },
                {
                    reg: /^午后小憩$/,
                    fnc: 'X8'
                },
                {
                    reg: /^心驰神往$/,
                    fnc: 'X9'
                },
                {
                    reg: /^无束无拘$/,
                    fnc: 'X10'
                },
                {
                    reg: /^明日亦然$/,
                    fnc: 'X11'
                },
                {
                    reg: /^示我以真$/,
                    fnc: 'X12'
                },
                {
                    reg: /^笑语欢声$/,
                    fnc: 'X13'
                },
                {
                    reg: /^自由的心$/,
                    fnc: 'X14'
                },
                {
                    reg: /^远大前程$/,
                    fnc: 'X15'
                }
            ]
        });
    }
    async X1(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/夜色亵渎者.png`));
        return false;
    }
    async X2(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/好奇心宝贝.png`));
        return false;
    }
    async X3(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/必要的记录.png`));
        return false;
    }
    async X4(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/掌声如雷鸣.png`));
        return false;
    }
    async X5(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/第二次生命.png`));
        return false;
    }
    async X6(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/美丽新世界.png`));
        return false;
    }
    async X7(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/跳房子游戏.png`));
        return false;
    }
    async X8(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/午后小憩.png`));
        return false;
    }
    async X9(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/心驰神往.png`));
        return false;
    }
    async X10(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/无束无拘.png`));
        return false;
    }
    async X11(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/明日亦然.png`));
        return false;
    }
    async X12(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/示我以真.png`));
        return false;
    }
    async X13(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/笑语欢声.png`));
        return false;
    }
    async X14(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/自由的心.png`));
        return false;
    }
    async X15(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/心相/远大前程.png`));
        return false;
    }
}

class showImg extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^喀嚓喀嚓$/,
                    fnc: 'A1'
                },
                {
                    reg: /^柏林以东$/,
                    fnc: 'A2'
                },
                {
                    reg: /^五色月$/,
                    fnc: 'A3'
                },
                {
                    reg: /^玛丽莲$/,
                    fnc: 'A4'
                },
                {
                    reg: /^帕米埃$/,
                    fnc: 'A5'
                },
                {
                    reg: /^坦南特$/,
                    fnc: 'A6'
                },
                {
                    reg: /^玛蒂尔达$/,
                    fnc: 'A7'
                },
                {
                    reg: /^夏利$/,
                    fnc: 'A8'
                },
                {
                    reg: /^婴儿蓝$/,
                    fnc: 'A9'
                },
                {
                    reg: /^讣告人$/,
                    fnc: 'A10'
                },
                {
                    reg: /^气球派对$/,
                    fnc: 'A11'
                },
                {
                    reg: /^十四行诗$/,
                    fnc: 'A12'
                },
                {
                    reg: /^X$/,
                    fnc: 'A13'
                },
                {
                    reg: /^未锈铠$/,
                    fnc: 'A14'
                },
                {
                    reg: /^槲寄生$/,
                    fnc: 'A15'
                },
                {
                    reg: /^泥鯭的士$/,
                    fnc: 'A16'
                },
                {
                    reg: /^苏芙比$/,
                    fnc: 'A17'
                },
                {
                    reg: /^百夫长$/,
                    fnc: 'A18'
                },
                {
                    reg: /^兔毛手袋$/,
                    fnc: 'A19'
                },
                {
                    reg: /^红弩箭$/,
                    fnc: 'A20'
                },
                {
                    reg: /^星锑$/,
                    fnc: 'A21'
                },
                {
                    reg: /^远旅$/,
                    fnc: 'A22'
                },
                {
                    reg: /^温妮弗雷德$/,
                    fnc: 'A23'
                },
                {
                    reg: /^新巴别塔$/,
                    fnc: 'A24'
                },
                {
                    reg: /^梅兰妮$/,
                    fnc: 'A25'
                }
            ]
        });
    }
    async A1(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/喀嚓喀嚓.jpg`));
        return false;
    }
    async A2(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/柏林以东.jpg`));
        return false;
    }
    async A3(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/五色月.jpg`));
        return false;
    }
    async A4(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/玛丽莲.jpg`));
        return false;
    }
    async A5(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/帕米埃.jpg`));
        return false;
    }
    async A6(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/坦南特.jpg`));
        return false;
    }
    async A7(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/玛蒂尔达.jpg`));
        return false;
    }
    async A8(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/夏利.jpg`));
        return false;
    }
    async A9(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/婴儿蓝.jpg`));
        return false;
    }
    async A10(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/讣告人.jpg`));
        return false;
    }
    async A11(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/气球派对.jpg`));
        return false;
    }
    async A12(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/十四行诗.jpg`));
        return false;
    }
    async A13(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/X.jpg`));
        return false;
    }
    async A14(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/未锈铠.jpg`));
        return false;
    }
    async A15(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/槲寄生.jpg`));
        return false;
    }
    async A16(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/泥鯭的士.jpg`));
        return false;
    }
    async A17(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/苏芙比.jpg`));
        return false;
    }
    async A18(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/百夫长.jpg`));
        return false;
    }
    async A19(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/兔毛手袋.jpg`));
        return false;
    }
    async A20(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/红弩箭.jpg`));
        return false;
    }
    async A21(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/星锑.jpg`));
        return false;
    }
    async A22(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/远旅.jpg`));
        return false;
    }
    async A23(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/温妮弗雷德.jpg`));
        return false;
    }
    async A24(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/新巴别塔.jpg`));
        return false;
    }
    async A25(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/角色/梅兰妮.jpg`));
        return false;
    }
}

class showImg3 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^不腐猴爪$/,
                    fnc: 'C1'
                },
                {
                    reg: /^分别善恶之果$/,
                    fnc: 'C2'
                },
                {
                    reg: /^双头形骨架$/,
                    fnc: 'C3'
                },
                {
                    reg: /^啮咬盒$/,
                    fnc: 'C4'
                },
                {
                    reg: /^幸运咒语$/,
                    fnc: 'C5'
                },
                {
                    reg: /^幼龙骨标本$/,
                    fnc: 'C6'
                },
                {
                    reg: /^床下怪物$/,
                    fnc: 'C7'
                },
                {
                    reg: /^未知种根骨$/,
                    fnc: 'C8'
                },
                {
                    reg: /^液化战栗$/,
                    fnc: 'C9'
                },
                {
                    reg: /^清扫咒$/,
                    fnc: 'C10'
                },
                {
                    reg: /^狂人絮语$/,
                    fnc: 'C11'
                },
                {
                    reg: /^百灵百验鸟$/,
                    fnc: 'C12'
                },
                {
                    reg: /^盐封曼德拉$/,
                    fnc: 'C13'
                },
                {
                    reg: /^破碎骨片$/,
                    fnc: 'C14'
                },
                {
                    reg: /^祝圣秘银$/,
                    fnc: 'C15'
                },
                {
                    reg: /^粗糙银锭$/,
                    fnc: 'C16'
                },
                {
                    reg: /^精磨苦盐$/,
                    fnc: 'C17'
                },
                {
                    reg: /^罗马金币$/,
                    fnc: 'C18'
                },
                {
                    reg: /^苦盐簇$/,
                    fnc: 'C19'
                },
                {
                    reg: /^金爪灵摆$/,
                    fnc: 'C20'
                },
                {
                    reg: /^金羊毛$/,
                    fnc: 'C21'
                },
                {
                    reg: /^铂金通灵板$/,
                    fnc: 'C22'
                },
                {
                    reg: /^银光子弹$/,
                    fnc: 'C23'
                },
                {
                    reg: /^银矿原石$/,
                    fnc: 'C24'
                },
                {
                    reg: /^长青剑$/,
                    fnc: 'C25'
                },
                {
                    reg: /^颤颤之齿$/,
                    fnc: 'C26'
                }
            ]
        });
    }
    async C1(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/不腐猴爪.png`));
        return false;
    }
    async C2(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/分别善恶之果.png`));
        return false;
    }
    async C3(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/双头形骨架.png`));
        return false;
    }
    async C4(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/啮咬盒.png`));
        return false;
    }
    async C5(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/幸运咒语.png`));
        return false;
    }
    async C6(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/幼龙骨标本.png`));
        return false;
    }
    async C7(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/床下怪物.png`));
        return false;
    }
    async C8(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/未知种根骨.png`));
        return false;
    }
    async C9(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/液化战栗.png`));
        return false;
    }
    async C10(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/清扫咒.png`));
        return false;
    }
    async C11(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/狂人絮语.png`));
        return false;
    }
    async C12(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/百灵百验鸟.png`));
        return false;
    }
    async C13(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/盐封曼德拉.png`));
        return false;
    }
    async C14(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/破碎骨片.png`));
        return false;
    }
    async C15(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/祝圣秘银.png`));
        return false;
    }
    async C16(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/粗糙银锭.png`));
        return false;
    }
    async C17(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/精磨苦盐.png`));
        return false;
    }
    async C18(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/罗马金币.png`));
        return false;
    }
    async C19(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/苦盐簇.png`));
        return false;
    }
    async C20(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/金爪灵摆.png`));
        return false;
    }
    async C21(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/金羊毛.png`));
        return false;
    }
    async C22(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/铂金通灵板.png`));
        return false;
    }
    async C23(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/银光子弹.png`));
        return false;
    }
    async C24(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/银矿原石.png`));
        return false;
    }
    async C25(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/长青剑.png`));
        return false;
    }
    async C26(e) {
        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/图鉴/道具/颤颤之齿.png`));
        return false;
    }
}

class fenxichouka1 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^大保底概率/,
                    fnc: 'fenxi1'
                }
            ]
        });
    }
    async fenxi1(e) {
        const userId = e.user_id;
        analyzeAndDisplayStats();
        async function analyzeAndDisplayStats() {
            const filePath = `${process
                .cwd()
                .replace(/\\/g, '/')}/application/alemon-plugin-1999/db/抽卡分析/抽卡记录${userId}.json`;
            const file2Data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const isSpecialSixStarNotWhale = true;
            file2Data.reverse();
            let sixStarPullsOverall = 0;
            let misfitPullsOverall = 0;
            const specialSixStar = '';
            file2Data.forEach(pool => {
                const poolName = pool.poolName;
                if (poolName !== '第一滴雨' && poolName !== '于湖中央') {
                    const results = pool.results;
                    let specialSixStar = '';
                    if (poolName === '星的栖居') {
                        specialSixStar = '远旅';
                    }
                    else if (poolName === '剑与盔的撕鸣') {
                        specialSixStar = '未锈铠';
                    }
                    else if (poolName === '望族与隐士') {
                        specialSixStar = '苏芙比';
                    }
                    else if (poolName === '流行即世界') {
                        specialSixStar = '梅兰妮';
                    }
                    else if (poolName === '牧羊犬如是说') {
                        specialSixStar = '皮克勒斯';
                    }
                    else if (poolName === '深林的絮语') {
                        specialSixStar = '槲寄生';
                    }
                    else if (poolName === '弩箭破空而至') {
                        specialSixStar = '红弩箭';
                    }
                    else if (poolName === '仙子振翅入夜') {
                        specialSixStar = '牙仙';
                    }
                    let sixStarPullsInPool = 0;
                    let misfitPullsInPool = 0;
                    results.forEach(result => {
                        if (result.includes('6星')) {
                            sixStarPullsInPool++;
                            if (specialSixStar &&
                                result.includes(specialSixStar) &&
                                isSpecialSixStarNotWhale) {
                                console.log(`正在分析`);
                            }
                            else {
                                misfitPullsInPool++;
                            }
                        }
                    });
                    sixStarPullsOverall += sixStarPullsInPool;
                    misfitPullsOverall += misfitPullsInPool;
                }
            });
            const misfitCount = misfitPullsOverall;
            const notMisfitCount = sixStarPullsOverall - misfitPullsOverall;
            const firstPull = file2Data[0].results[0];
            const lastPull = file2Data[file2Data.length - 1].results[0];
            let isFirstMisfit = false;
            let isLastMisfit = false;
            if (lastPull && lastPull.includes) {
                isFirstMisfit =
                    firstPull.includes('6星') && !firstPull.includes(specialSixStar);
                isLastMisfit =
                    lastPull.includes('6星') && !lastPull.includes(specialSixStar);
            }
            else {
                e.reply('未保存记录');
                return false;
            }
            let overallMisfitProbability = 0;
            if (isFirstMisfit && isLastMisfit) {
                if (misfitCount <= notMisfitCount) {
                    overallMisfitProbability =
                        misfitCount / (sixStarPullsOverall - misfitCount + 1);
                }
                else {
                    overallMisfitProbability = 1;
                }
            }
            else if (isFirstMisfit && !isLastMisfit) {
                if (misfitCount < notMisfitCount) {
                    overallMisfitProbability =
                        misfitCount / (sixStarPullsOverall - misfitCount);
                }
                else {
                    overallMisfitProbability = 1;
                }
            }
            else if (!isFirstMisfit && isLastMisfit) {
                if (misfitCount < notMisfitCount) {
                    overallMisfitProbability =
                        misfitCount / (sixStarPullsOverall - misfitCount);
                }
            }
            else {
                if (misfitCount < notMisfitCount || misfitCount > notMisfitCount) {
                    overallMisfitProbability =
                        misfitCount / (sixStarPullsOverall - misfitCount);
                }
                else {
                    overallMisfitProbability = 1;
                }
                overallMisfitProbability *= 100;
                const textToPrint = `${overallMisfitProbability.toFixed(2)}%`;
                const backgroundImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/大保底/dbd.jpg`;
                const ttffontPath = `./application/alemon-plugin-1999/resources/assets/ttf/SourceHanSerifSC-VF.ttf`;
                const outputImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/大保底/baodi.jpg`;
                await addTextAndSpecialImagesToBackground(textToPrint, backgroundImagePath, ttffontPath, outputImagePath);
                e.reply(getPathBuffer(outputImagePath));
            }
            async function generateTextImage(text, ttffontPath, width, height) {
                const canvas = createCanvas(width, height);
                const ctx = canvas.getContext('2d');
                registerFont(ttffontPath, { family: 'MyFont' });
                ctx.font = '264.67px MyFont';
                ctx.fillStyle = '#545454';
                ctx.textAlign = 'center';
                ctx.fillText(text, width / 2, height / 2);
                const buffer = canvas.toBuffer();
                return buffer;
            }
            async function selectGradeImage(overallMisfitProbability) {
                const gradeImageMap = {
                    'SS': 'SS.png',
                    'S': 'S.png',
                    'A+': 'A+.png',
                    'A': 'A.png',
                    'B+': 'B+.png',
                    'B': 'B.png',
                    'C+': 'C+.png',
                    'C': 'C.png'
                };
                let gradeImage;
                if (overallMisfitProbability >= 0 && overallMisfitProbability < 10) {
                    gradeImage = gradeImageMap['SS'];
                }
                else if (overallMisfitProbability >= 10 &&
                    overallMisfitProbability < 20) {
                    gradeImage = gradeImageMap['S'];
                }
                else if (overallMisfitProbability >= 20 &&
                    overallMisfitProbability < 30) {
                    gradeImage = gradeImageMap['A+'];
                }
                else if (overallMisfitProbability >= 30 &&
                    overallMisfitProbability < 40) {
                    gradeImage = gradeImageMap['A'];
                }
                else if (overallMisfitProbability >= 40 &&
                    overallMisfitProbability < 50) {
                    gradeImage = gradeImageMap['B+'];
                }
                else if (overallMisfitProbability >= 50 &&
                    overallMisfitProbability < 60) {
                    gradeImage = gradeImageMap['B'];
                }
                else if (overallMisfitProbability >= 60 &&
                    overallMisfitProbability < 70) {
                    gradeImage = gradeImageMap['C+'];
                }
                else if (overallMisfitProbability >= 70 &&
                    overallMisfitProbability < 100) {
                    gradeImage = gradeImageMap['C'];
                }
                else {
                    gradeImage = gradeImageMap['C'];
                }
                return gradeImage;
            }
            async function addTextAndSpecialImagesToBackground(text, backgroundImagePath, fontPath, outputImagePath) {
                try {
                    const backgroundImage = await jimp.read(backgroundImagePath);
                    const gradeImageFileName = await selectGradeImage(overallMisfitProbability);
                    const gradeImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/大保底/评级`;
                    const gradeImage = await jimp.read(gradeImagePath);
                    const gradeImageX = 966.2;
                    const gradeImageY = 1583.7;
                    backgroundImage.composite(gradeImage, gradeImageX, gradeImageY);
                    const textImageBuffer = await generateTextImage(text, fontPath, 1069, 400);
                    const textImage = await jimp.read(textImageBuffer);
                    const textImageX = 217;
                    const textImageY = 500;
                    backgroundImage.composite(textImage, textImageX, textImageY);
                    await backgroundImage.writeAsync(outputImagePath);
                    console.log('图片合成成功！');
                }
                catch (error) {
                    console.error('图片合成失败：', error);
                }
            }
        }
    }
}

class fenxichouka2 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^征集分析/,
                    fnc: 'fenxi2'
                }
            ]
        });
    }
    async fenxi2(e) {
        const userId = e.user_id;
        const imageFilePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/fenxi.jpg`;
        const extensionImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/pinjie.jpg`;
        jimp.read(extensionImagePath, async (err, extensionImage) => {
            if (err) {
                console.error('Error reading the extension image:', err);
                return;
            }
            const fontPath = `./application/alemon-plugin-1999/resources/assets/ttf/SourceHanSerifSC-VF.ttf`;
            registerFont(fontPath, { family: 'CustomFont' });
            const newFilePath = `${process
                .cwd()
                .replace(/\\/g, '/')}/application/alemon-plugin-1999/db/抽卡分析/抽卡记录2${userId}.json`;
            if (!existsSync(newFilePath)) {
                e.reply('不存在');
                return;
            }
            const data = fs.readFileSync(newFilePath, 'utf8');
            const newFileData = JSON.parse(data);
            const backgroundImageHeight = 2000;
            const limitedPoolData = processGachaPoolData(newFileData, '限定池（其余卡池）');
            const standardPoolData = processGachaPoolData(newFileData, '常驻池（于湖中央）');
            const novicePoolData = processGachaPoolData(newFileData, '新手池（滴一滴雨）');
            const canvas = createCanvas(1414, 10000);
            const ctx = canvas.getContext('2d');
            ctx.font = '56px CustomFont';
            ctx.fillStyle = '#CA5B2A';
            ctx.fillText(limitedPoolData, 138, 710);
            ctx.fillText(standardPoolData, 575, 710);
            ctx.fillText(novicePoolData, 1003, 710);
            const textImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/text_image.png`;
            const textImageStream = fs.createWriteStream(textImagePath);
            const textImageBuffer = canvas.toBuffer('image/png');
            textImageStream.write(textImageBuffer);
            textImageStream.end();
            jimp.read(imageFilePath, async (err, image) => {
                if (err) {
                    console.error('Error reading the background image:', err);
                    return;
                }
                const textImage = await jimp.read(canvas.toBuffer('image/png'));
                const textMetrics = ctx.measureText(limitedPoolData);
                textMetrics.width;
                const textHeight = textMetrics.actualBoundingBoxAscent +
                    textMetrics.actualBoundingBoxDescent;
                const extensionImageHeight = 767;
                const numExtensions = Math.ceil(textHeight / extensionImageHeight);
                if (textHeight + 710 >= 2000) {
                    const backgroundImage2Height = backgroundImageHeight + extensionImageHeight * (numExtensions - 1);
                    const backgroundImage2 = new jimp(1414, backgroundImage2Height);
                    backgroundImage2.composite(image, 0, 0);
                    for (let i = 0; i < numExtensions; i++) {
                        const extensionImageY = backgroundImageHeight + i * extensionImageHeight;
                        backgroundImage2.composite(extensionImage, 0, extensionImageY);
                    }
                    backgroundImage2.composite(textImage, 0, 0, {
                        mode: jimp.BLEND_SOURCE_OVER,
                        opacitySource: 1,
                        opacityDest: 1
                    });
                    const outputImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/choukafenxi.jpg`;
                    backgroundImage2.write(outputImagePath, async (writeErr) => {
                        if (writeErr) {
                            console.error('Error saving the image:', writeErr);
                            return;
                        }
                        console.log('图片已保存：', outputImagePath);
                        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/choukafenxi.jpg`));
                    });
                }
                else {
                    image.composite(textImage, 0, 0, {
                        mode: jimp.BLEND_SOURCE_OVER,
                        opacitySource: 1,
                        opacityDest: 1
                    });
                    const outputImagePath = `./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/choukafenxi.jpg`;
                    image.write(outputImagePath, async (writeErr) => {
                        if (writeErr) {
                            console.error('Error saving the image:', writeErr);
                            return;
                        }
                        console.log('图片已保存：', outputImagePath);
                        e.reply(getPathBuffer(`./application/alemon-plugin-1999/resources/assets/img/抽卡分析/分析/choukafenxi.jpg`));
                    });
                }
            });
            function processGachaPoolData(data, poolName) {
                const poolData = data.find(pool => pool.poolName === poolName);
                if (poolData) {
                    const results = poolData.results;
                    let prevSixStarIndex = -1;
                    let hasSixStar = false;
                    let totalPulls = 0;
                    let sixStarCount = 0;
                    let analysisResultText = '';
                    results.forEach((result, index) => {
                        const characterName = result.split('(')[0];
                        const star = Number(result.match(/\d+/));
                        totalPulls++;
                        if (star === 6) {
                            sixStarCount++;
                            const matchingSixStarName = characterName;
                            if (matchingSixStarName) {
                                analysisResultText += `${characterName}`;
                                if (prevSixStarIndex !== 0) {
                                    const interval = index - prevSixStarIndex;
                                    analysisResultText += ` (${interval}抽)\n`;
                                }
                                prevSixStarIndex = index;
                                hasSixStar = true;
                            }
                            else {
                                analysisResultText += `${characterName}\n`;
                            }
                        }
                    });
                    if (!hasSixStar) {
                        analysisResultText += `暂无六星\n`;
                    }
                    const sixStarProbability = (sixStarCount / totalPulls) * 100;
                    analysisResultText += `总抽数:${totalPulls}\n概率:${sixStarProbability.toFixed(2)}%\n`;
                    return analysisResultText;
                }
                else {
                    return '无';
                }
            }
        });
    }
}

const cardNameMap$1 = {
    3003: { name: '槲寄生', star: '6星' },
    3004: { name: '红弩箭', star: '6星' },
    3005: { name: '尼克·波顿', star: '4星' },
    3006: { name: '小春雀儿', star: '4星' },
    3007: { name: '未锈铠', star: '6星' },
    3008: { name: '勿忘我', star: '' },
    3009: { name: '苏芙比', star: '6星' },
    3010: { name: 'X', star: '5星' },
    3011: { name: '玛丽莲', star: '5星' },
    3012: { name: '弄臣', star: '3星' },
    3013: { name: '冬', star: '4星' },
    3014: { name: '芭妮芭妮', star: '4星' },
    3015: { name: '狼群', star: '4星' },
    3016: { name: '婴儿蓝', star: '5星' },
    3017: { name: '夏利', star: '5星' },
    3018: { name: '雾行者', star: '4星' },
    3019: { name: '', star: '' },
    3020: { name: '柏林以东', star: '5星' },
    3021: { name: '', star: '' },
    3022: { name: '帕米埃', star: '5星' },
    3023: { name: '十四行诗', star: '5星' },
    3024: { name: '气球派对', star: '5星' },
    3025: { name: '星锑', star: '6星' },
    3026: { name: '红斗篷', star: '4星' },
    3027: { name: '无线电小姐', star: '2星' },
    3028: { name: 'APPLe', star: '4星' },
    3029: { name: '斯奈德', star: '5星' },
    3030: { name: '拉拉泉', star: '3星' },
    3031: { name: '铅玻璃', star: '4星' },
    3032: { name: '百夫长', star: '6星' },
    3033: { name: 'TTT', star: '4星' },
    3034: { name: '星之眼', star: '3星' },
    3035: { name: '莉拉妮', star: '3星' },
    3036: { name: '约翰·提托', star: '3星' },
    3037: { name: '讣告人', star: '5星' },
    3038: { name: '五色月', star: '5星' },
    3039: { name: '泥鯭的士', star: '6星' },
    3040: { name: '丽莎&路易斯', star: '3星' },
    3041: { name: '玛蒂尔达', star: '5星' },
    3042: { name: '爱宠', star: '4星' },
    3043: { name: '坦南特', star: '5星' },
    3044: { name: '莫桑女士', star: '4星' },
    3045: { name: '贝蒂', star: '3星' },
    3046: { name: '吵闹鬼', star: '4星' },
    3047: { name: '兔毛手袋', star: '6星' },
    3048: { name: '远旅', star: '6星' },
    3049: { name: '喀嚓喀嚓', star: '5星' },
    3050: { name: '哒哒达利', star: '3星' },
    3051: { name: '温妮弗雷德', star: '6星' },
    3052: { name: '新巴别塔', star: '6星' },
    3053: { name: '牙仙', star: '6星' },
    3054: { name: '洋葱头', star: '3星' },
    3055: { name: '斯普特尼克', star: '3星' },
    3056: { name: '', star: '' },
    3057: { name: '小梅斯梅尔', star: '4星' },
    3058: { name: '埃里克', star: '4星' },
    3059: { name: '门', star: '2星' },
    3060: { name: '金蜜儿', star: '5星' },
    3061: { name: '', star: '' },
    3062: { name: '梅兰妮', star: '6星' },
    3063: { name: '皮克勒斯', star: '6星' },
    3064: { name: '挖掘艺术', star: '5星' }
};
class fenxichouka extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^征集记录\s+([\S]+)/,
                    fnc: 'fenxi'
                }
            ]
        });
    }
    async fenxi(e) {
        const urlRegex = /^征集记录\s+([\S]+)/;
        const match = e.msg.match(urlRegex);
        if (match && match[1]) {
            const partOfUrl = match[1];
            const completeUrl = `https://game-re-service.sl916.com/query/summon?${partOfUrl}`;
            const decodedUrl = completeUrl.replace(/&amp;/g, '&');
            const userId = e.user_id;
            const jsonFileName = `./application/alemon-plugin-1999/db/抽卡分析/${userId}.json`;
            try {
                const response = await axios.get(decodedUrl);
                const html = response.data;
                fs.writeFileSync(jsonFileName, JSON.stringify(html), 'utf-8');
                console.log('JSON文件保存成功！');
                const filePath = `./application/alemon-plugin-1999/db/抽卡分析/${userId}.json`;
                try {
                    const jsonData = fs.readFileSync(filePath, 'utf-8');
                    const data = JSON.parse(jsonData);
                    const pools = data.data.pageData;
                    const cardPools = _.groupBy(pools, 'poolName');
                    const result = [];
                    for (const poolName in cardPools) {
                        const poolRecords = cardPools[poolName];
                        const reversedRecords = poolRecords.reverse();
                        const poolResults = [];
                        let position = 0;
                        for (const record of reversedRecords) {
                            const gainIds = record.gainIds;
                            for (const gainId of gainIds) {
                                const cardInfo = cardNameMap$1[gainId];
                                const star = cardInfo.star ? `(${cardInfo.star})` : '';
                                position++;
                                const cardResult = `${cardInfo.name}${star} - 第${position}抽`;
                                poolResults.push(cardResult);
                            }
                        }
                        const poolResultObject = {
                            poolName: poolName,
                            results: poolResults
                        };
                        result.push(poolResultObject);
                    }
                    const replyMessage = result.join('\n');
                    const jsonResult = JSON.stringify(result, null, 2);
                    const saveFilePath = `./application/alemon-plugin-1999/db/抽卡分析/抽卡记录${userId}.json`;
                    fs.writeFileSync(saveFilePath, jsonResult, 'utf-8');
                    try {
                        const jsonData = fs.readFileSync(filePath, 'utf-8');
                        const data = JSON.parse(jsonData);
                        const pools = data.data.pageData;
                        const limitedPoolRecords = [];
                        for (const pool of pools) {
                            const isLimitedPool = pool.poolName !== '第一滴雨' && pool.poolName !== '于湖中央';
                            if (isLimitedPool) {
                                limitedPoolRecords.push(pool);
                            }
                        }
                        limitedPoolRecords.sort((a, b) => new Date(a.createTime).getTime() -
                            new Date(b.createTime).getTime());
                        const novicePoolResult = {
                            poolName: '新手池（滴一滴雨）',
                            results: []
                        };
                        const residentPoolResult = {
                            poolName: '常驻池（于湖中央）',
                            results: []
                        };
                        const result = [];
                        for (const pool of pools) {
                            const isLimitedPool = pool.poolName !== '第一滴雨' && pool.poolName !== '于湖中央';
                            if (isLimitedPool) {
                                continue;
                            }
                            const poolRecords = pools
                                .filter(p => p.poolName === pool.poolName)
                                .reverse();
                            const poolResults = [];
                            for (const record of poolRecords) {
                                const gainIds = record.gainIds;
                                for (const gainId of gainIds) {
                                    const cardInfo = cardNameMap$1[gainId];
                                    const star = cardInfo.star ? `(${cardInfo.star})` : '';
                                    const position = poolResults.length + 1;
                                    const cardResult = `${cardInfo.name}${star} - 第${position}抽出`;
                                    poolResults.push(cardResult);
                                }
                            }
                            if (pool.poolName === '第一滴雨') {
                                novicePoolResult.results = poolResults;
                            }
                            else if (pool.poolName === '于湖中央') {
                                residentPoolResult.results = poolResults;
                            }
                        }
                        result.push(novicePoolResult);
                        result.push(residentPoolResult);
                        if (limitedPoolRecords.length > 0) {
                            const limitedPoolResult = {
                                poolName: '限定池（其余卡池）',
                                results: []
                            };
                            for (const record of limitedPoolRecords) {
                                const gainIds = record.gainIds;
                                for (const gainId of gainIds) {
                                    const cardInfo = cardNameMap$1[gainId];
                                    const star = cardInfo.star ? `(${cardInfo.star})` : '';
                                    const position = limitedPoolResult.results.length + 1;
                                    const cardResult = `${cardInfo.name}${star} - 第${position}抽`;
                                    limitedPoolResult.results.push(cardResult);
                                }
                            }
                            result.push(limitedPoolResult);
                        }
                        const replyMessage = result.join('\n');
                        const jsonResult = JSON.stringify(result, null, 2);
                        const saveFilePath = `./application/alemon-plugin-1999/db/抽卡分析/抽卡记录2${userId}.json`;
                        fs.writeFileSync(saveFilePath, jsonResult, 'utf-8');
                        e.reply('记录已保存！');
                    }
                    catch (error) {
                        console.error('读取JSON文件失败:', error);
                        e.reply('读取JSON文件失败，请确认是否已进行抽卡分析或稍后再试。');
                    }
                    return false;
                }
                catch (error) {
                    console.error('请求或保存JSON文件出错:', error);
                    e.reply('token已过期/输入不规范');
                }
            }
            catch (error) {
                console.error('保存JSON文件出错:', error);
            }
        }
    }
}

const cardNameMap = {
    3003: { name: '槲寄生', star: '6星' },
    3004: { name: '红弩箭', star: '6星' },
    3005: { name: '尼克·波顿', star: '4星' },
    3006: { name: '小春雀儿', star: '4星' },
    3007: { name: '未锈铠', star: '6星' },
    3008: { name: '勿忘我', star: '' },
    3009: { name: '苏芙比', star: '6星' },
    3010: { name: 'X', star: '5星' },
    3011: { name: '玛丽莲', star: '5星' },
    3012: { name: '弄臣', star: '3星' },
    3013: { name: '冬', star: '4星' },
    3014: { name: '芭妮芭妮', star: '4星' },
    3015: { name: '狼群', star: '4星' },
    3016: { name: '婴儿蓝', star: '5星' },
    3017: { name: '夏利', star: '5星' },
    3018: { name: '雾行者', star: '4星' },
    3019: { name: '', star: '' },
    3020: { name: '柏林以东', star: '5星' },
    3021: { name: '', star: '' },
    3022: { name: '帕米埃', star: '5星' },
    3023: { name: '十四行诗', star: '5星' },
    3024: { name: '气球派对', star: '5星' },
    3025: { name: '星锑', star: '6星' },
    3026: { name: '红斗篷', star: '4星' },
    3027: { name: '无线电小姐', star: '2星' },
    3028: { name: 'APPLe', star: '4星' },
    3029: { name: '斯奈德', star: '5星' },
    3030: { name: '拉拉泉', star: '3星' },
    3031: { name: '铅玻璃', star: '4星' },
    3032: { name: '百夫长', star: '6星' },
    3033: { name: 'TTT', star: '4星' },
    3034: { name: '星之眼', star: '3星' },
    3035: { name: '莉拉妮', star: '3星' },
    3036: { name: '约翰·提托', star: '3星' },
    3037: { name: '讣告人', star: '5星' },
    3038: { name: '五色月', star: '5星' },
    3039: { name: '泥鯭的士', star: '6星' },
    3040: { name: '丽莎&路易斯', star: '3星' },
    3041: { name: '玛蒂尔达', star: '5星' },
    3042: { name: '爱宠', star: '4星' },
    3043: { name: '坦南特', star: '5星' },
    3044: { name: '莫桑女士', star: '4星' },
    3045: { name: '贝蒂', star: '3星' },
    3046: { name: '吵闹鬼', star: '4星' },
    3047: { name: '兔毛手袋', star: '6星' },
    3048: { name: '远旅', star: '6星' },
    3049: { name: '喀嚓喀嚓', star: '5星' },
    3050: { name: '哒哒达利', star: '3星' },
    3051: { name: '温妮弗雷德', star: '6星' },
    3052: { name: '新巴别塔', star: '6星' },
    3053: { name: '牙仙', star: '6星' },
    3054: { name: '洋葱头', star: '3星' },
    3055: { name: '斯普特尼克', star: '3星' },
    3056: { name: '', star: '' },
    3057: { name: '小梅斯梅尔', star: '4星' },
    3058: { name: '埃里克', star: '4星' },
    3059: { name: '门', star: '2星' },
    3060: { name: '金蜜儿', star: '5星' },
    3061: { name: '', star: '' },
    3062: { name: '梅兰妮', star: '6星' },
    3063: { name: '皮克勒斯', star: '6星' },
    3064: { name: '挖掘艺术', star: '5星' }
};
class fenxichoukaq extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^QQ征集记录\s+([\S]+)/,
                    fnc: 'fenxiq'
                }
            ]
        });
    }
    async fenxiq(e) {
        const urlRegex = /^QQ征集记录\s+([\S]+)/;
        const match = e.msg.match(urlRegex);
        if (match && match[1]) {
            const partOfUrl = match[1];
            const completeUrl = `https://game-re-qq-service.sl916.com/query/summon?${partOfUrl}`;
            const decodedUrl = completeUrl.replace(/&amp;/g, '&');
            const userId = e.msg_id;
            const jsonFileName = `./application/alemon-plugin-1999/db/抽卡分析/${userId}.json`;
            try {
                const response = await axios.get(decodedUrl);
                const html = response.data;
                fs.writeFileSync(jsonFileName, JSON.stringify(html), 'utf-8');
                console.log('JSON文件保存成功！');
                const filePath = `./application/alemon-plugin-1999/db/抽卡分析/${userId}.json`;
                try {
                    const jsonData = fs.readFileSync(filePath, 'utf-8');
                    const data = JSON.parse(jsonData);
                    const pools = data.data.pageData;
                    const cardPools = _.groupBy(pools, 'poolName');
                    const result = [];
                    for (const poolName in cardPools) {
                        const poolRecords = cardPools[poolName];
                        const reversedRecords = poolRecords.reverse();
                        const poolResults = [];
                        let position = 0;
                        for (const record of reversedRecords) {
                            const gainIds = record.gainIds;
                            for (const gainId of gainIds) {
                                const cardInfo = cardNameMap[gainId];
                                const star = cardInfo.star ? `(${cardInfo.star})` : '';
                                position++;
                                const cardResult = `${cardInfo.name}${star} - 第${position}抽`;
                                poolResults.push(cardResult);
                            }
                        }
                        const poolResultObject = {
                            poolName: poolName,
                            results: poolResults
                        };
                        result.push(poolResultObject);
                    }
                    const replyMessage = result.join('\n');
                    const jsonResult = JSON.stringify(result, null, 2);
                    const saveFilePath = `./application/alemon-plugin-1999/db/抽卡分析/抽卡记录${userId}.json`;
                    fs.writeFileSync(saveFilePath, jsonResult, 'utf-8');
                    try {
                        const jsonData = fs.readFileSync(filePath, 'utf-8');
                        const data = JSON.parse(jsonData);
                        const pools = data.data.pageData;
                        const limitedPoolRecords = [];
                        for (const pool of pools) {
                            const isLimitedPool = pool.poolName !== '第一滴雨' && pool.poolName !== '于湖中央';
                            if (isLimitedPool) {
                                limitedPoolRecords.push(pool);
                            }
                        }
                        limitedPoolRecords.sort((a, b) => new Date(a.createTime).getTime() -
                            new Date(b.createTime).getTime());
                        const novicePoolResult = {
                            poolName: '新手池（滴一滴雨）',
                            results: []
                        };
                        const residentPoolResult = {
                            poolName: '常驻池（于湖中央）',
                            results: []
                        };
                        const result = [];
                        for (const pool of pools) {
                            const isLimitedPool = pool.poolName !== '第一滴雨' && pool.poolName !== '于湖中央';
                            if (isLimitedPool) {
                                continue;
                            }
                            const poolRecords = pools
                                .filter(p => p.poolName === pool.poolName)
                                .reverse();
                            const poolResults = [];
                            for (const record of poolRecords) {
                                const gainIds = record.gainIds;
                                for (const gainId of gainIds) {
                                    const cardInfo = cardNameMap[gainId];
                                    const star = cardInfo.star ? `(${cardInfo.star})` : '';
                                    const position = poolResults.length + 1;
                                    const cardResult = `${cardInfo.name}${star} - 第${position}抽出`;
                                    poolResults.push(cardResult);
                                }
                            }
                            if (pool.poolName === '第一滴雨') {
                                novicePoolResult.results = poolResults;
                            }
                            else if (pool.poolName === '于湖中央') {
                                residentPoolResult.results = poolResults;
                            }
                        }
                        result.push(novicePoolResult);
                        result.push(residentPoolResult);
                        if (limitedPoolRecords.length > 0) {
                            const limitedPoolResult = {
                                poolName: '限定池（其余卡池）',
                                results: []
                            };
                            for (const record of limitedPoolRecords) {
                                const gainIds = record.gainIds;
                                for (const gainId of gainIds) {
                                    const cardInfo = cardNameMap[gainId];
                                    const star = cardInfo.star ? `(${cardInfo.star})` : '';
                                    const position = limitedPoolResult.results.length + 1;
                                    const cardResult = `${cardInfo.name}${star} - 第${position}抽`;
                                    limitedPoolResult.results.push(cardResult);
                                }
                            }
                            result.push(limitedPoolResult);
                        }
                        const replyMessage = result.join('\n');
                        const jsonResult = JSON.stringify(result, null, 2);
                        const saveFilePath = `./application/alemon-plugin-1999/db/抽卡分析/抽卡记录2${userId}.json`;
                        fs.writeFileSync(saveFilePath, jsonResult, 'utf-8');
                        e.reply('记录已保存！');
                    }
                    catch (error) {
                        console.error('读取JSON文件失败:', error);
                        e.reply('读取JSON文件失败，请确认是否已进行抽卡分析或稍后再试。');
                    }
                    return false;
                }
                catch (error) {
                    console.error('请求或保存JSON文件出错:', error);
                    e.reply('token已过期/输入不规范');
                }
            }
            catch (error) {
                console.error('保存JSON文件出错:', error);
            }
        }
    }
}

class entext extends plugin {
    constructor() {
        super({
            dsc: '每日一句',
            rule: [
                {
                    reg: '^/每日一句$',
                    fnc: 'en'
                }
            ]
        });
    }
    async en(e) {
        const url = 'https://api.vvhan.com/api/en?type=sj';
        try {
            const response = await axios.get(url);
            const res = response.data.data;
            const zh = res.zh;
            const en = res.en;
            const pic = res.pic;
            await e.reply(zh);
            await e.reply(en);
            await e.reply(pic);
            return true;
        }
        catch (error) {
            console.error('接口请求失败', error);
            await e.reply('接口请求失败');
            return false;
        }
    }
}

class show extends plugin {
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
        });
    }
    async 剧情(e) {
        e.replyByMid(e.msg_id, '以下为剧情目录\n只需要复制下方目录命令@Bot就可以获取该小节的中英对照剧情辣！\n/TH.01-1\n/TH.01-2');
        return false;
    }
    async help(e) {
        e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/help/菜单.png`));
        return false;
    }
    async 听力笔记(e) {
        e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/help/听力笔记.png`));
        return false;
    }
    async 攻略(e) {
        e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/help/攻略.jpg`));
        return false;
    }
    async 征集帮助(e) {
        e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/help/征集帮助.png`));
        return false;
    }
    async 征集分析教程(e) {
        e.reply(getPathBuffer(`/application/alemon-plugin-1999/resources/assets/img/help/征集分析教程.png`));
        return false;
    }
}

export { Box, c, chouka, entext, fenxichouka, fenxichouka1, fenxichouka2, fenxichoukaq, gonglue, show, showI, showImg, showImg2, showImg3, showJ, up, up2 };
