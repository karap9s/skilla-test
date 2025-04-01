import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { FC } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'bad' | 'good' | 'excellent';

export interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export const Badge: FC<BadgeProps> = ({ variant, className }) => {
  const badgeStyles = {
    bad: 'border-[#EA1A4F] bg-[#FEE9EF] text-[#ea1a4f] hover:bg-[#FEE9EF] hover:text-[#ea1a4f]',
    good: 'border-[#adbfdf] bg-[#d8e4fb] text-[#122945] hover:bg-[#d8e4fb]',
    excellent:
      'border-[#28A879] bg-[#DBF8EF] text-[#00A775] hover:bg-[#DBF8EF]',
  };

  const badgeLabels = {
    bad: 'Плохо',
    good: 'Хорошо',
    excellent: 'Отлично',
  };

  return (
    <ShadcnBadge
      className={cn('text-[14px]', badgeStyles[variant], className)}
      variant="outline"
    >
      {badgeLabels[variant]}
    </ShadcnBadge>
  );
};

export default Badge;
