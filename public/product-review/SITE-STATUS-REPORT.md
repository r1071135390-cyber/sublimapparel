# 📊 VividPrint/SublimApparel 现状报告（方向 A 决策依据）

**目标**: 帮用户理解"现状" → 决定"动作 A 的具体内容"

---

## ✅ 现状概览（你网站已经做对的事）

### 1. 网站结构（已经覆盖得很好）
```
/                              ← 首页 ✅
/products/                     ← 6 大类款式 ✅
/products/all/                 ← 100+ 产品（按 garment/sport/scenario 三维过滤）✅
/fabric/                       ← 面料 ✅
  /fabric/polyester/
  /fabric/cotton/
/technique/                    ← 工艺（20 种）✅
  /technique/[slug]/           ← 20 个详情页（sublimation/embroidery/screen-print 等）✅
/shipping/                     ← DDP ✅
/about/                        ← 关于 ✅
/contact/                      ← 联系 ✅
/blog/                         ← 博客 ✅
/cases/[slug]/                 ← 案例（events/political/sports-teams 等）✅
```

### 2. 工艺覆盖（technique 页）
| 工艺 | 状态 | 用途 |
|---|---|---|
| Sublimation | ✅ | 涤纶全身印 |
| All-Over Printing (AOP) | ✅ | 边缘到边缘 |
| Screen Printing | ✅ | 丝印 |
| **Embroidery** | ✅ | 绣花（Polo/Cap/Jacket） |
| DTG | ✅ | 棉 |
| DTF | ✅ | 任意面料 |
| 3D Puff | ✅ | 街头风 |
| 3D Embroidery | ✅ | 立体绣 |
| Rhinestone | ✅ | 烫钻 |
| + 12 个其他工艺 | ✅ | 全覆盖 |

**结论**: 工艺铺垫已经非常充分！✅

### 3. 数据规模
- **120 个产品**（已确认）
- **13 个 Category**（款式）
- **41 个 Sports**（运动）
- **29 个 Scenarios**（场景）
- **120+ 个 tag archive 页面**已部署

### 4. SEO 现状
- **4 项 SEO 改进**已部署：
  - 边缘缓存 s-maxage
  - 二级页关键词
  - 成立年份 2018 统一
  - HSTS 响应头
- JSON-LD FAQ（6 条）
- Sitemap + robots.txt
- 4 工艺关键词已在 metadata

---

## ⚠️ 当前定位 vs 战略定位的偏差

### 现状（网站说的）
> "Yiwu sublimate apparel factory"  
> "Yiwu Sublimation & All-Over Cotton Printing"  
> "Heat Sublimation Apparel Factory"  

**强烈定位 = "热升华服装厂"**（字面意思）

### 战略定位（你说的）
> "活动服装（体育活动、政治活动、广告营销活动）"  
> "中小企业的工装，制服，学校的校服"  
> **核心客户 = B2B 活动+企业+校服**
> **核心工艺 = 热升华（引流）+ 绣花/烫画/丝印（盈利）**

### 偏差
| 维度 | 现状 | 战略 | 影响 |
|---|---|---|---|
| 主标题 | "Heat Sublimation Factory" | "Custom Apparel Manufacturer" | 大 |
| 工艺暗示 | 100% 热升华 | "Sublimation Specialty" + 其他工艺铺垫 | 中 |
| 客户画像 | 球衣/运动服 | 活动/工服/校服 | 中 |
| Products 卡片 | "T-shirts, hoodies, jerseys, racing, cycling, golf" | "T-shirts, hoodies, polos, workwear" | 中 |
| 工艺模块 | 缺独立模块 | 4 工艺卡片 | 小 |

---

## 🎯 方向 A 的"低风险文案微调"清单

### 推荐做（5 项，1-2 天可完成）
1. **Hero 主标题微调**（不破坏 SEO）
   - 现状: "Yiwu sublimate apparel factory"
   - 建议: "Custom Apparel Factory · Yiwu, China"
   - 或: "Yiwu Custom Apparel Factory"（保留 Yiwu SEO 词）

2. **首页新增"4 工艺"模块**（小卡片）
   - 位置: Hero 下方 / Beyond Apparel 上方
   - 4 个: Sublimation ⭐ / Embroidery / Heat Transfer / Screen Print
   - 每个一句话 + 链接到 /technique/

