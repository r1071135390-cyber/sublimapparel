import Link from 'next/link'

export default function SportswearDecisionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/product-review/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Product Review
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-2">
          🎯 Sportswear 38 产品重分决策页
        </h1>
        <p className="text-muted-foreground mb-6">
          从 Sportswear 类别移除，按款式（产品名中的运动项目）重分到 12 个新类目
        </p>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">📌 操作说明:</strong>{' '}
            下拉框修改目标类目 · ✓ Accept 确认接受 · Export TSV 导出最终结果 · 复制到剪贴板
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">📊 决策界面已就绪</h2>
          <p className="text-muted-foreground mb-4">
            完整交互式决策页在 <code className="text-primary bg-muted px-2 py-1 rounded">/product-review/10-sportswear-decisions/index.html</code>
          </p>
          <a
            href="/product-review/10-sportswear-decisions/index.html"
            target="_blank"
            rel="noopener"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            打开决策页 →
          </a>
        </div>

        <div className="mt-8 bg-muted/50 rounded-lg p-4">
          <h3 className="font-bold mb-2">📁 已生成的决策数据</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 38 个 sportswear 产品</li>
            <li>• 12 个目标类目（除 Sportswear 外的全部）</li>
            <li>• 实时统计 + 导出 TSV</li>
            <li>• 复制到剪贴板直接粘贴到 products-data.ts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
