export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 border-b border-black/10 bg-white" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-black/10" />
        <div className="mb-12 h-6 w-1/2 animate-pulse rounded bg-black/10" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-video animate-pulse rounded-2xl bg-black/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
