// ============================================================
// 内容数据源
// 把所有资讯、宣发、变动按日期填入下方数组即可。
// 页面打开时会使用访问者设备当前日期，自动筛选出 15 天内（含今天）
// 的最新内容并按日期倒序展示，超过 15 天的旧内容会自动隐藏，
// 无需手动删除或每天编辑/重新部署。
//
// 注意：所有 url 必须真实有效，且 title/summary 与链接内容一致。
// ============================================================

export interface NewsItem {
  id: string;
  tag: string;
  source: string;
  date: string; // 格式：YYYY-MM-DD
  title: string;
  summary: string;
  url: string;
}

export interface PromoItem {
  id: string;
  icon: string;
  date: string; // 格式：YYYY-MM-DD
  title: string;
  summary: string;
  url: string;
}

export interface IndustryItem {
  id: string;
  source: string;
  date: string; // 格式：YYYY-MM-DD
  title: string;
  summary: string;
  url: string;
}

// 展示窗口：最近 N 天（含当天）
export const DISPLAY_WINDOW_DAYS = 15;

/**
 * 判断日期是否在展示窗口内（含当天）
 */
export function isWithinWindow(dateStr: string, today: Date): boolean {
  const itemDate = new Date(dateStr + 'T00:00:00');
  const diffTime = today.getTime() - itemDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= DISPLAY_WINDOW_DAYS;
}

/**
 * 按日期倒序排序并截取展示窗口内的内容
 */
