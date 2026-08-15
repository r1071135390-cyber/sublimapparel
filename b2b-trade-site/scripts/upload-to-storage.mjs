/**
 * 上传本地文件到对象存储，返回永久下载 URL
 *
 * 用法：
 *   COZE_BUCKET_ENDPOINT_URL=... \
 *   COZE_BUCKET_NAME=... \
 *   COZE_BUCKET_REGION=... \
 *   AWS_ACCESS_KEY_ID=... \
 *   AWS_SECRET_ACCESS_KEY=... \
 *   node upload.mjs /path/to/file.zip
 */

import { readFileSync, statSync } from 'node:fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const filePath = process.argv[2];
if (!filePath) {
  console.error('用法: node upload.mjs <file-path>');
  process.exit(1);
}

const fileName = filePath.split('/').pop();
const contentType = fileName.endsWith('.zip') ? 'application/zip'
  : fileName.endsWith('.tar.gz') ? 'application/gzip'
  : 'application/octet-stream';

const s3 = new S3Client({
  region: process.env.COZEPROJECTENV === 'PROD' ? process.env.COZE_BUCKET_REGION : 'cn-beijing',
  endpoint: process.env.COZE_BUCKET_ENDPOINT_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.COZE_BUCKET_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.COZE_BUCKET_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const fileBuffer = readFileSync(filePath);
const sizeKB = (fileBuffer.length / 1024).toFixed(1);
const objectKey = `${process.env.COZE_STORAGE_DIR || 'coze_storage_default'}/${fileName}-${Date.now().toString(36).slice(-6)}${fileName.match(/\.[^.]+$/)?.[0] || ''}`;

console.log(`📤 上传 ${fileName} (${sizeKB} KB)...`);

await s3.send(new PutObjectCommand({
  Bucket: process.env.COZE_BUCKET_NAME,
  Key: objectKey,
  Body: fileBuffer,
  ContentType: contentType,
  ACL: 'public-read',
}));

const publicUrl = `${process.env.COZE_BUCKET_ENDPOINT_URL}/${process.env.COZE_BUCKET_NAME}/${objectKey}`;
console.log(`✅ 上传成功！`);
console.log(`🔗 永久链接 (7天有效):`);
console.log(`   ${publicUrl}`);
console.log('');
console.log('   (沙箱 public/ 直链 30 天有效：放在 public/ 下直接通过沙箱域名访问)');
