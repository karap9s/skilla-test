import { cn } from '@/lib/utils';
import { JSX, useState } from 'react';
import { motion } from 'framer-motion';

type ArrowDirection = 'left' | 'right';

interface DateNavigationArrowProps {
  direction: ArrowDirection;
  onClick?: () => void;
  className?: string;
}

const DateNavigationArrow = ({
  direction,
  onClick,
  className,
}: DateNavigationArrowProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn('w-fit cursor-pointer', className)}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="10"
        viewBox="0 0 7 10"
        fill="none"
        className={direction === 'right' ? 'rotate-180' : ''}
      >
        <motion.path
          d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z"
          animate={{ fill: isHovered ? '#002CFB' : '#ADBFDF' }}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </motion.div>
  );
};

export default DateNavigationArrow;