export function filterAndSortByDate<T extends { date: string }>(items: T[], today: Date): T[] {
  return items
    .filter((item) => isWithinWindow(item.date, today))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * 获取一组内容中的最新日期
 */
export function getLatestDate(items: { date: string }[]): string | null {
  if (items.length === 0) return null;
  return items.reduce((latest, item) => (item.date > latest ? item.date : latest), items[0].date);
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    tag: '直面会',
    source: '机核',
    date: '2026-09-09',
    title: '《星之卡比 跃然世界》正式公布：任天堂9月直面会消息汇总',
    summary: '任天堂9月直面会公布多款新作与更新，《星之卡比》全新3D冒险正式亮相。',
    url: 'https://www.gcores.com/articles/219485',
  },
  {
    id: 'news-2',
    tag: '行业',
    source: '篝火营地',
    date: '2026-09-10',
    title: '小岛秀夫新作《PHYSINT》将改由微软发行',
    summary: '小岛秀夫与索尼合作的谍报动作新作《PHYSINT》转由微软接手发行。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260910104736_NjtKhVvDa',
  },
  {
    id: 'news-3',
    tag: '新作',
    source: '游研社',
    date: '2026-09-13',
    title: '《闪电十一人》新作标题确认为《闪电十一人 烈火的革命》',
    summary: 'LEVEL-5 公开《闪电十一人》系列新作正式标题，主角名为降星凪。',
    url: 'https://www.yystv.cn/n/1014755',
  },
  {
    id: 'news-4',
    tag: '更新',
    source: 'IGN 中国',
    date: '2026-09-10',
    title: '《无人深空》十周年更新终于能飞向恒星',
    summary: 'Hello Games 发布"宇宙"大型免费更新，玩家终于可以驶向恒星探索深空。',
    url: 'https://www.ign.com.cn/no-mans-sky/62688/wu-ren-shen-kong-shi-zhou-nian-geng-xin-zhong-yu-neng-fei-xiang-heng-xing',
  },
  {
    id: 'news-5',
    tag: '展览',
    source: '游研社',
    date: '2026-09-13',
    title: '《最终幻想》系列40周年纪念展2027年1月8日至4月4日举办',
    summary: 'SE 宣布《最终幻想》40 周年纪念展将在东京国立博物馆举办，官网及宣传片已上线。',
    url: 'https://www.yystv.cn/n/1014763',
  },
  {
    id: 'news-6',
    tag: 'Demo',
    source: '机核',
    date: '2026-09-10',
    title: '《城堡漂流记》Demo今日上线',
    summary: '从空中堡垒到小小城堡，温馨治愈系建造游戏《城堡漂流记》开放试玩。',
    url: 'https://www.gcores.com/articles/218715',
  },
  {
    id: 'news-7',
    tag: '发售',
    source: '机核',
    date: '2026-09-10',
    title: '支持中文配音：温馨治愈系拼图游戏《木木屋》将于9月17日发售',
    summary: '拼图解谜游戏《木木屋》确认发售日，并将支持中文配音。',
    url: 'https://www.gcores.com/articles/218711',
  },
  {
    id: 'news-8',
    tag: 'DLC',
    source: '机核',
    date: '2026-09-13',
    title: '《吸血鬼幸存者》血月DLC将于8月28日发售',
    summary: '《吸血鬼幸存者》新 DLC"血月"公开发售日，带来全新角色与武器。',
    url: 'https://www.gcores.com/articles/218693',
  },
  {
    id: 'news-9',
    tag: '专访',
    source: '篝火营地',
    date: '2026-09-13',
    title: 'Fami 通专访万代南梦宫娱乐社长宇田川南欧：踏上新征程',
    summary: '《Fami 通》40 周年 VIP 专访，万代南梦宫社长回顾过去并展望新作阵容。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260913235457_fYogxXe1W',
  },
  {
    id: 'news-10',
    tag: '影视',
    source: '机核',
    date: '2026-09-11',
    title: '《战神》真人剧奎爷一角确认由戴夫·巴蒂斯塔接替出演',
    summary: '亚马逊《战神》真人剧公布主演更替，戴夫·巴蒂斯塔将出演奎托斯。',
    url: 'https://www.gcores.com/articles/218636',
  },
  {
    id: 'news-11',
    tag: '赛事',
    source: '机核',
    date: '2026-09-14',
    title: '小红花夺得《炉石传说》世界冠军赛冠军',
    summary: '在暴雪嘉年华现场，小红花击败上届冠军小惕登顶，国服选手实现世界冠军三连冠。',
    url: 'https://www.gcores.com/articles/219680',
  },
  {
    id: 'news-12',
    tag: '赛事',
    source: '机核',
    date: '2026-09-14',
    title: '韩国击败沙特，夺得2026《守望先锋》世界杯冠军',
    summary: '在暴雪嘉年华现场举行的2026年《守望先锋》世界杯中，韩国以4比1击败沙特，第四次夺冠。',
    url: 'https://www.gcores.com/articles/219678',
  },
  {
    id: 'news-13',
    tag: '新作',
    source: '机核',
    date: '2026-09-14',
    title: '《寻星者：余晖》现已开启试玩Demo',
    summary: '团队制RPG《寻星者：余晖》开启试玩Demo，玩家可扮演多种职业在契约诸界展开40到60小时冒险。',
    url: 'https://www.gcores.com/articles/219671',
  },
  {
    id: 'news-14',
    tag: '联动',
    source: '机核',
    date: '2026-09-14',
    title: '《守望先锋》将与《赛博朋克：边缘行者》展开联动',
    summary: '《守望先锋》宣布将联动《赛博朋克：边缘行者》，具体合作内容将在后续公布。',
    url: 'https://www.gcores.com/articles/219679',
  },
  {
    id: 'news-15',
    tag: '新作',
    source: '机核',
    date: '2026-09-17',
    title: '《UN:Me（非我：择谁）》延期至27年发售',
    summary: '集英社游戏宣布，为了进一步提升品质，灵魂抉择冒险游戏《UN:Me》发售日调整至2027年。',
    url: 'https://www.gcores.com/articles/219835',
  },
  {
    id: 'news-16',
    tag: 'Demo',
    source: '机核',
    date: '2026-09-17',
    title: '《骑士盘骑士》全新Steam试玩版现已上线',
    summary: '动作Roguelite《骑士盘骑士》上线全新Demo，可体验三位角色与超过半数软盘武器。',
    url: 'https://www.gcores.com/articles/219822',
  },
  {
    id: 'news-17',
    tag: '发布会',
    source: '机核',
    date: '2026-09-17',
    title: '炎王龙确认登场《怪物猎人荒野：凌越》：卡普空TGS发布会汇总',
    summary: '卡普空发布会确认炎王龙将在《怪物猎人荒野：凌越》登场，并公布《龙之信条2》《街霸6》等新消息。',
    url: 'https://www.gcores.com/articles/219819',
  },
  {
    id: 'news-18',
    tag: 'DLC',
    source: '机核',
    date: '2026-09-17',
    title: '《识质存在》的《洛克人》主题免费DLC将于9月17日上线',
    summary: '卡普空宣布《识质存在》的《洛克人》主题DLC于9月17日免费上线，追加主题服装、BGM与表情。',
    url: 'https://www.gcores.com/articles/219818',
  },
  {
    id: 'news-19',
    tag: '新作',
    source: '机核',
    date: '2026-09-17',
    title: '《卧龙2：凤火连天》定于27年3月4日发售',
    summary: '光荣特库摩宣布《卧龙2：凤火连天》发售日，α体验版现已开放免费下载。',
    url: 'https://www.gcores.com/articles/219790',
  },
  {
    id: 'news-20',
    tag: '联动',
    source: '机核',
    date: '2026-09-17',
    title: '《Apex英雄》VS《街头霸王6》联动正式公布',
    summary: '《Apex英雄》与《街头霸王6》联动将于9月22日至10月13日登场，外卡模式可施展波动拳等招式。',
    url: 'https://www.gcores.com/articles/219773',
  },
  {
    id: 'news-21',
    tag: '新作',
    source: '机核',
    date: '2026-09-20',
    title: '《纸牌巫：魔女决战》将于11月9日发售',
    summary: '结合 Parry、卡组构筑与 Boss Rush 的高难度动作游戏《纸牌巫：魔女决战》将以抢先体验形式发售。',
    url: 'https://www.gcores.com/articles/219942',
  },
  {
    id: 'news-22',
    tag: '喜加一',
    source: '机核',
    date: '2026-09-20',
    title: 'Epic喜加二：《将军 对决》《心灵警探》免费领',
    summary: '即日起至9月24日，玩家可在 Epic 免费领取《将军 对决》与《心灵警探》两款游戏。',
    url: 'https://www.gcores.com/articles/219884',
  },
  {
    id: 'news-23',
    tag: '发售',
    source: '机核',
    date: '2026-09-19',
    title: '168元起：《不朽遗志》公布国区Steam售价及豪华版内容',
    summary: '《不朽遗志》国区标准版168元，豪华版248元，包含剧情DLC，将于10月13日发售。',
    url: 'https://www.gcores.com/articles/219901',
  },
  {
    id: 'news-24',
    tag: '发售',
    source: '机核',
    date: '2026-09-19',
    title: '接近100%好评：《木木屋》全平台首发告捷',
    summary: '温馨解谜冒险游戏《木木屋》全平台发售，Steam好评率接近100%，国区七折后39.9元。',
    url: 'https://www.gcores.com/articles/219897',
  },
  {
    id: 'news-25',
    tag: '新作',
    source: '机核',
    date: '2026-09-18',
    title: '月增100万！《影之刃零》全平台愿望单突破300万大关',
    summary: '《影之刃零》全平台愿望单突破300万，成为2026年Steam发售游戏中愿望单最高作品。',
    url: 'https://www.gcores.com/articles/219868',
  },
  {
    id: 'news-26',
    tag: '发布会',
    source: '机核',
    date: '2026-09-20',
    title: '《古神 风里希》公布最新预告：Xbox TGS2026发布会消息汇总',
    summary: 'Xbox TGS2026发布会公布多款新作消息，包括《PHYSINT》主角人选、《希望之城》发售日等。',
    url: 'https://www.gcores.com/articles/219867',
  },
];

