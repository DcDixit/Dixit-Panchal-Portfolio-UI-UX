interface SkillCardProps {
  title: string;
  skills: string[];
  icon?: React.ReactNode;
}

export function SkillCard({ title, skills, icon }: SkillCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-[#1A73E8]/10 flex items-center justify-center mb-4 text-[#1A73E8]">
          {icon}
        </div>
      )}
      <h3 className="mb-4 text-[#1E1E1E]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-[#F5F5F5] text-[#1E1E1E] rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
