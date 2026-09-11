import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Snowflake, CloudLightning, Wind, Droplets, Loader2 } from 'lucide-react';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

const weatherIcons: Record<string, React.ElementType> = {
  clear: Sun,
  cloudy: Cloud,
  rain: CloudRain,
  snow: Snowflake,
  thunder: CloudLightning,
  fog: Wind,
  drizzle: Droplets,
};

function getWeatherIcon(code: number) {
  if (code === 0) return 'clear';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'thunder';
  return 'cloudy';
}

function getWeatherDescription(code: number) {
  const descriptions: Record<number, string> = {
    0: '晴朗',
    1: '大部晴朗', 2: '多云', 3: '阴天',
    45: '雾', 48: '雾凇',
    51: '毛毛雨', 53: '中雨', 55: '大雨',
    61: '小雨', 63: '中雨', 65: '大雨',
    71: '小雪', 73: '中雪', 75: '大雪',
    80: '阵雨', 81: '强阵雨', 82: '暴雨',
    95: '雷雨', 96: '雷雨伴冰雹', 99: '强雷雨伴冰雹',
  };
  return descriptions[code] || '多云';
}

export default function DateWeather() {
  const [dateStr, setDateStr] = useState('');
  const [weekStr, setWeekStr] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const weekOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
    setDateStr(now.toLocaleDateString('zh-CN', dateOptions));
    setWeekStr(now.toLocaleDateString('zh-CN', weekOptions));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async (lat: number, lon: number, city: string) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
        );
        if (!res.ok) throw new Error('Weather fetch failed');
        const data = await res.json();
        if (cancelled) return;
        const code = data.current_weather.weathercode;
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          description: getWeatherDescription(code),
          icon: getWeatherIcon(code),
          city,
        });
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const fallback = () => fetchWeather(39.9042, 116.4074, '北京');

    if (!navigator.geolocation) {
      fallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude, '本地');
      },
      () => {
        fallback();
      },
      { timeout: 8000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const WeatherIcon = weather ? weatherIcons[weather.icon] || Cloud : Cloud;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span className="text-foreground">{dateStr}</span>
        <span className="hidden sm:inline">·</span>
        <span>{weekStr}</span>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">天气加载中</span>
          </>
        ) : error || !weather ? (
          <>
            <Cloud className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">天气暂不可用</span>
          </>
        ) : (
          <>
            <WeatherIcon className="h-4 w-4 text-primary" />
            <span className="text-foreground">{weather.city}</span>
            <span className="text-muted-foreground">{weather.description}</span>
            <span className="font-semibold text-foreground">{weather.temp}°C</span>
          </>
        )}
      </div>
    </div>
  );
}
