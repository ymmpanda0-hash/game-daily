import { Gamepad2, Coffee, Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Game Daily 首页',
      text: '每日游戏头条，精选资讯、宣发动态与大厂变动，一站式掌握。',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="mt-8 border-t border-border bg-card sm:mt-12">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <span>Game Daily</span>
            </div>
            <p className="text-sm text-muted-foreground">
              由一位热爱游戏行业的 curator 维护，每日精选值得关注的游戏新闻与行业动态。
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">联系方式</h4>
            <p className="text-sm text-muted-foreground">
              投稿与反馈：
              <a
                href="mailto:hello@gamedaily.example"
                className="text-primary underline-offset-2 hover:underline"
              >
                hello@gamedaily.example
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">分享</h4>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-state-success" />
                  链接已复制
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  分享本站
                </>
              )}
            </button>
            <p className="text-sm text-muted-foreground">
              所有外部链接均指向原始来源，本站仅做聚合与推荐。
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:mt-10 md:flex-row">
          <p>© 2026 Game Daily. 保留所有权利。</p>
          <p className="flex items-center gap-1">
            Made with
            <Coffee className="h-4 w-4" />
            for gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
