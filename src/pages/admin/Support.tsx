import SupportChat from '@/components/shared/SupportChat'

const Support = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Support Intelligence</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            Nexus Communication Hub & Technical Assistance
          </p>
        </div>
      </div>

      <div className="p-2 md:p-6 rounded-[32px] bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        
        <div className="relative z-10">
          <SupportChat userRole="admin" userName="Lagos State Admin" />
        </div>
      </div>
    </div>
  )
}

export default Support
