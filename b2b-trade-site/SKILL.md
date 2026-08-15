---
name: b2b-trade-site
description: 用于搭建面向欧美 B2B 客户的外贸独立站；当用户是中国工厂/制造商想做英文独立站（印花、定制、OEM、ODM 行业等），并且想用 Next.js + Cloudflare Pages 静态导出方案时，触发此 skill。技术栈、设计语言、SEO 模板、部署流程都已经预设好。
---

# B2B Trade Site Framework

B2B 外贸独立站的**完整搭建框架**，沉淀自 sublimapparel.com（义乌热升华印花工厂）的实战经验。
新项目（如 chinarhinestone.com）可一键复用同样的技术栈、设计语言、SEO 模板和部署流程。

## 何时使用

满足以下任一条件时使用：

- 用户是中国工厂/制造商，要做**英文 B2B 独立站**（OEM/ODM 行业）
- 用户已经有同类站（如 sublimapparel.com）并想用**相同方案**做新站
- 用户要建的产品是**可定制、生产型**（服装、印花、礼品、配件、辅料等）
- 目标客户是**欧美 B2B 买家**（赛事承办商、广告商、品牌商、批发商、POD 平台）
- 用户的技术偏好是 **Next.js + 静态导出 + Cloudflare Pages**

## 何时不要使用

- 单纯的中文站、C 端零售、B2C 商城（用其他电商 skill）
- 用户已有 WordPress / Shopify 站，要做内容迁移（用迁移类 skill）
- 用户要 PWA / 复杂 Web App（这个 skill 是静态站）

## 操作步骤

### 第 1 步：收集业务信息

先向用户收集（不能跳过）：

| 信息 | 用途 |
|------|------|
| 公司业务（产品/服务） | 决定页面结构 |
| 目标客户群体 | 决定文案口吻和 SEO 关键词 |
| 工厂能力（产能/产线/认证） | 决定"关于我们"内容 |
| 核心卖点（MOQ/交期/物流） | 决定 Hero + CTA |
| 已有素材（产品图/logo/文案） | 决定能直接复用什么 |
| 域名 | 决定部署目标 |

**完整信息收集模板见 `references/business-discovery.md`。**

### 第 2 步：初始化 Next.js 项目

**必须用 coze CLI**（不能用手动 create-next-app）：

```bash
coze init ${COZE_WORKSPACE_PATH} --template nextjs
```

启动预览：

```bash
pnpm install
coze dev
```

### 第 3 步：配置设计 Token

读取 `references/design-tokens.md`，按照里面的配色方案配置 `src/app/globals.css`。

**关键原则**：
- ❌ 不要硬编码颜色（`#FF4D00`、`bg-orange-500`）
- ❌ 不要用蓝紫 AI 渐变
- ✅ 必须用 `bg-background`、`text-foreground` 等语义化变量
- ✅ 主题色用 `--primary` / `--accent` 引用

### 第 4 步：建立项目结构

读取 `references/project-structure.md`，按照推荐目录组织代码。

**核心目录约定**：
```
src/
├── app/                # 页面路由 + 布局
├── components/
│   ├── ui/             # shadcn 组件
│   ├── layout/         # navbar, footer
│   └── home/           # 首页各区块
├── lib/                # 工具 + 数据
└── hooks/
```

### 第 5 步：实现核心页面

按照以下顺序逐个建（每个页面先列需求再写代码）：

1. **首页 `/`** — Hero + 数据 + 优势 + 产品 + 流程 + 询盘表单
2. **产品页 `/products`** — 6 大品类 + 面料对比 + 100 产品 catalog
3. **关于我们 `/about`** — 工厂 + 能力 + 团队 + 价值观
4. **联系页 `/contact`** — 询盘表单（POST /api/inquiry）
5. **Tag archive 页** — 99 个标签归档页（`/tag/[dimension]/[slug]`）
6. **行业案例页** — 12 个 industry 详情页（`/cases/[slug]`）

