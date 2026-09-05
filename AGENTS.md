## 用户约定的工作流（IMPORTANT）

- **沙箱优先**: 所有修改默认只在沙箱里进行（`pnpm next build` 验证），**不自动 push**
- **手动部署**: 只有用户明确说"上传"、"部署"、"push"时，才执行 `git commit` + `git push` → 触发 Cloudflare 自动部署到 sublimapparel.com
- **节省时间**: 这样避免每次小改动都等待 Cloudflare 1-2 分钟部署
- **生产现状（截至最后确认）**:
  - Header logo: `/sublimapparel-logo.webp` (PNG backup at `/sublimapparel-logo.png`)
  - Favicon: `/icon.png`（Next.js metadata icons）
  - **重要**：`favicon.ico` 放在 `public/favicon.ico`，**不要**放 `src/app/favicon.ico`（Next.js static export 会把它错误生成为 `/favicon.ico/route` 目录，导致 Cloudflare 拿不到真 .ico 文件，回退成 HTML 404）

# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 项目概述 — VividPrint 外贸工厂官网

### 项目简介
义乌热升华印花服装工厂的英文外贸独立站，面向欧美B2B客户（赛事承办商、广告商、品牌营销团队等），展示全产业链能力和核心卖点（DDP到门、全棉全身印、灵活MOQ）。

### 页面结构
- `/` — 首页：Hero + 数据统计 + 核心优势 + 产品展示 + 供应链流程 + DDP亮点 + 服务行业 + 询盘表单
- `/products` — 产品页：6大品类详细介绍 + 面料对比（涤纶 vs 全棉）
- `/about` — 关于我们：工厂介绍 + 能力展示 + 供应链流程 + 团队 + 价值观
- `/contact` — 联系我们：联系信息 + 询盘表单

### API 接口
- `POST /api/inquiry` — 询盘表单提交（name, email, company, product, quantity, message）

### 组件目录
- `src/components/layout/` — 导航栏 (navbar.tsx)、页脚 (footer.tsx)
- `src/components/home/` — 首页各区块组件（hero, stats-bar, why-us, products-showcase, supply-chain, ddp-highlight, industries, inquiry-form）

### 品牌色
- 主色（深色基底）: `#0a0a0a`
- 强调色（橙红）: `#ff4d00`
- 辅助强调（电光蓝）: `#00c2ff`
- 详见 `DESIGN.md`

## ⚡ 性能优化（已上线，2025-09）

### 关键发现
- **Cloudflare CDN 缓存差异化**（实测 2026-09）：不是所有静态资源都缓存 30 天
  - `/_next/static/*`（CSS/JS chunk）：`s-maxage=300`（5 分钟）—— Next.js 16 默认
  - `/videos/*.mp4`、`/*.webp`（根目录 public 资源）：`s-maxage=2592000`（30 天）
  - **修改同名 CSS/JS 文件 5 分钟内全网生效**，无需改名
  - **视频和图片**：必须用 `-v2.webp`、`-v2.mp4` 后缀改名才能 bust 30 天缓存
  - 验证命令：`curl -sI "https://sublimapparel.com/_next/static/chunks/<hash>.js" | grep -iE "cache|cf-"`
- **Next.js 16 强制注入 polyfill-module.js**：`client/app-globals.js` 硬编码 `require('../build/polyfills/polyfill-module')`，Turbopack resolveAlias 不能拦截，必须直接 patch 源文件。
- **PageSpeed "网络依赖关系树" 报告里的 clarity/voltas 是误报**：是 PageSpeed 测试浏览器自己的请求，不是页面发的。验证：本地 grep + 实际 curl HTML 都没这些脚本。

### 永久性能 patch

1. **`scripts/patch-next-polyfill.mjs`**：把 Next.js 自带 polyfill 替换成空模块
   - 由 `package.json` 的 `postinstall` 钩子自动跑
   - `pnpm install` 不会覆盖修复
   - 文件带内容标记，重复跑幂等

2. **`scripts/inline-css.mjs`**：把 Next.js 生成的 Tailwind CSS chunk inline 到所有 HTML
   - 由 `scripts/build.sh` 在 `next build` 之后调用
   - 消除 CSS 渲染阻塞（节省 ~360ms）
   - CSS 文件 30+ KiB 跟随 HTML 一起 gzipped

3. **`scripts/optimize-images-v2.mjs`**：图片优化 + cache-bust 改名
   - **重要**：永远用 `-v2` 后缀改名，**不要**用 `?v=2` 查询字符串
   - 适用场景：视频 (`/videos/*`) 和根目录图片 (`/*.webp`)，这些资源 30 天 CDN 缓存
   - 不适用：CSS/JS (`/_next/static/*`)，那些 5 分钟就过期，不需要改

### 维护注意事项

- **不要在 `package.json` 删除 `postinstall`**：否则 polyfill patch 会被 `pnpm install` 覆盖
- **新加图片/视频时**走 `optimize-images-v2.mjs` 流程：先优化再 `sharp` resize，再以 `-vX.webp` / `-vX.mp4` 命名
- **修改 CSS/JS 后**：等 5 分钟即可全网生效（不需要改名）
- **修改视频/图片后**：必须用 `-vX` 后缀改名（或等 30 天 CDN 自动过期）
- **跑 PageSpeed 看到 "clarity/voltas 注入" 直接忽略**：已确认是 PageSpeed 测试浏览器自带的请求，不是页面发的

### 优化效果（截至 2025-09）

| 优化项 | 节省 |
|--------|------|
| CSS inline | 360ms 渲染阻塞 |
| content-visibility: auto | ~700ms Style & Layout |
| Polyfill patch | 13.5 KB gzipped |
| 4 张图优化 + cache-bust | 33 KB |
| Logo width/height | CLS 修复 |
| Cloudflare RUM 关闭 | 1,074ms 关键路径 |
| Cloudflare Email Obfuscation 关闭 | 395ms 关键路径 |
