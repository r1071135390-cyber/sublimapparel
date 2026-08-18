# Product & Tag Classification Rules

> **3 个维度**：
> - **Category**（互斥，1 个）= 按**款式 + 用途大类**分（如 T-Shirt / Pants / Skirt / Vest / Hoodie / Cap）
> - **Sports**（多选 1-5 个）= 产品**用在哪项运动**（如 Basketball, Soccer, Yoga, Surf）
> - **Scenarios**（多选 2-5 个）= 产品**适合什么场景/行业**（如 Promotional Swag, Event, School）

---

## 1. 数据模型总览

每个产品在 `src/lib/products-data.ts` 中定义 4 个核心字段：

```ts
{
  number: "0001"                              // 唯一编号
  name: "Sublimation Scarf"                   // 产品名
  category: "Home"                            // 1 个类目（互斥）
  sports: ["Beach", "Surf"]                   // 0-5 个运动（多选）
  scenarios: ["Retail & Fashion", ...]        // 0-5 个场景（多选）
}
```

---

## 2. Category 规则

**13 个互斥类目**（每个产品**只能选 1 个**）。分类哲学：**款式 + 用途大类**。

| Category | 款式 / 用途 | 包含 |
|---|---|---|
| **Hoodie** | 帽子/套头衫（含套头运动衫） | Baseball Cap, Beanie |
| **T-Shirt** | 短袖 T 恤 + 长袖 T 恤 + 球衣 + Jersey | T-Shirt, Long-Sleeve, Basketball Jersey, Fishing Shirt, Rugby Jersey, Singlet, Gi, Suit, Wear |
| **Pants** | 裤子 + 短裤 + 紧身裤 + 长裤 | Shorts, Trunks, Legging, Tights, Tracksuit Pant |
| **Sweatshirt** | 卫衣（套头长袖） | Crewneck, Hoodie Sweat |
| **Tank Top & Camis** | 无袖背心 / 紧身背心 | Tank Top, Camisole, Lycra Top, Rash Guard, Tank Vest Dress (0008) |
| **Shirt** | 普通衬衫（非 T 恤） | Button-Down, Dress Shirt |
| **Home** | 家居/非穿着 | Scarf, Apron, Towel, Sarong, Baby Onesie, Jumpsuit |
| **Skirt** | 裙子 / 连衣裙 / 体操服 | Skirt, Dress (非 Tank), Leotard, Cheerleading Dress |
| **Polo Shirt** | POLO 衫 | POLO |
| **Cap** | 帽子 | Baseball Cap, Beanie, Snapback |
| **Jacket** | 外套 | Windbreaker, Ski Jacket, Bomber |
| **Vest** | 背心（带袖孔的） | Construction Vest (0101), Team Vest |
| **Sportswear** ⚠️ 废弃 | （之前是混合类，**不推荐使用**）| - |

### 关键原则

- **按款式大类分**，**不按运动** —— Basketball Jersey / Fishing Shirt 都是 T-Shirt
- **Cheerleading Dress / Netball Dress / Dance Dress** 都是 Skirt/Dress
- **0008 Tank Vest Dress** 是无袖背心 → **Tank Top & Camis**（不是 Vest）
- **0101 Construction Vest** 是有袖孔背心 → **Vest**
- **0001 Scarf** 是家居用品 → **Home**
- **0007 Sleeveless Hoodie** 是 T 恤款式 → **T-Shirt**

---

## 3. Sports 规则

**41 个运动标签**（每个产品**可多选 0-5 个**）。标识产品**用在哪项运动**。

```
AFL, Athletics, Badminton, Baseball, Basketball, Beach, Bowling, Boxing,
Cheer, Cricket, CrossFit, Cycling, Dance, Dive, Esports, Fishing, Football,
Golf, Gym, Hockey, Lacrosse, MMA, Martial Arts, Netball, Pilates, Rugby,
Running, Skate, Skating, Ski, Snowboard, Soccer, Softball, Surf, Swimwear,
Table Tennis, Tennis, Triathlon, Volleyball, Wrestling, Yoga
```

### 推荐范围

| 产品类型 | Sports 数量 | 例子 |
|---|---|---|
| 通用家居/非运动产品 | **0 个** | Scarf, Apron, Baby Onesie, Towel |
| 通用运动上衣 | **1-2 个** | Long-Sleeve Training T-Shirt → Running, Gym |
| 专项运动服装 | **1-3 个** | Basketball Jersey → Basketball |
| 多用途运动套装 | **3-5 个** | Yoga Set → Yoga, Pilates, Gym, Athletics |

### 错误做法

❌ 任何产品**不要打 41 个全选**（这就是当前 archive 页面雷同的根因）
❌ 通用产品**不要硬塞运动**（如 Scarf 打了 41 个运动）

### 正确示例

| 产品 | Sports |
|---|---|
| Sublimation Scarf (0001) | `[]`（无运动属性）|
| Womens Tank Vest Dress (0008) | `["Dance", "Gym", "Athletics"]` |
| Construction Vest (0101) | `[]`（非运动）|
| Basketball Jersey | `["Basketball"]` |
| Yoga Set | `["Yoga", "Pilates", "Gym"]` |
| Beach Sarong | `["Beach", "Swimwear", "Surf"]` |
| Fishing Shirt | `["Fishing"]` |

---

## 4. Scenarios 规则

**25 个场景标签**（每个产品**可多选 2-5 个**）。标识产品**适合什么场景/行业**。

