# Deployment to Cloudflare Pages (Direct Upload)

当 **GitHub 不可用**（账号被封 / 不想用 Git）时的部署流程。这是 sublimapparel.com 验证过的方法。

## 前提条件

- 域名 DNS 在 Cloudflare 管理
- 沙箱里 pnpm + node 可用
- 项目已配置 `output: 'export'`（见 next.config.ts 模板）

## 部署流程（5 步）

### 第 1 步：Build 静态站

```bash
cd /workspace/projects

# ⚠️ 关键：用生产域名，不是 sandbox 域名
export COZE_PROJECT_DOMAIN_DEFAULT="https://yourdomain.com"

# Clean & build
rm -rf out .next
pnpm next build
```

**Build 输出**：
- `out/` 文件夹包含所有静态文件
- 应该有 `out/index.html`、`out/sitemap.xml`、`out/robots.txt` 等

### 第 2 步：清理调试文件

```bash
# 删除 .txt 调试文件（Next.js 会生成 __next._index.txt 等）
find out -name "*.txt" -delete

# 删除开发阶段产物（如果存在）
rm -rf out/logo-concepts
rm -rf out/.next
```

### 第 3 步：打包成 zip

```bash
# 用 Python zipfile（不需要安装 zip）
python3 -c "
import zipfile, os
out_dir = '/workspace/projects/out'
zip_path = '/tmp/site.zip'
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
    for root, dirs, files in os.walk(out_dir):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, '/workspace/projects')  # 保留 out/ 前缀
            zf.write(full, rel)
print('Zip size:', os.path.getsize(zip_path), 'bytes')
"
```

**重要：保留 out/ 前缀**，否则解压后用户找不到 out 文件夹。

### 第 4 步：上传到沙箱 public/ 给用户下载

```bash
cp /tmp/site.zip /workspace/projects/public/site.zip

# 沙箱外网域名（30 天有效）
# https://{sandbox-id}.dev.coze.site/site.zip
```

### 第 5 步：用户下载 + 上传到 Cloudflare

用户在 Cloudflare 操作：
1. Workers & Pages → 选项目（或 Create new）
2. Settings → Disconnect GitHub（如果之前连过）
3. Create deployment → Direct Upload
4. 解压 zip → 把 `out` 文件夹拖到上传框
5. Save and deploy

## 用户操作 Cloudflare 完整流程

### A. 首次创建项目
1. https://dash.cloudflare.com/ → **Workers & Pages**
2. **Create application** → **Pages** → **Upload assets**
3. 填项目名（**注意：项目名一旦创建不能改**）
4. 拖 out/ 文件夹 → Save and deploy

### B. 更新现有项目
1. 选项目 → Settings → **Builds & deployments** → Disconnect GitHub
2. Deployments → **Create deployment** → Direct Upload
3. 拖 out/ 文件夹 → Save and deploy

### C. 绑定自定义域名
1. 项目 → **Custom domains** → **Set up a custom domain**
2. 输入 `yourdomain.com`
3. Cloudflare 自动加 DNS 记录
4. 等 1-5 分钟生效

## DNS 必加的记录

部署后用户需要在 Cloudflare DNS 加：

| 记录 | 值 | 用途 |
|------|------|------|
| CNAME `yourdomain.com` | `yourproject.pages.dev` | 网站主域（代理橙色云） |
| MX `yourdomain.com` | `mxbiz1.qq.com`（如用QQ企业邮箱） | 收邮件 |
| TXT `yourdomain.com` | `v=spf1 include:spf.mail.qq.com ~all` | SPF 防伪 |

## 添加 Redirect Rules（推荐）

部署完成后用户操作：

1. Rules → Overview → **Create rule**
2. 模板选 **"Redirect from WWW to root"**
3. Deploy
4. 再来一次，选 **"Redirect from HTTP to HTTPS"**

效果：
- `www.yourdomain.com` → 自动 301 跳到根域
- `http://...` → 自动 301 跳到 `https://...`

## 部署后必做检查

- [ ] `https://yourdomain.com` 能访问
- [ ] `https://yourdomain.com/sitemap.xml` 用对的域名（不是 sandbox）
- [ ] `https://yourdomain.com/robots.txt` 存在
- [ ] 随机点几个产品页/Tag archive 页确认 200
- [ ] 用 https://pagespeed.web.dev/ 测性能
- [ ] Google Search Console 提交 sitemap

## 沙箱失效怎么办

沙箱域名 30 天后会失效。如果用户已经部署了生产站但还需要更新：
1. 在沙箱里 build 新版本
2. 重新打包 zip
3. 用其他方式给用户：
   - 邮箱附件（如果 < 25MB）
   - 上传到对象存储（推荐）
   - 微信/钉钉传输

## sublimapparel.com 部署时踩过的坑

| 坑 | 教训 |
|----|------|
| Build 时忘设 `COZE_PROJECT_DOMAIN_DEFAULT` | sitemap 全错，Google 收录了 sandbox 域名 |
| `.txt` 调试文件没删 | 增加了 out/ 体积 |
| Logo 探索图混进 out/ | 增加了 24M 没用文件 |
| 推送 zip 时 `.coze` 配置混乱 | 写一个 .coze 文件用 `output: 'export'` 模式 |

## 部署脚本（自动化用）

见 `scripts/build-and-package.sh` — 一键 build + 清理 + 打包。
