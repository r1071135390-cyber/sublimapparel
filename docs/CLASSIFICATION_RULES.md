# VividPrint — Product Classification Rules

> **Version**: 3.0 (Merged Model)
> **Last updated**: 2026-08-18
> **Status**: Awaiting user confirmation

## 1. Core Philosophy

```
Category  = 服装的"形"  ── 款式 + 用途大类  （12 选 1，互斥）
Scenarios = 产品的"用"  ── 运动 + 场景 + 行业  （66 选 N，多选）
```

**核心原则**：
- **Category 按服装款式**分类（T-Shirt / Pants / Skirt / Vest 等）
- **Scenarios 是单一标签云**，包含 3 大类：
  - **运动项目**（41 个）── Basketball, Yoga, Cycling ...
  - **使用场景**（25 个）── Promotional Swag, Wedding, Sports League ...
  - **行业用途**（暂未单独分类，融入场景）──

**不变量**：
- 每个产品**有且仅有 1 个 category**
- 每个产品**有 0 到 N 个 scenario**（0 表示通用产品）
- 不再有独立的 sports 字段

## 2. Why Merged Model (vs 3-Dimension)

| 维度 | 旧 3 维模型 | 新 2 维合并模型 |
|---|---|---|
| 字段数 | 3（category + sports + scenarios）| 2（category + scenarios）|
| 标签总数 | 13 + 41 + 25 = 79 | 12 + 66 = 78 |
| 标签云 | 41 sports 太多，30%产品打了 41 全选 | 66 scenarios，用户精准搜索 |
| URL 数量 | 79 个 archive 页（13+41+25）| 78 个 archive 页（12+66）|
| 体育项目查找 | 用户找"Basketball"要进 sport 类 | "Basketball" 在 scenarios 中 |
| Archive 页面质量 | 41 sport 中每页 30+ 产品雷同 | 每 scenario 标签产品数 5-15 个 |
| 维护性 | 3 套标签需分别维护 | 1 套标签 + 1 套款式 |

**3-D 问题的根源**：
- 41 个 sport 中约 30 个产品**全打**（"achieve 不准确"）
- 球衣（Basketball Jersey / Soccer Jersey / Hockey Jersey）款式都一样，**分到不同 sport 标签无意义**
- 但客户实际是按款式找（"我要件球衣"），不是按运动找

## 3. Category — 12 个款式（互斥）

| 类别 | 英文 | 含义 | 例子 |
|---|---|---|---|
| 帽子 | **Cap** | 帽子、Beanie | All-Over Print Cap, Beanie |
| T 恤 | **T-Shirt** | T 恤、球衣、Singlet、Gi | Basketball Jersey, Wrestling Singlet, MMA Gi |
| 长袖卫衣 | **Sweatshirt** | 长袖卫衣、运动衫 | Hoodie-Pullover Sweatshirt |
| 背心（无袖） | **Tank Top & Camis** | 无袖上衣、Lycra Top、Rash Guard | Surf Lycra Top, Rash Guard |
| 背心（户外） | **Vest** | 户外背心、安全背心 | Construction Vest, Reflective Vest |
| POLO 衫 | **Polo Shirt** | POLO 衫 | Sublimation Polo |
| 衬衫 | **Shirt** | 长袖衬衫、钓鱼衫 | Fishing Shirt, Long-Sleeve Shirt |
| 外套 | **Jacket** | 夹克、防风服、滑雪服 | Windbreaker, Ski Jacket |
| 裤子 | **Pants** | 短裤、紧身裤、Trunks | Boxing Shorts, Cycling Bib Shorts, Legging |
| 裙子 | **Skirt** | 裙子、连衣裙、体操服 | Cheerleading Dress, Dance Leotard |
| 家居 | **Home** | 围巾、围裙、毛巾、家居服 | Sublimation Scarf, Apron, Beach Towel |
| ~~混合类~~ | ~~**Sportswear**~~ | ~~~~ | ⚠️ 类别名废弃，38 个产品重新归类 |

> **移除 Sportswear 类别** —— 这是之前我误把"运动服装"全塞这里的混乱分类。

