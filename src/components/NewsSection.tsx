import { Newspaper, ExternalLink } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { newsItems } from '../data/content';

export default function NewsSection() {
  return (
    <section id="section-news" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        icon={Newspaper}
        title="每日资讯"
        description="聚焦主机、PC 与硬件领域的最新动态，每天为你打捞值得关注的游戏新闻。"
      />

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {newsItems.map((item, index) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="rounded-full bg-muted px-2.5 py-1 text-foreground">
                {item.tag}
              </span>
              <span>{item.source}</span>
              <span>·</span>
              <span>{item.date}</span>
            </div>
            <h3 className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary sm:text-lg">
              {item.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {item.summary}
            </p>
            <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
              阅读全文
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
