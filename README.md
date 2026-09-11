# Game Daily 首页

一个基于设计稿搭建的游戏资讯聚合落地页，使用 React + TypeScript + Vite + Tailwind CSS v4 构建。

## 功能特性

- 忠实还原设计稿视觉：配色、圆角、阴影、排版一致
- 响应式多端适配：桌面端、平板端、手机端自动适配
- 移动端专属交互：汉堡菜单、全屏导航遮罩
- 滚动增强：返回顶部按钮、淡入动画
- 社交分享：支持 Web Share API，不支持时自动降级为复制链接
- 可部署为纯静态站点，方便分享到互联网

## 项目结构

```
game-daily/
├── public/                 # 静态资源
│   └── hero-gaming.jpg     # 主视觉图
├── src/
│   ├── components/         # 页面组件
│   ├── data/
│   │   └── content.ts      # 资讯、宣发、变动数据
│   ├── App.tsx             # 页面组合
│   ├── index.css           # Tailwind 主题与全局样式
│   └── main.tsx            # 应用入口
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 本地开发

```bash
npm install
npm run dev
```

默认在 http://localhost:5173 打开。

## 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可直接部署到任意静态托管服务。

## 部署到互联网

### 方式一：Netlify / Vercel

1. 将本项目推送到 GitHub/GitLab/Bitbucket。
2. 在 Netlify 或 Vercel 中选择「导入已有项目」。
3. 构建命令填 `npm run build`，输出目录填 `dist`。
4. 点击部署即可获得可分享的公网链接。

### 方式二：GitHub Pages

1. 将 `dist/` 目录作为分支或提交推送到仓库。
2. 在仓库 Settings > Pages 中选择对应分支作为发布源。
3. 访问 `https://<用户名>.github.io/<仓库名>`。

### 方式三：任意静态服务器

将 `dist/` 目录中的文件上传到 Nginx、Apache、Cloudflare Pages、阿里云 OSS、腾讯云 COS 等静态托管即可。

## 自定义内容

编辑 `src/data/content.ts` 中的 `newsItems`、`promoItems`、`industryItems` 数组即可更新页面内容。统计数据会自动根据数组长度计算。