## 4. Scenarios — 66 个场景/运动/用途（多选）

### 4.1 25 个现有场景（保留）

```
Promotional Swag, Event & Festival, School & Education, Team & Club,
Sports League, Corporate & Branding, Uniform & Workwear, Retail & Fashion,
Political Campaign, Fundraiser & Charity, Music & Merch, Wedding & Party,
Gift & Souvenir, Construction & Engineering, Express & Logistics,
Hospitality & F&B, Medical & Healthcare, Security & Property, Retail & Supermarket,
Education & School, Corporate & Promo, Transit & Transport, Studio & Gym,
Military, Festival & Holiday
```

### 4.2 41 个运动项目（从 sports 字段合并）

```
AFL, Athletics, Badminton, Baseball, Basketball, Beach, Bowling, Boxing,
Cheer, Cricket, CrossFit, Cycling, Dance, Dive, Esports, Fishing, Football,
Golf, Gym, Hockey, Lacrosse, MMA, Martial Arts, Netball, Pilates, Rugby,
Running, Skate, Skating, Ski, Snowboard, Soccer, Softball, Surf, Swimwear,
Table Tennis, Tennis, Triathlon, Volleyball, Wrestling, Yoga
```

### 4.3 每个产品 1-5 个 Scenario 标签

**不要全打 66 个**！每个产品按"客户实际用得到"打 1-5 个：

| 产品类型 | Scenario 标签 |
|---|---|
| Basketball Jersey | `Basketball, Sports League, Team & Club, School & Education` |
| Cheerleading Dress | `Cheer, School & Education, Sports League, Team & Club` |
| Sublimation Scarf | `Retail & Fashion, Gift & Souvenir, Promotional Swag, Sports League` |
| Construction Vest | `Construction & Engineering, Security & Property, Uniform & Workwear` |
| Beach Sarong | `Beach, Swimwear, Retail & Fashion, Gift & Souvenir` |
| Baby Onesie | `Gift & Souvenir, Retail & Fashion, Wedding & Party` |
| Yoga Set 上衣 | `Yoga, Pilates, Studio & Gym, Gym` |
| Cycling Bib Shorts | `Cycling, Triathlon, Gym` |
| Fishing Shirt | `Fishing, Beach, Sports League` |
| Cap | `Promotional Swag, Sports League, Team & Club, Retail & Fashion` |

## 5. Decision Tree (判断流程)

```
[产品名]
   │
   ▼
Q1: 服装款式是哪个？ (12 选 1)
   │
   ├─ 帽子/Beanie     → Cap
   ├─ T恤/球衣/Gi     → T-Shirt
   ├─ 卫衣             → Sweatshirt
   ├─ 无袖/Lycra/Rash  → Tank Top & Camis
   ├─ 户外背心         → Vest
   ├─ POLO             → Polo Shirt
   ├─ 衬衫/钓鱼衫      → Shirt
   ├─ 外套             → Jacket
   ├─ 裤子/短裤/紧身裤 → Pants
   ├─ 裙子/连衣裙/体操服 → Skirt
   ├─ 围巾/围裙/毛巾/家居服 → Home
   └─ 其他             → T-Shirt (兜底)
   │
   ▼
Q2: 客户用在哪些场景/运动？(1-5 选)
   │
   ├─ 服装款式决定基础场景（运动衫 → 运动场景）
   ├─ 看产品描述/图片识别具体运动
   ├─ 通用产品（围巾、围裙）→ 商业/赠品场景
   └─ 不打无关标签
```

## 6. Examples — 12 个产品典型示例

