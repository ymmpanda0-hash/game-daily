import { CalendarEvent, calendarEvents } from '../data/content';
import { Calendar, Play, Rocket, Download, Sparkles, CircleDot } from 'lucide-react';

interface GameCalendarProps {
  today?: Date;
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

const typeConfig: Record<
  CalendarEvent['type'],
  { label: string; icon: typeof Play; dot: string }
> = {
  pv: { label: 'PV', icon: Play, dot: 'bg-sky-400' },
  release: { label: '发售', icon: Rocket, dot: 'bg-emerald-400' },
  demo: { label: '试玩', icon: Download, dot: 'bg-violet-400' },
  update: { label: '更新', icon: Sparkles, dot: 'bg-amber-400' },
  event: { label: '节点', icon: CircleDot, dot: 'bg-rose-400' },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function GameCalendar({ today = new Date() }: GameCalendarProps) {
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayKey = formatDateKey(year, month, today.getDate());

  const eventsByDate = calendarEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const key = event.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  const cells: { day: number; current: boolean }[] = [];

  // 上个月填充
  const prevDays = getDaysInMonth(year, month - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, current: false });
  }

  // 当月
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, current: true });
  }

  // 下个月填充，补齐最后一行
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, current: false });
  }

  const monthLabel = `${year}年${month + 1}月`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#0F172A] text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-sky-300 sm:h-5 sm:w-5" />
          <h3 className="text-sm font-bold tracking-wide sm:text-base">大厂新作日历</h3>
        </div>
        <span className="text-xs font-medium text-white/50 sm:text-sm">{monthLabel}</span>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-white/10 text-center">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="py-1.5 text-[10px] font-semibold text-white/40 sm:py-2 sm:text-xs"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid flex-1 auto-rows-fr grid-cols-7">
        {cells.map((cell, index) => {
          const dateKey = cell.current ? formatDateKey(year, month, cell.day) : '';
          const dayEvents = eventsByDate[dateKey] || [];
          const isToday = dateKey === todayKey;

          return (
            <div
              key={index}
              className={`group relative flex min-h-[52px] flex-col border-b border-r border-white/5 p-1 transition-colors last:border-r-0 hover:bg-white/5 sm:min-h-[64px] sm:p-1.5 ${
                cell.current ? 'text-white/90' : 'text-white/20'
              } ${!cell.current ? 'bg-white/[0.02]' : ''}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold sm:h-6 sm:w-6 sm:text-xs ${
                    isToday
                      ? 'bg-sky-500 text-white'
                      : 'text-white/70 group-hover:text-white'
                  }`}
                >
                  {cell.day}
                </span>
                {dayEvents.length > 0 && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-sky-400 sm:h-2 sm:w-2" />
                )}
              </div>

              <div className="mt-auto flex flex-col gap-0.5">
                {dayEvents.slice(0, 1).map((event) => {
                  const config = typeConfig[event.type];
                  const Icon = config.icon;
                  return (
                    <a
                      key={event.id}
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-0.5 rounded px-0.5 py-0.5 transition-colors hover:bg-white/10 sm:gap-1 sm:px-1"
                      title={event.title}
                    >
                      <Icon className={`h-2.5 w-2.5 flex-shrink-0 sm:h-3 sm:w-3 ${config.dot.replace('bg-', 'text-')}`} />
                      <span className="line-clamp-2 text-[9px] leading-tight text-white/80 sm:text-[11px]">
                        {event.title}
                      </span>
                    </a>
                  );
                })}
                {dayEvents.length > 1 && (
                  <span className="text-[8px] text-white/40 sm:text-[10px]">+{dayEvents.length - 1}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-3 py-2 sm:gap-4 sm:px-4">
        {(Object.keys(typeConfig) as CalendarEvent['type'][]).map((type) => {
          const config = typeConfig[type];
          return (
            <div key={type} className="flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${config.dot}`} />
              <span className="text-[9px] text-white/50 sm:text-[10px]">{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
