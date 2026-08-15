# SEO Patterns for B2B Trade Sites

B2B 外贸站的 SEO 关键：让 Google 把"全棉全身印 + DDP + MOQ 50"这些长尾词全部抓走。

## 必须做的 5 件事

### 1. sitemap.xml

- 路径：`src/app/sitemap.ts`
- 基础 URL 从环境变量 `COZE_PROJECT_DOMAIN_DEFAULT` 读（**生产域名，不是 sandbox 域名**）
- 包含所有静态页 + 动态页（产品、tag archive、行业案例）
- 输出格式：URL + lastModified + changeFrequency + priority

**Build 时必须设置正确域名**：
```bash
export COZE_PROJECT_DOMAIN_DEFAULT="https://yourdomain.com"
pnpm next build
```

否则 sitemap 会指向 sandbox 域名，Google 会收录测试域名（致命错误）。

### 2. robots.txt

- 路径：`src/app/robots.ts`
- 允许全站抓取
- 指向 sitemap

### 3. JSON-LD 结构化数据

每个页面**至少要有 3-4 个 schema**：

| 页面类型 | 必备 schema |
|---------|-------------|
| 首页 | Organization + WebSite + BreadcrumbList + FAQPage |
| 产品列表 | CollectionPage + ItemList + BreadcrumbList |
| 产品详情 | Product + BreadcrumbList + FAQPage + Offer |
| 行业案例 | Article + BreadcrumbList + FAQPage |
| 标签 archive | CollectionPage + BreadcrumbList + FAQPage + ItemList |
| 联系/询盘 | ContactPage + BreadcrumbList + LocalBusiness |

**FAQPage 最容易被忽略，但 SEO 价值最大** — 至少在首页、产品页、tag archive 页加 4-6 个 FAQ。

### 4. Metadata（每页必填）

```tsx
export const metadata: Metadata = {
  title: "...",                  // 50-60 字符
  description: "...",            // 140-160 字符
  keywords: [...],                // 5-8 个长尾词
  alternates: {
    canonical: "...",             // 自我规范
  },
  openGraph: {...},
  twitter: {...},
}
```

**Title 长度硬规则**：
- Google SERP 截断在 ~60 字符
- 写完务必检查，超过 60 字符会被截断

**Description 长度硬规则**：
- 截断在 ~160 字符
- 写完务必检查

**严禁 title 出现两次相同后缀**：
- ❌ "Custom T-Shirt | SublimApparel | SublimApparel"
- ✅ "Custom T-Shirt Manufacturer | SublimApparel"

### 5. BreadcrumbList

每个页面都加（包括首页）。Google 在 SERP 显示面包屑路径，能显著提高点击率。

## 不要做的 5 件事

### ❌ 不要用 Inter / Roboto / Arial
- 太通用，没有品牌识别度
- 优先选 Manrope / Outfit / Space Grotesk
- 中文字体用思源黑体

### ❌ 不要用蓝紫渐变按钮
- 看着像 2018 年的 SaaS 模板
- 客户会觉得"这又是哪家套壳 AI"

### ❌ 不要堆砌大量文字
- 欧美客户快速扫读，每段不超过 3 行
- 重点信息前置

### ❌ 不要在生产用 sandbox 域名
- 之前 sublimapparel.com 出过这个错，sitemap 全错
- Build 前 `echo $COZE_PROJECT_DOMAIN_DEFAULT` 检查

### ❌ 不要所有页面用同一个 title
- 每个 page 的 title 必须唯一
- 用 `${pageName} | BrandName` 模板 + layout.tsx title template

## 长尾关键词挖掘模板

B2B 外贸站的关键词公式：

```
[产品类型] + [工艺] + [起订量] + [交付方式]
[产品类型] + [用途] + [地区] + [定制]
```

**示例（印花服装）**：
- "all-over print t-shirt MOQ 50"
- "custom sublimation hoodie DDP USA"
- "100% cotton all-over print manufacturer"
- "sublimated cycling kit wholesale"

**示例（钻饰）**：
- "custom rhinestone transfer wholesale"
- "hot fix rhinestone iron-on patches"
- "rhinestone t-shirt manufacturer China"
- "rhinestone applique for dance costume"

每个 tag archive 页面应该有自己的 SEO 关键词（5-8 个 long-tail）。

## 站内链接策略

### 主页 → 产品/Tag
- 主页 Hero 区域的所有关键词（面料、品类）应该可点
- Products 区块每张卡 title + 每个 item 都可点
- Industries 区块每个行业可点

### 产品页 → Tag archive
- 每个产品页的 category、sports、scenarios 标签都链接到对应 archive

### Tag archive → 产品
- Tag archive 列出所有相关产品
- 用 product-catalog 组件做 3 维度交叉筛选

### 行业案例 → 产品
- 每个 cases/[slug]/ 页加 "Related products" 区块
- 用 8 个相关产品填充

## 结构化数据代码示例

```tsx
// JsonLd 组件签名
<JsonLd data={...} />

// 简单用法
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "Product",
  name: "...",
  description: "...",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
}} />

// 多个 schema 用数组
<JsonLd data={[
  breadcrumbSchema,
  productSchema,
  faqSchema
]} />
```

## 上线后的 SEO checklist

- [ ] Google Search Console 提交 sitemap
- [ ] Bing Webmaster Tools 提交 sitemap
- [ ] 检查 robots.txt 是否正确
- [ ] 用 https://search.google.com/test/rich-results 验证 schema
- [ ] 用 https://pagespeed.web.dev/ 测试性能
- [ ] 监控首页 + 关键产品页的 Core Web Vitals

## sublimapparel.com 上线后 SEO 表现

- 100+ 静态页全部被收录
- 99 tag archive 页生成长尾词
- FAQPage schema 帮助产品页拿到 rich snippet
- 修复 sitemap 域名后 2 周内首页排名从 #15 → #5
