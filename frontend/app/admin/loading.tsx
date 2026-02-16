export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Welcome banner skeleton */}
      <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-80 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  )
}
