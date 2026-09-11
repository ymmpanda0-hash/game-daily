import { Megaphone, ExternalLink, Store, Swords, Crown } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { promoItems } from '../data/content';

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

      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {promoItems.map((item, index) => {
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
    </section>
  );
}
