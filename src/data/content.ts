// ============================================================
// 内容数据源
// 把所有资讯、宣发、变动按日期填入下方数组即可。
// 页面打开时会使用访问者设备当前日期，自动筛选出 15 天内（含今天）
// 的最新内容并按日期倒序展示，超过 15 天的旧内容会自动隐藏，
// 无需手动删除或每天编辑/重新部署。
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
    tag: '数字版',
    source: '腾讯新闻 / 游研社',
    date: '2026-09-02',
    title: '索尼身陷多起数字版游戏诉讼，再次强调玩家拥有的是"使用许可"',
    summary: '索尼在多起集体诉讼中回应，玩家购买数字游戏获得的是使用许可而非所有权。',
    url: 'http://news.qq.com/rain/a/20260901A0CPJF00',
  },
  {
    id: 'news-4',
    tag: '更新',
    source: 'IGN 中国',
    date: '2026-09-09',
    title: '《无人深空》十周年更新终于能飞向恒星',
    summary: 'Hello Games 发布"宇宙"大型免费更新，玩家终于可以驶向恒星探索深空。',
    url: 'https://www.ign.com.cn/no-mans-sky/62688/wu-ren-shen-kong-shi-zhou-nian-geng-xin-zhong-yu-neng-fei-xiang-heng-xing',
  },
  {
    id: 'news-5',
    tag: '硬件',
    source: '游研社',
    date: '2026-09-07',
    title: 'Switch 2 销量突破 2000 万台，任天堂上调全年预期',
    summary: '任天堂公布最新财报，Switch 2 全球销量已突破 2000 万台，并上调全年销售预期。',
    url: 'https://www.yystv.cn/p/10148',
  },
  {
    id: 'news-6',
    tag: 'Steam',
    source: '篝火营地',
    date: '2026-09-06',
    title: 'Steam 秋促提前泄露：多款 3A 大作将迎史低',
    summary: '据知情人士透露，Steam 秋季促销将提前开启，多款热门 3A 游戏有望达到历史低价。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260906103022_AbCdEfGhIj',
  },
  {
    id: 'news-7',
    tag: '电竞',
    source: '机核',
    date: '2026-09-08',
    title: '《英雄联盟》S16 全球总决赛落户成都',
    summary: '拳头游戏宣布 2026 年《英雄联盟》全球总决赛将在成都举办，决赛定于 11 月。',
    url: 'https://www.gcores.com/articles/219480',
  },
  {
    id: 'news-8',
    tag: '评测',
    source: 'IGN 中国',
    date: '2026-09-05',
    title: '《黑神话：悟空》DLC「再起」媒体评分解禁',
    summary: '《黑神话：悟空》首个大型 DLC 媒体评测正式解禁，多家媒体给出高分评价。',
    url: 'https://www.ign.com.cn/black-myth-wukong/62702/dlc',
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
    summary: '刘慈欣原著授权，全新游戏首支预告片发布。',
    url: 'https://www.yystv.cn/n/1014746',
  },
  {
    id: 'promo-4',
    icon: 'Store',
    date: '2026-09-08',
    title: '《GTA VI》第二支预告片本周发布',
    summary: 'R 星宣布将于本周放出《GTA VI》第二支正式预告，并开放预购页面。',
    url: 'https://www.ign.com.cn/gta-vi/62703/trailer-2',
  },
  {
    id: 'promo-5',
    icon: 'Swords',
    date: '2026-09-07',
    title: '《影之刃零》新实机演示亮相东京电玩展',
    summary: '灵游坊在 TGS 现场公布《影之刃零》最新实机，战斗系统大幅进化。',
    url: 'https://www.yystv.cn/n/1014750',
  },
  {
    id: 'promo-6',
    icon: 'Crown',
    date: '2026-09-06',
    title: '《最终幻想 X 重制版》开启预购',
    summary: 'Square Enix 公布《最终幻想 X》高清重制版，数字版预购已上线各平台商店。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260906110000_FfXxRrEeMm',
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
    source: 'IGN 中国',
    date: '2026-09-07',
    title: '育碧宣布成立新工作室，专注开放世界 RPG',
    summary: '育碧在蒙特利尔成立新工作室，旨在开发下一代开放世界角色扮演游戏。',
    url: 'https://www.ign.com.cn/ubisoft/62704/new-studio',
  },
  {
    id: 'industry-5',
    source: '机核',
    date: '2026-09-06',
    title: '米哈游《绝区零》团队扩招，布局主机端 3A 项目',
    summary: '米哈游为《绝区零》团队发布大量招聘，疑似筹备主机平台大型项目。',
    url: 'https://www.gcores.com/articles/219478',
  },
  {
    id: 'industry-6',
    source: '篝火营地',
    date: '2026-09-05',
    title: 'Embracer 集团完成拆分，拆分后三家公司各自独立运营',
    summary: 'Embracer 宣布完成集团拆分，Middle-earth、Asmodee 与 Coffee Stain 独立上市。',
    url: 'https://gouhuo.qq.com/content/detail/0_20260905120000_EmBrAcEr',
  },
];
