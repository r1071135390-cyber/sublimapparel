# Project Structure & Architecture

B2B 外贸站推荐的 Next.js 16 项目结构。基于 sublimapparel.com 实战验证。

## 目录结构

```
/workspace/projects/yourproject/
├── public/                     # 静态资源（图片、favicon、logo）
│   ├── images/                 # 通用图片
│   ├── products/               # 产品图
│   ├── fabric/                 # 面料图
│   ├── cases/                  # 行业案例图
│   └── logo-main.webp          # 站点 logo
├── scripts/                    # 构建与启动脚本
│   ├── build.sh
│   ├── dev.sh
│   └── start.sh
├── src/
│   ├── app/                    # 页面路由（App Router）
│   │   ├── page.tsx            # 首页 /
│   │   ├── layout.tsx          # 根布局
│   │   ├── globals.css         # 全局样式 + design tokens
│   │   ├── sitemap.ts          # 自动生成 sitemap.xml
│   │   ├── robots.ts           # robots.txt
│   │   ├── products/
│   │   │   ├── page.tsx        # /products 概览
│   │   │   ├── [category]/     # /products/t-shirts 等
│   │   │   └── all/            # /products/all 100 产品目录
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── fabric/
│   │   │   ├── page.tsx        # /fabric 总览
│   │   │   ├── cotton/page.tsx
│   │   │   └── polyester/page.tsx
│   │   ├── tag/
│   │   │   └── [dimension]/
│   │   │       └── [slug]/page.tsx  # 99 个 tag archive
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   ├── factory/page.tsx
│   │   │   ├── production/page.tsx
│   │   │   └── quality/page.tsx
│   │   ├── cases/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx    # 12 个行业
│   │   ├── contact/page.tsx
│   │   ├── get-a-quote/page.tsx
│   │   ├── technique/page.tsx
│   │   ├── shipping-policy/page.tsx
│   │   ├── shipping/
│   │   │   ├── page.tsx
│   │   │   └── ddp/page.tsx
│   │   ├── all-over-print/page.tsx
│   │   └── api/
│   │       └── inquiry/route.ts    # 询盘表单 API
│   ├── components/
│   │   ├── ui/                 # shadcn 组件库（自动生成）
│   │   ├── layout/             # 导航栏、页脚
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── home/               # 首页各区块
│   │   │   ├── hero.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── why-us.tsx
│   │   │   ├── products-showcase.tsx
│   │   │   ├── supply-chain.tsx
│   │   │   ├── ddp-highlight.tsx
│   │   │   ├── industries.tsx
│   │   │   └── inquiry-form.tsx
│   │   ├── product-catalog.tsx
│   │   ├── case-card.tsx
│   │   └── json-ld.tsx         # 通用 JSON-LD 组件
│   ├── lib/                    # 数据 + 工具
│   │   ├── products-data.ts    # 100 产品数据
│   │   ├── tag-archive.ts      # 99 tag 数据
│   │   ├── fabric-data.ts
│   │   ├── cases.ts
│   │   ├── tag-utils.ts        # tagLink / resolveTagLink
│   │   ├── breadcrumb.ts       # 面包屑生成
│   │   ├── json-ld-data.ts     # Organization schema
│   │   ├── metadata.ts         # 通用 metadata 工厂
│   │   └── utils.ts            # cn() 工具
│   └── server.ts               # 自定义 server（如果用）
├── next.config.ts
├── package.json
├── tsconfig.json
└── .coze                       # Cloudflare 启动配置
```

## 关键文件说明

### `next.config.ts`

```ts
const nextConfig = {
  output: 'export',           // 静态导出，部署到 Cloudflare Pages
  images: { unoptimized: true },  // 静态导出必须
  trailingSlash: false,
  reactStrictMode: true,
}
export default nextConfig;
```

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'
export const dynamic = 'force-static'
const BASE = process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'https://yourdomain.com'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    // ...其他页面
  ]
}
```

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 数据驱动 vs 硬编码

### ✅ 推荐数据驱动
- 产品列表（100 个）
- Tag 列表（99 个）
- 行业案例（12 个）
- 面料对比

每条数据用 TS interface 定义，导出常量数组。**所有页面从统一数据源渲染**，保证一致性。

### ✅ 可以硬编码
- 公司介绍文字
- FAQ 内容
- 政策条款
- Blog 文章

## 页面渲染策略

### SSG（默认）
所有页面用 `generateStaticParams` 预渲染。99 tag × 3 维度 = 99 个静态页。

```tsx
export async function generateStaticParams() {
  return allTags.map(t => ({ dimension: t.dimension, slug: t.slug }))
}
```

### ISR（不推荐用）
静态导出模式不支持 ISR。

### Client-side fetch
**避免**：静态站没有运行时 fetch，会失败。

## API Routes

静态导出模式 **不支持 API routes**（Next.js 限制）。询盘表单解决方案：

### 方案 A：Formspree / Getform
```tsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <input name="email" />
  <button>Send</button>
</form>
```

### 方案 B：mailto
```tsx
<a href="mailto:info@yourdomain.com?subject=Inquiry&body=...">Email us</a>
```

### 方案 C：第三方
- Tally.so
- Typeform
- Google Forms

## 组件复用原则

### 高复用（放 src/components/）
- Navbar
- Footer
- ProductCard
- CaseCard
- InquiryForm
- JsonLd
- Breadcrumb

### 低复用（放 page.tsx 内）
- Hero 区域
- 一次性活动页

## 数据类型定义示例

```ts
// src/lib/products-data.ts
export interface Product {
  id: string                    // 'tshirts-cotton-allover'
  slug: string                  // 'custom-tshirt-all-over-print'
  name: string                  // 'Custom Cotton T-Shirt...'
  category: string              // 'T-Shirt'
  sports: string[]              // ['Running', 'Cycling']
  scenarios: string[]           // ['Marathons', 'Team Events']
  fabric: string[]              // ['100% Cotton', 'Polyester']
  description: string
  image: string                 // '/products/tshirt-1.webp'
  features: string[]
  faqs?: { q: string; a: string }[]
}
```

## 注意事项

- 不要把大图直接放 git（用 .gitignore 排除 out/、.next/、node_modules/）
- Logo 用 .webp 格式（小且清晰）
- 产品图至少 1000x1000 像素
- favicon 用 .ico 32x32 或 .png 192x192