export const promoItems: PromoItem[] = [
  {
    id: 'promo-1',
    icon: 'Store',
    date: '2026-09-09',
    title: '重制版《塞尔达传说 时之笛》11 月 5 日发售',
    summary: '任天堂直面会公布经典重制发售信息，数字版定价 449 港币。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260909100624_LgJv35GRo',
  },
  {
    id: 'promo-2',
    icon: 'Swords',
    date: '2026-09-10',
    title: '《漫威金刚狼》真人宣传视频公开',
    summary: '失眠组发布 PS5 独占新作真人宣传片，人类与变种人命运悬于一线。',
    url: 'https://www.ign.com.cn/marvels-wolverine/62701/man-wei-jin-gang-lang-zhen-ren-xuan-chuan-shi-pin',
  },
  {
    id: 'promo-3',
    icon: 'Crown',
    date: '2026-09-10',
    title: '《流浪地球：望日》正式公布',
    summary: '刘慈欣原著授权，全新游戏首支预告片发布，并上线 Steam 商店页面。',
    url: 'https://www.yystv.cn/n/1014746',
  },
  {
    id: 'promo-4',
    icon: 'Store',
    date: '2026-09-13',
    title: '《幻想生活ｉ》付费DLC“天界列车与幸福终点站”公开',
    summary: '《幻想生活ｉ》首个付费 DLC 公开，带来更多职业、地图与剧情内容。',
    url: 'https://www.yystv.cn/n/1014760',
  },
  {
    id: 'promo-5',
    icon: 'Swords',
    date: '2026-09-14',
    title: '《女神异闻录４ Revival》公布 小熊 角色介绍视频',
    summary: '《女神异闻录4 Revival》公开小熊角色介绍视频，游戏将于 2027 年 2 月 18 日发售。',
    url: 'https://www.yystv.cn/n/1014785',
  },
  {
    id: 'promo-6',
    icon: 'Crown',
    date: '2026-09-11',
    title: '《胧村正怪奇谭》公开游戏内容介绍宣传片“胧流秘传”',
    summary: '香草社风格动作游戏《胧村正怪奇谭》公开宣传片，确认 2027 年 2 月 4 日发售。',
    url: 'https://www.yystv.cn/n/1014762',
  },
  {
    id: 'promo-7',
    icon: 'Store',
    date: '2026-09-12',
    title: '《inZOI》最新试玩+访谈：追求更深的模拟维度｜IGN 中国',
    summary: 'IGN 中国在 TapTap 玩聚节期间试玩《inZOI》，体验全新"画布小镇"UGC 功能。',
    url: 'https://www.ign.com.cn/inzoi/62756/taptap-wan-ju-jie-inzoi-shi-wan-fang-tan-zhui-qiu-geng-shen-de-mo-ni-wei-du-ign-zhong-guo',
  },
  {
    id: 'promo-8',
    icon: 'Crown',
    date: '2026-09-14',
    title: '健身节奏动作游戏《がんばれ！チアリズム》公开作曲家阵容',
    summary: '朝凪担任角色设计、陽向葵ゅか配音的健身节奏动作游戏公开作曲家阵容，预计2027年发售并支持中文。',
    url: 'https://www.yystv.cn/n/1014786',
  },
  {
    id: 'promo-9',
    icon: 'Store',
    date: '2026-09-17',
    title: '《双点博物馆》失落游乐园扩展包将于10月8日发售',
    summary: '《双点博物馆》新扩展包将带领玩家前往废弃游乐场，打造融合博物馆与游乐园的"废氪迪乐园"。',
    url: 'https://www.gcores.com/articles/219823',
  },
  {
    id: 'promo-10',
    icon: 'Crown',
    date: '2026-09-17',
    title: '《龙之信条2：黑暗觉者》公布新宣传片，10月9日发售',
    summary: '卡普空公布《龙之信条2：黑暗觉者》新宣传片，10月9日登陆PS5/Xbox/Steam/Switch2。',
    url: 'https://www.gcores.com/articles/219820',
  },
  {
    id: 'promo-11',
    icon: 'Store',
    date: '2026-09-17',
    title: '《符文世界：龙之荒野》正式版现已推出，系列游戏首次登陆主机平台',
    summary: '《符文世界：龙之荒野》正式登陆PC与主机平台，并同步推出第四次大型更新。',
    url: 'https://www.gcores.com/articles/219785',
  },
  {
    id: 'promo-12',
    icon: 'Swords',
    date: '2026-09-17',
    title: '《荣耀战魂》免费领：育碧40周年庆典现已开启',
    summary: '育碧40周年庆典开启，9月15日至28日可在Ubisoft Connect免费领取《荣耀战魂》标准版。',
    url: 'https://www.gcores.com/articles/219786',
  },
  {
    id: 'promo-13',
    icon: 'Swords',
    date: '2026-09-20',
    title: '《消逝的光芒：困兽》迎来一周年庆典，确认推出实体版',
    summary: '《消逝的光芒：困兽》一周年庆典开启，推出三种实体版本并开启三周周年活动。',
    url: 'https://www.gcores.com/articles/219854',
  },
  {
    id: 'promo-14',
    icon: 'Crown',
    date: '2026-09-20',
    title: '《护林员之路：国家公园模拟器》11月17日推出正式版',
    summary: '《护林员之路》正式版登陆PC与主机，新增双人合作模式与跨平台联机，现已开放预购。',
    url: 'https://www.gcores.com/articles/219898',
  },
  {
    id: 'promo-15',
    icon: 'Store',
    date: '2026-09-20',
    title: '《GTA6》实体原声专辑正式公布',
    summary: 'R星公布《GTA6》实体原声专辑，11月19日发售，包含CD、黑胶及限量版套装。',
    url: 'https://www.gcores.com/articles/219880',
  },
  {
    id: 'promo-16',
    icon: 'Crown',
    date: '2026-09-19',
    title: '《爱氏物语》NS版今日发售，同步公开TGS2026参展信息',
    summary: '《爱氏物语》Switch实体版与下载版发售，收录11种语言，并将参展TGS2026独立游戏展区。',
    url: 'https://www.gcores.com/articles/219852',
  },
];

