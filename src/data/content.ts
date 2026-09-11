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
];