**完整页面规格见 `references/page-specs.md`。**

### 第 6 步：注入 SEO

读取 `references/seo-patterns.md`，按照里面的 schema.org 模板注入：

- 每个页面有 `metadata` export（title、description、keywords、openGraph）
- 每个页面渲染 `<JsonLd data={...} />`（Organization + BreadcrumbList + 页面类型 schema）
- 生成 `app/sitemap.ts`（**所有 URL** 包括 tag/products/cases）
- 生成 `app/robots.ts`（指向 sitemap）

### 第 7 步：Build 静态站

```bash
# 必须用 sublimapparel.com 的 build 命令
export COZE_PROJECT_DOMAIN_DEFAULT="https://目标域名.com"
rm -rf out .next
pnpm next build
```

**关键**：`COZE_PROJECT_DOMAIN_DEFAULT` 必须是**真实生产域名**（不是沙箱预览域名），否则 sitemap 全部错误。

清理调试文件：

```bash
find out -name "*.txt" -delete
rm -rf out/logo-concepts out/patches
```

### 第 8 步：打包 + 部署到 Cloudflare Pages

读取 `references/deployment.md`，按流程操作：

1. 打包 out/ 成 zip
2. 用户在 Cloudflare Pages 后台用 Direct Upload
3. 绑定自定义域名

---

## 资源索引

**主流程相关：**

- `references/business-discovery.md` — 第 1 步用：业务信息收集清单
- `references/design-tokens.md` — 第 3 步用：设计 token 配色 + 字体规范
- `references/project-structure.md` — 第 4 步用：推荐目录组织
- `references/page-specs.md` — 第 5 步用：每个页面的内容/组件规格
- `references/seo-patterns.md` — 第 6 步用：metadata + JsonLd + sitemap 模板
- `references/deployment.md` — 第 7-8 步用：Cloudflare Pages 部署流程

**模板和资产：**

- `assets/next-config.template.ts` — 静态导出配置（含 `output: 'export'`）
- `assets/design-tokens.template.css` — globals.css 配色模板
- `assets/sitemap.template.ts` — sitemap.ts 完整模板
- `assets/json-ld.tsx` — JsonLd 组件（避免每页重写）
- `assets/inquiry-form-template.tsx` — 询盘表单组件

---

## 关键设计原则

1. **视觉冲击力 > 信息密度** — 欧美 B2B 客户看 5 秒，决定要不要继续
2. **避免"中国工厂廉价感"** — 不要用蓝色导航栏 + 红色按钮 + 轮播图
3. **暗色 + 强调色 + 留白** — 工业精密感，让产品图成为视觉焦点
4. **数字说话** — 50 MOQ、100+ 国家、15-25 天交期，大字号粗体
5. **信任锚点完整** — 工厂实拍、设备参数、品控流程、认证证书
6. **询盘漏斗清晰** — 每页都有 CTA，单一询盘表单

## 注意事项

- **Hydration 错误预防**：所有 `Date.now()`、`Math.random()`、`typeof window` 都必须包在 `'use client'` + `useEffect` 里
- **JSON-LD 必须用 production 域名**：`metadataBase` 硬编码 + sitemap 用 env var
- **图片用 next/image**：自动优化、懒加载、WebP/AVIF
- **不要用 `<head>` 标签**：用 Next.js `metadata` API
- **Tailwind 4 import 顺序**：`@import "tailwindcss"` 必须在 globals.css 顶部
- **不要用 emoji**：除非用户明确要求

## 沉淀来源

本 Skill 沉淀自 **sublimapparel.com**（义乌热升华印花工厂，欧美 B2B 外贸站，2026 上线）。

成功案例：
- 100+ 产品 catalog
- 99 个 tag archive 页
- 12 个 industry 案例页
- 6.5/10 SEO 评级（自检报告）
- 完整 schema.org（Organization + BreadcrumbList + FAQPage + Product + Service + ItemList + WebPage）
