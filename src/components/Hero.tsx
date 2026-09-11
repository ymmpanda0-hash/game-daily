import { ArrowDown } from 'lucide-react';
import { newsItems, promoItems, industryItems, filterAndSortByDate } from '../data/content';
import DateWeather from './DateWeather';

export default function Hero() {
  const today = new Date();
  const stats = {
    news: filterAndSortByDate(newsItems, today).length,
    promos: filterAndSortByDate(promoItems, today).length,
    industry: filterAndSortByDate(industryItems, today).length,
  };

  const statItems = [
    { value: stats.news, label: '条资讯', variant: 'primary' as const },
    { value: stats.promos, label: '条宣发', variant: 'muted' as const },
    { value: stats.industry, label: '条变动', variant: 'surface' as const },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="space-y-6 animate-fade-in-up">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              每日游戏头条
            </h1>
            <DateWeather />
          </div>
          <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
            精选资讯、宣发动态与大厂变动，一站式掌握。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#section-news"
              data-dom-id="hero-cta"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-all hover:brightness-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
            >
              开始阅读
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 animate-fade-in-up animate-delay-200">
          <figure className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={`${import.meta.env.BASE_URL}hero-gaming.jpg`}
              alt="Game Daily 主视觉"
              className="h-56 w-full object-cover sm:h-64 md:h-72 lg:h-80"
              loading="eager"
            />
          </figure>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {statItems.map((stat) => {
              const variantClasses = {
                primary: 'bg-primary text-primary-foreground',
                muted: 'bg-muted text-foreground',
                surface: 'bg-[var(--color-surface-2)] text-foreground',
              };

              return (
                <div
                  key={stat.label}
                  className={`flex h-20 w-20 flex-col items-center justify-center rounded-full shadow-md transition-transform hover:scale-105 sm:h-24 sm:w-24 ${variantClasses[stat.variant]}`}
                >
                  <span className="text-xl font-bold sm:text-2xl">{stat.value}</span>
                  <span className={`text-xs ${stat.variant === 'primary' ? 'opacity-90' : 'opacity-80'}`}>
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
