import { CalendarEvent, calendarEvents } from '../data/content';
import { Calendar, Play, Rocket } from 'lucide-react';

interface GameCalendarProps {
  today?: Date;
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

const typeConfig: Record<
  CalendarEvent['type'],
  { label: string; icon: typeof Play; dot: string; text: string; glow: string; bg: string }
> = {
  pv: {
    label: '宣发 PV',
    icon: Play,
    dot: 'bg-sky-300',
    text: 'text-sky-100',
    glow: 'shadow-[0_0_10px_rgba(56,189,248,0.25)]',
    bg: 'bg-sky-500/[0.12]',
  },
  release: {
    label: '今日发售',
    icon: Rocket,
    dot: 'bg-rose-300',
    text: 'text-rose-100',
    glow: 'shadow-[0_0_14px_rgba(244,63,94,0.28)]',
    bg: 'bg-rose-500/[0.14]',
  },
};

const RANGE_DAYS = 15;

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function GameCalendar({ today = new Date() }: GameCalendarProps) {
  const base = startOfDay(today);
  const start = addDays(base, -RANGE_DAYS);
  const end = addDays(base, RANGE_DAYS);

  const gridStart = addDays(start, -start.getDay());
  const gridEnd = addDays(end, 6 - end.getDay());
  const todayKey = formatDateKey(base);

  const eventsByDate = calendarEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const key = event.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  const days: Date[] = [];
  for (let d = new Date(gridStart); d.getTime() <= gridEnd.getTime(); d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const rangeLabel =
    start.getMonth() === end.getMonth()
      ? `${base.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日-${end.getDate()}日`
      : `${base.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日 - ${end.getMonth() + 1}月${end.getDate()}日`;

  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/35 text-white shadow-2xl backdrop-blur-2xl">
      {/* Mist / glow background */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[140%] w-[140%] opacity-60 blur-3xl">
        <div className="absolute left-[20%] top-[15%] h-[45%] w-[45%] rounded-full bg-sky-600/20" />
        <div className="absolute bottom-[10%] right-[15%] h-[40%] w-[40%] rounded-full bg-rose-600/15" />
        <div className="absolute left-[45%] top-[40%] h-[35%] w-[35%] rounded-full bg-violet-600/10" />
      </div>

      {/* Fine grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md sm:h-9 sm:w-9">
            <Calendar className="h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/95 sm:text-base">大厂新作日历</h3>
            <p className="hidden text-[10px] text-white/40 sm:block">精选主机 / PC 大作宣发与发售节点</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-md sm:px-4 sm:text-sm">
          {rangeLabel}
        </span>
      </div>

      {/* Weekday headers */}
      <div className="relative grid grid-cols-7 border-b border-white/10 text-center">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-[10px] font-medium tracking-widest text-white/35 sm:py-3 sm:text-xs"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="relative grid auto-rows-fr grid-cols-7 min-w-0">
        {days.map((day, index) => {
          const dateKey = formatDateKey(day);
          const inRange = day.getTime() >= start.getTime() && day.getTime() <= end.getTime();
          const dayEvents = eventsByDate[dateKey] || [];
          const isToday = dateKey === todayKey;
          const releaseEvent = dayEvents.find((e) => e.type === 'release');
          const mainEvent = releaseEvent || dayEvents[0];

          return (
            <div
              key={index}
              className={`group relative flex min-h-[72px] min-w-0 flex-col justify-between overflow-hidden border-b border-r border-white/[0.06] p-1.5 transition-all duration-300 last:border-r-0 hover:bg-white/[0.06] sm:min-h-[96px] sm:p-2.5 ${
                inRange ? 'text-white/90' : 'text-white/25'
              } ${!inRange ? 'bg-white/[0.015]' : ''} ${
                releaseEvent
                  ? `${typeConfig.release.bg} ${typeConfig.release.glow}`
                  : ''
              }`}
            >
              {/* Day number */}
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium sm:h-7 sm:w-7 sm:text-xs ${
                    isToday
                      ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(14,165,233,0.55)]'
                      : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {day.getDate()}
                </span>
                {dayEvents.length > 1 && (
                  <span className="text-[8px] font-medium text-white/30 sm:text-[10px]">
                    +{dayEvents.length - 1}
                  </span>
                )}
              </div>

              {/* Event */}
              <div className="mt-auto flex flex-col gap-1">
                {mainEvent && (
                  <a
                    href={mainEvent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex min-w-0 items-center gap-1 rounded-md border border-white/5 ${typeConfig[mainEvent.type].bg} px-1 py-0.5 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/10 sm:px-1.5 sm:py-1`}
                    title={mainEvent.title}
                  >
                    {(() => {
                      const Icon = typeConfig[mainEvent.type].icon;
                      return (
                        <Icon
                          className={`h-2.5 w-2.5 flex-shrink-0 sm:h-3.5 sm:w-3.5 ${typeConfig[mainEvent.type].dot.replace('bg-', 'text-')}`}
                        />
                      );
                    })()}
                    <span className="line-clamp-2 min-w-0 text-[9px] leading-tight text-white/85 sm:text-xs">
                      {mainEvent.title}
                    </span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="relative flex flex-wrap items-center justify-center gap-4 border-t border-white/10 px-4 py-3 sm:gap-6 sm:py-4">
        {(Object.keys(typeConfig) as CalendarEvent['type'][]).map((type) => {
          const config = typeConfig[type];
          return (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full shadow-[0_0_6px_currentColor] sm:h-2 sm:w-2 ${config.dot}`} />
              <span className="text-[10px] text-white/45 sm:text-xs">{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
