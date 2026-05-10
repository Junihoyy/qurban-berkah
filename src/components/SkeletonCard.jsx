export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {/* Image skeleton */}
      <div className="skeleton w-full" style={{ aspectRatio: '4/3' }} />
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-4 w-2/5 rounded" />
        </div>
        <div className="skeleton h-6 w-1/3 rounded" />
        <div className="skeleton h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}
