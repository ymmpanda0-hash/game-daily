import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function SectionTitle({ icon: Icon, title, description }: SectionTitleProps) {
  return (
    <div className="mb-8 space-y-3 sm:mb-10">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}
