import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  Icon: LucideIcon;
  iconClassName?: string;
}

export function SectionHeader({
  title,
  description,
  Icon,
  iconClassName,
}: SectionHeaderProps) {
  return (
    <>
      <div className="ui-section-header">
        <div className="flex items-center gap-3">
          <div className="ui-icon-badge">
            <Icon className={`h-5 w-5 text-sky-600 dark:text-sky-300 ${iconClassName ?? ""}`} />
          </div>
          <h2 className="ui-title">{title}</h2>
        </div>
        <div className="ui-divider" />
      </div>

      {description ? <p className="ui-section-description">{description}</p> : null}
    </>
  );
}
