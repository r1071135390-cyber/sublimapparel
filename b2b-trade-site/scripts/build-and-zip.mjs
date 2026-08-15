/**
 * 用法：构建 + 打包脚本
 * 在 ${COZE_WORKSPACE_PATH} 项目根目录运行
 *
 * 必须设置环境变量 COZE_PROJECT_DOMAIN_DEFAULT=https://yourdomain.com
 * 否则 sitemap 会用沙箱域名
 */

import { execSync } from 'node:child_process';
import { writeFileSync, statSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const SITE_URL = process.env.COZE_PROJECT_DOMAIN_DEFAULT;
if (!SITE_URL || !SITE_URL.startsWith('https://')) {
  console.error('❌ 必须先设置环境变量：');
  console.error('   export COZE_PROJECT_DOMAIN_DEFAULT=https://yourdomain.com');
  process.exit(1);
}

console.log('🚀 开始构建 + 打包...');
console.log('   站点 URL:', SITE_URL);

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'out');

// 1. 清理旧的
console.log('🧹 清理旧 build...');
for (const dir of ['out', '.next']) {
  const p = join(ROOT, dir);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

// 2. Build 静态站
console.log('🔨 正在 build Next.js...');
execSync('pnpm next build', { stdio: 'inherit' });

// 3. 清理调试文件
console.log('🧹 清理调试文件...');
let removed = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (entry.name.endsWith('.txt')) {
      rmSync(p);
      removed++;
    }
  }
}
walk(OUT_DIR);
console.log(`   删除了 ${removed} 个调试文件`);

// 4. 打包 zip
console.log('📦 打包 zip...');
const zipPath = join(tmpdir(), 'site.zip');
execSync(`cd "${OUT_DIR}" && python3 -c "
import zipfile, os
with zipfile.ZipFile('${zipPath}', 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
    for root, dirs, files in os.walk('${OUT_DIR}'):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, '${ROOT}')
            zf.write(full, rel)
"`, { stdio: 'inherit' });

const sizeMB = (statSync(zipPath).size / 1024 / 1024).toFixed(2);
console.log(`✅ 完成！`);
console.log(`   Zip: ${zipPath} (${sizeMB} MB)`);
console.log('');
console.log('下一步：');
console.log('  1. 把这个 zip 传到沙箱 public/ 让用户下载');
console.log('  2. 或上传到对象存储给用户永久链接');
console.log('  3. 用户解压 out/ 文件夹 → 拖到 Cloudflare Pages Direct Upload');