| 产品名 | Category | Scenarios |
|---|---|---|
| All-Over Print Basketball Jersey | T-Shirt | Basketball, Sports League, Team & Club, School & Education |
| All-Over Print Wrestling Singlet | T-Shirt | Wrestling, MMA, Martial Arts, Sports League |
| All-Over Print Cycling Bib Shorts | Pants | Cycling, Triathlon, Gym |
| All-Over Print Surf Lycra Top | Tank Top & Camis | Surf, Beach, Swimwear, Yoga |
| All-Over Print Cheerleading Dress | Skirt | Cheer, School & Education, Sports League, Team & Club |
| All-Over Print Womens Tank Vest Dress | Tank Top & Camis | Dance, Gym, Yoga, Pilates |
| All-Over Print Hip-Hop Street Dance Outfit | T-Shirt | Dance, Studio & Gym, Performance |
| All-Over Print Construction Vest | Vest | Construction & Engineering, Security & Property, Uniform & Workwear |
| All-Over Print Long Boxing Trunks | Pants | Boxing, MMA, Martial Arts |
| All-Over Print Sublimation Scarf | Home | Retail & Fashion, Gift & Souvenir, Promotional Swag |
| All-Over Print Womens Fishing Shirt | Shirt | Fishing, Beach |
| All-Over Print Yoga Set | T-Shirt (上衣) + Pants (裤子) | Yoga, Pilates, Studio & Gym |

## 7. What Changes for Existing Products

### 7.1 Sports 字段被废弃

```javascript
// 旧结构
{
  number: "0011",
  name: "Basketball Jersey",
  category: "Sportswear",  // ❌ 改为 T-Shirt
  sports: ["Basketball"],  // ❌ 合并到 scenarios
  scenarios: ["Sports League", "Team & Club"],
}

// 新结构
{
  number: "0011",
  name: "Basketball Jersey",
  category: "T-Shirt",     // ✅
  scenarios: [              // ✅ 合并 + 保留
    "Basketball",           // 从 sports 合并
    "Sports League",
    "Team & Club",
    "School & Education",
  ],
}
```

### 7.2 38 个 Sportswear 产品的 Category 重新分配

- **T-Shirt**: 23 个（球衣 / 套装上衣 / Singlet / Gi / Fishing）
- **Pants**: 8 个（Shorts / Legging / Tights / Trunks）
- **Skirt**: 4 个（Dress / Leotard）
- **Vest**: 1 个（其他 Vest）
- **Tank Top & Camis**: 2 个（Tank Vest Dress / Lycra Top）

### 7.3 41 个 sport tag archive URL 的处理

选项 A：直接删除（41 sport 标签全部并入 scenarios，旧 sport URL 404）
选项 B：保留但只 redirect（301 /tag/sport/[slug]/ → /tag/scenario/[slug]/）
选项 C：保留 `/tag/sport/*` 路由显示空页面（无产品）

**待用户决定**

## 8. Forbidden vs Correct

| ❌ Forbidden | ✅ Correct |
|---|---|
| 同一产品打 41 个 sport 全选 | 每产品 1-5 个相关 scenario |
| 把 Fishing Shirt 归为 Sportswear | Fishing Shirt 归 Shirt（按款式） |
| 把 Basketball Jersey 归为 Sportswear | Basketball Jersey 归 T-Shirt（按款式） |
| 运动项目归到 Category | 运动项目归到 Scenarios |
| 重复打 sport 和 scenario | 合并到单一 scenarios 字段 |

## 9. Migration Steps (8 步)

1. 备份 src/lib/products-data.ts 到 .ts.bak
2. 改写 ProductCategory 类型，移除 "Sportswear"
3. 删掉 Product['sports'] 字段
4. 改写 Product['scenarios'] 字段类型为 Scenarios（含 sport + scenario）
5. 写迁移脚本：把每个产品的 sports[] 内容**合并到** scenarios[]
6. 38 个 Sportswear 产品重新分配 category
7. 删除 src/app/tag/sport/* 路由（或 redirect）
8. 跑 build，部署，验证 66 个 scenario archive 全部 200

## 10. Action Items (待你确认)

- [ ] **Q1**: 2 维合并模型是否 OK？sports 并入 scenarios？
- [ ] **Q2**: 41 sport archive URL 是**删除**/**redirect**/**保留**？
- [ ] **Q3**: 38 个 Sportswear 产品的 category 重新分配是否同意？
- [ ] **Q4**: Scenarios 总数 = 66（25 场景 + 41 运动），是否新增更多？
- [ ] **Q5**: 移除 Sportswear category 类型，还是保留（不再被使用）？