```
Promotional Swag, Event & Festival, School & Education, Team & Club,
Sports League, Corporate & Branding, Uniform & Workwear, Retail & Fashion,
Political Campaign, Fundraiser & Charity, Music & Merch, Wedding & Party,
Gift & Souvenir, Construction & Engineering, Express & Logistics,
Hospitality & F&B, Medical & Healthcare, Security & Property, Retail & Supermarket,
Education & School, Corporate & Promo, Transit & Transport, Studio & Gym,
Military, Festival & Holiday
```

### 推荐范围

| 产品类型 | Scenarios 数量 | 例子 |
|---|---|---|
| 通用家居/非运动产品 | **2-3 个** | Scarf → Retail & Fashion, Gift & Souvenir, Promotional Swag |
| 通用运动上衣 | **2-3 个** | Training T-Shirt → Sports League, Team & Club, School & Education |
| 专项运动服装 | **2-4 个** | Basketball Jersey → Sports League, Team & Club, School & Education |
| 多用途运动套装 | **3-5 个** | Yoga Set → Studio & Gym, Sports League, Team & Club, Health |

### 错误做法

❌ 任何产品**不要打 13+ 个 scenarios**
❌ **不相关**的不要硬塞（如围巾不应该有 Sports League）

### 正确示例

| 产品 | Scenarios |
|---|---|
| Sublimation Scarf (0001) | `["Retail & Fashion", "Gift & Souvenir", "Promotional Swag"]` |
| Womens Tank Vest Dress (0008) | `["Studio & Gym", "Dance", "Retail & Fashion"]` |
| Construction Vest (0101) | `["Construction & Engineering", "Security & Property", "Uniform & Workwear"]` |
| Basketball Jersey | `["Sports League", "Team & Club", "School & Education"]` |
| Baby Onesie | `["Gift & Souvenir", "Retail & Fashion"]` |
| Beach Sarong | `["Beach", "Travel", "Retail & Fashion"]` |

---

## 5. 38 个 Sportswear 产品重新分类规则

**目标**：删除 `Sportswear` 类别，把 38 个产品**按款式**归到 12 个细分类目：

```javascript
function categorizeByName(name) {
  const n = name.toLowerCase();

  // 规则 1: 短裤/紧身裤类 → Pants
  if (n.includes("shorts")) return "Pants";
  if (n.includes("legging")) return "Pants";
  if (n.includes("tights")) return "Pants";
  if (n.includes("swimwear") && n.includes("trunks")) return "Pants";

  // 规则 2: Tank Vest Dress（无袖背心裙）→ Tank Top & Camis
  if (n.includes("tank vest") && n.includes("dress")) return "Tank Top & Camis";

  // 规则 3: 其他 Vest（带袖孔）→ Vest
  if (n.includes("vest")) return "Vest";

  // 规则 4: 紧身面料上衣 → Tank Top & Camis
  if (n.includes("rash guard")) return "Tank Top & Camis";
  if (n.includes("lycra top")) return "Tank Top & Camis";
  if (n.includes("lycra suit")) return "Tank Top & Camis";

  // 规则 5: 体操服/Leotard → Skirt
  if (n.includes("leotard")) return "Skirt";

  // 规则 6: 连衣裙（除 Tank Vest Dress）→ Skirt
  if (n.includes("dress")) return "Skirt";

  // 规则 7: 制服 + 含 skirt → Skirt
  if (n.includes("uniform") && n.includes("skirt")) return "Skirt";
  if (n.includes("uniform") && n.includes("top + skirt")) return "Skirt";

  // 规则 8: 球衣/套装/上衣/钓鱼衫 → T-Shirt
  if (n.includes("jersey")) return "T-Shirt";
  if (n.includes("outfit")) return "T-Shirt";
  if (n.includes("wear") || n.includes("set")) return "T-Shirt";
  if (n.includes("suit") && !n.includes("tracksuit")) return "T-Shirt";
  if (n.includes("gi")) return "T-Shirt";
  if (n.includes("fishing shirt")) return "T-Shirt";

  // 兜底: 全部归 T-Shirt
  return "T-Shirt";
}
```

### 4 个 sports 标签为 41 全选的产品额外修复

| 编号 | 产品名 | 建议 sports |
|---|---|---|
| 0008 | Womens Tank Vest Dress | `["Dance", "Gym", "Athletics"]` |
| 0014 | Womens Tank Bodysuit | `["Dance", "Gym", "Athletics"]` |
| 0018 | Kids Baseball Jersey | `["Baseball", "Softball"]` |
| 0020 | Mens Long-Sleeve T-Shirt | `["Running", "Gym", "Soccer", "Basketball"]` |

---

## 6. 当前状态

| 维度 | 数量 | 问题 |
|---|---|---|
| 产品 | 119 | - |
| Category | 12（去掉 Sportswear）| 38 个产品被错放 Sportswear |
| Sports | 41 | 4 个产品打了 41 全选，29 个产品打了 41 |
| Scenarios | 25 | 22 个产品打了 13+，但相对合理 |

---

## 7. 修改操作流程

1. 下载 `08-sportswear-reclassification-v2.tsv` 看 38 个产品的 new_category
2. 下载 `01-products.tsv` 看 119 个产品的 sports/scenarios
3. 编辑 `src/lib/products-data.ts`：
   - 38 个 product 的 `category: "Sportswear"` → 对应 new_category
   - 4 个 product 的 `sports: [41 个]` → 对应 suggested_sports
4. 重新 build + 部署
5. 验证 13 个 category 页面 + 79 个 tag archive 全部 200