export const industryItems: IndustryItem[] = [
  {
    id: 'industry-1',
    source: '机核',
    date: '2026-09-10',
    title: '索尼宣布不再与小岛工作室合作打造《PHYSINT》，由微软接手',
    summary: '索尼退出小岛秀夫新作《PHYSINT》发行，微软 Xbox 将接手这一谍报动作项目。',
    url: 'https://www.gcores.com/articles/219505',
  },
  {
    id: 'industry-2',
    source: '篝火营地',
    date: '2026-09-08',
    title: '世嘉社长首度解释为何取消千亿日元"Super Game"计划',
    summary: '世嘉调整大型项目战略，社长公开说明取消"Super Game"背后的决策原因。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260908110823_UWevyOof7',
  },
  {
    id: 'industry-3',
    source: '游研社',
    date: '2026-09-10',
    title: '小岛工作室宣布将进一步深化与 Xbox 的合作',
    summary: '小岛工作室在《PHYSINT》转由微软发行后，表示将与 Xbox 展开更深入合作。',
    url: 'https://www.yystv.cn/n/1014744',
  },
  {
    id: 'industry-4',
    source: '机核',
    date: '2026-09-11',
    title: '《赛博朋克：边缘行者2》公布最新预告，将于10月20日上线',
    summary: 'Netflix 与 CDPR 联合动画《赛博朋克：边缘行者2》公开新预告及上线日期。',
    url: 'https://www.gcores.com/articles/218635',
  },
  {
    id: 'industry-5',
    source: '机核',
    date: '2026-09-11',
    title: '拳头游戏宣布旗下格斗游戏《2XKO》将于年底停止开发',
    summary: '拳头游戏宣布停止《2XKO》开发，该作原计划成为英雄联盟宇宙格斗游戏。',
    url: 'https://www.gcores.com/articles/218634',
  },
  {
    id: 'industry-6',
    source: '机核',
    date: '2026-09-13',
    title: '冠军之神盾闪耀浦江，TI2026在上海圆满落幕',
    summary: '《Dota2》国际邀请赛 TI2026 在上海落幕，Team Spirit 夺得冠军。',
    url: 'https://www.gcores.com/articles/218698',
  },
  {
    id: 'industry-7',
    source: '机核',
    date: '2026-09-13',
    title: '三冠加冕:Team Spirit夺得《Dota2》TI15冠军',
    summary: 'Team Spirit 击败对手夺得 TI15 冠军，成为《Dota2》历史上首支三冠战队。',
    url: 'https://www.gcores.com/articles/218692',
  },
  {
    id: 'industry-8',
    source: '机核',
    date: '2026-09-14',
    title: 'VR《Moss》系列开发商Polyarc Games宣布关闭',
    summary: '以《Moss》系列闻名的西雅图工作室 Polyarc Games 宣布停止运营，并公布了29人员工名单呼吁招聘。',
    url: 'https://www.gcores.com/articles/219664',
  },
  {
    id: 'industry-9',
    source: '机核',
    date: '2026-09-14',
    title: '彭博社透露索尼与小岛秀夫“分手”原因，工作室痛失Decima引擎',
    summary: '索尼退出《PHYSINT》主要因预算、盈利与独占性顾虑，小岛工作室可能无法继续使用Decima引擎。',
    url: 'https://www.gcores.com/articles/219665',
  },
  {
    id: 'industry-10',
    source: '游研社',
    date: '2026-09-16',
    title: 'Netflix宣布将世嘉旗下多个热门游戏系列改编为影视作品',
    summary: 'Netflix宣布将世嘉多个热门游戏改编为影视作品，首个项目为《疯狂出租车》真人喜剧电影。',
    url: 'https://www.yystv.cn/n/1014810',
  },
  {
    id: 'industry-11',
    source: '机核',
    date: '2026-09-17',
    title: 'Steam周销量排行榜：《战狗 WARDOGS》登顶｜2026年9月第2周',
    summary: 'V社公布本周Steam销量榜，《战狗 WARDOGS》登顶，《Halloween: The Game》紧随其后。',
    url: 'https://www.gcores.com/articles/219774',
  },
  {
    id: 'industry-12',
    source: '机核',
    date: '2026-09-20',
    title: '小岛秀夫公布谍报动作游戏《PHYSINT》主角人选',
    summary: '在 Xbox TGS2026 直播中，小岛秀夫公布《PHYSINT》主角将由瑞典演员 Bill Skarsgård 担任。',
    url: 'https://www.gcores.com/articles/219863',
  },
  {
    id: 'industry-13',
    source: '机核',
    date: '2026-09-20',
    title: 'IGN十分：《火焰之纹章：万缕千丝》媒体评分汇总',
    summary: '《火焰之纹章：万缕千丝》发售，Metacritic均分89，IGN给出满分评价。',
    url: 'https://www.gcores.com/articles/219855',
  },
];
