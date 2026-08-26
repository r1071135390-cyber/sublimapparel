export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-14 border-b border-black/10 bg-white" />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-3 h-7 w-48 animate-pulse rounded bg-black/10" />
        <div className="mb-8 h-4 w-72 animate-pulse rounded bg-black/10" />
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-black/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