3. **首页/产品/案例 "客户场景" 重排序**
   - Events & Conferences ⭐ 突出
   - Promotional ⭐ 突出
   - Political Campaigns ⭐ 突出
   - Sports 降级

4. **Footer 加一行 "Decoration Methods"**
   - "Sublimation · Embroidery · Heat Transfer · Screen Print"
   - 进 SEO + 暗示工艺多样性

5. **Products 卡片** 文案微调
   - "T-shirts, hoodies, jerseys, racing, cycling, golf, bowling, esports, singlets, leggings, baby onesies"  
   - 微调: "T-shirts, hoodies, polos, workwear, jerseys, accessories"  
   - 把"polos/workwear"前置

### 不建议做（风险/成本高）
- ❌ 改 H1 主标题（SEO 风险大）
- ❌ 改 JSON-LD 核心 schema
- ❌ 改全局 nav 链接
- ❌ 重构产品数据模型
- ❌ 改 site title

---

## 📋 现货+工艺 TSV 模板设计

### 模板名: `09-blanks-and-craft-services.tsv`

### 列结构（14 列）
```
1. number            - 现货编号（4位数字，B001-B200）
2. blank_name        - 现货成衣名称（如 "180gsm Crew Neck T-Shirt Blank"）
3. blank_type        - 款式分类（T-Shirt / Polo / Hoodie / Cap / Vest / etc.）
4. fabric            - 面料（180gsm Cotton / 220gsm French Terry / etc.）
5. color_options     - 可选颜色（White, Black, Navy, Heather Gray...）
6. size_range        - 尺码范围（XS-3XL / One Size / etc.）
7. blank_moq         - 现货 MOQ（无工艺的最低起订量，通常 50-100 pcs）
8. compatible_crafts - 兼容工艺（Sublimation / Embroidery / Heat Transfer / Screen Print）
9. craft_min_order   - 各工艺 MOQ（JSON: {"embroidery":50,"screen_print":100}）
10. price_range_usd  - 单价区间（USD, FOB Yiwu）
11. image_url        - 现货成衣图（待上传）
12. decoration_area  - 可印花/绣花区域（如 "Front chest 10x10cm, Full back 30x35cm"）
13. lead_time_days   - 生产周期（30-45 days for blank + decoration）
14. notes            - 备注（"现货白胚", "可加 logo 织唛", etc.）
```

### 首批数据规划（约 20-30 个）
| 类别 | 数量 | 款式 |
|---|---|---|
| T-Shirt | 6-8 | 180gsm, 200gsm, 220gsm 长/短袖, 圆领/V 领 |
| Polo | 3-4 | 200gsm pique, 220gsm piqué |
| Hoodie | 3-4 | 320gsm, 380gsm, 拉链/套头 |
| Cap | 2-3 | 6-panel, 5-panel, snapback |
| Vest | 1-2 | 安全背心、马甲 |
| 围裙/家居 | 2-3 | 围裙、浴袍 |
| **合计** | **20-25** | |

### 文件部署
- 路径: `/workspace/projects/public/product-review/09-blanks-and-craft-services.tsv`
- 配套 HTML: `/workspace/projects/public/product-review/09-blanks-and-craft-services.html`
- 用户上传图片后，给图片 URL

---

## 🔄 接下来流程

### Step 1: 等你看现状（现在）
- 你已经知道"现状是热升华为视觉主轴"
- 你已经知道"工艺铺垫（technique 页）已经齐全"
- 你已经知道"4 项 SEO 已部署"

### Step 2: 等你说要不要做"现货+工艺 TSV"模板（现在）
- **要**: 我立即创建 09-blanks-and-craft-services.tsv 模板
- **不要**: 我只做方向 A 的 5 项文案微调

### Step 3: 等你说要不要执行 5 项文案微调
- **要**: 我立即开始改首页 Hero / 新增 4 工艺模块 / Footer 等
- **不要**: 暂不动作（你还要想）

### Step 4: Gitee 备份（重要）
- 提供 Gitee Token
- 立即备份当前代码到 Gitee

---

## ⏳ 现在请告诉我

**Q1**: 现状清楚了吗？还要我读什么页面？
- ✅ 够了 / 还要读

**Q2**: 现货+工艺 TSV 模板要不要做？
- ✅ 立即创建 / ⏳ 等等

**Q3**: 5 项文案微调要不要立即开始？
- ✅ 立即开始 / ⏳ 等等

**Q4**: Gitee token 给我了吗？
- 如果没，告诉我"等下次"我跳过
