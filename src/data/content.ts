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
];
