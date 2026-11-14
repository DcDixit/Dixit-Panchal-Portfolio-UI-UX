interface TimelineItemProps {
  year: string;
  title: string;
  company?: string;
  description?: string;
  isLast?: boolean;
}

export function TimelineItem({
  year,
  title,
  company,
  description,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-6 pb-12">
      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-[#1A73E8] border-4 border-white shadow-md z-10" />
        {!isLast && (
          <div className="w-0.5 h-full bg-[#C9C9C9] absolute top-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-0">
        <div className="text-[#1A73E8] mb-1">{year}</div>
        <h3 className="text-[#1E1E1E] mb-1">{title}</h3>
        {company && <p className="text-[#717182] mb-2">{company}</p>}
        {description && <p className="text-[#717182]">{description}</p>}
      </div>
    </div>
  );
}
