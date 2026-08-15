# Design Tokens & Visual Language

B2B 外贸站的视觉语言：**工业精密 + 视觉冲击**。避免"中国工厂廉价感"。

## 配色方案

### 主色（深色基底）
- `--background: #0A0A0A` — 近黑，工业精密感
- `--card: #1A1A1A` — 深炭灰，卡片背景
- `--foreground: #FFFFFF` — 前景文字

### 中性灰（文字层级）
- `--muted: #6B6B6B` — 弱化文字
- `--muted-foreground: #A0A0A0` — 辅助文字
- `--border: #2A2A2A` — 分割线

### 强调色（CTA / 关键数字）
- `--primary: #FF4D00` — 活力橙红，**主 CTA 按钮**
  - 意象：热升华打印机加热温度
  - 用于：所有 .btn-primary、关键数字（MOQ、Countries）
- `--accent: #00C2FF` — 电光蓝，**辅助强调**
  - 意象：全球物流、电光、速度
  - 用于：DDP / 物流相关元素

### 状态色
- `--success: #00C853` — 成功（如 verified）
- `--warning: #FFB300`
- `--destructive: #FF3D00` — 错误

## ❌ 严禁配色

- ❌ 蓝紫 AI 渐变（`from-blue-600 to-purple-600`）
- ❌ 红色 + 金色中国风
- ❌ Tailwind 原生色（`bg-orange-500`、`text-blue-600`）
- ❌ 浅紫、淡粉等 C 端审美
- ❌ 暗紫 + 亮蓝组合（容易显得"科技但廉价"）

## 字体排版

### 标题字体
- **首选**: Inter, 700/800 weight
- **备选**: Manrope, 700 weight
- **中文回退**: 思源黑体（Source Han Sans CN）

### 正文字体
- Inter, 400/500 weight

### 数字/数据
- 字号放大 + 字重加粗
- 例：`text-7xl font-extrabold tracking-tight`
- 用于：MOQ、交期、Countries、客户数等关键数字

### 排版节奏
- 大标题（`text-5xl` ~ `text-7xl`）
- 小标题（`text-2xl` ~ `text-3xl`）
- 正文（`text-base` ~ `text-lg`）
- 注释（`text-sm text-muted-foreground`）
- 信息密度适中，**留白充足**

## 圆角 & 阴影

- **圆角**: `rounded-lg`（基于 `--radius`），不要写死像素
- **阴影**:
  - 卡片：`shadow-sm`
  - 悬停：`shadow-md`
  - 弹窗：`shadow-xl`

## 动效

- **进入动画**: 区块进视口时淡入上移
- **悬停**: 卡片 `hover:scale-[1.02]`、按钮 `hover:bg-primary/90`
- **过渡**: `transition-all duration-200 ease-out`
- **缓动**: ease-out 为主，不要 linear

## 布局原则

### 网格
- 12 列网格，gap 6（24px）
- 移动端单列、平板 2 列、桌面 3-4 列

### 区块结构
```
section spacing: py-20 md:py-32
container: max-w-7xl mx-auto px-6
```

### 留白
- 不要堆砌文字，欧美客户习惯简洁
- 每个 section 之间至少 py-20
- 重点信息前后留呼吸空间

## 组件规范

### Button
```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Get a quote
</Button>
```

### Card
```tsx
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle>...</CardTitle>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### Badge
```tsx
<Badge className="bg-accent/10 text-accent border-accent/20">
  NEW
</Badge>
```

## 图片方向

- **产品图**: 纯色背景（白/深灰）突出色彩饱和度
- **工厂图**: 暗调 + 暖光，传达规模感
- **不要用**: stock photo 风格的握手/团队合照/笑脸

## 全局 CSS 模板

见 `assets/design-tokens.template.css`，直接复制到 `src/app/globals.css`。
