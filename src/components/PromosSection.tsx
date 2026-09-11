import { Megaphone, ExternalLink, Store, Swords, Crown, Calendar } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { sortedPromoItems, lastUpdated, DISPLAY_WINDOW_DAYS } from '../data/content';

const iconMap: Record<string, React.ElementType> = {
  Store,
  Swords,
  Crown,
};

export default function PromosSection() {
  return (
    <section id="section-promos" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        icon={Megaphone}
        title="游戏宣发"
        description="官方商店页、宣传站与品牌页面，追踪你最期待的作品首发入口。"
      />

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>最后更新：{lastUpdated}</span>
        <span className="hidden sm:inline">·</span>
        <span>显示最近 {DISPLAY_WINDOW_DAYS} 天内容</span>
      </div>

      {sortedPromoItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
          最近 {DISPLAY_WINDOW_DAYS} 天内暂无宣发内容，请稍后回来查看。
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {sortedPromoItems.map((item, index) => {
            const Icon = iconMap[item.icon] || Megaphone;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                  <h3 className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                  访问页面
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
