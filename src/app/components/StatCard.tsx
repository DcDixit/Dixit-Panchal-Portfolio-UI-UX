interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-[#1A73E8]/10 flex items-center justify-center mb-4 text-[#1A73E8] mx-auto">
          {icon}
        </div>
      )}
      <div className="mb-2 text-[#1E1E1E]">{value}</div>
      <p className="text-[#717182]">{label}</p>
    </div>
  );
}
